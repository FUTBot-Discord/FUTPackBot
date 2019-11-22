import {
    GraphQLClient
} from 'graphql-request';
import * as Canvas from 'canvas';
import {
    Attachment
} from 'discord.js';
import AsciiTable from 'ascii-table';
import hDuration from "humanize-duration"

const graphql = new GraphQLClient(process.env.G_ENDPOINT, {
    headers: {}
});
const raritiesList = require('../../rarities.json');
const footer = "\nFUTPackBot v.1.0.0 | Made by Tjird#0001";

function getQuality(rating) {
    if (rating < 65) return "bronze";
    if (rating < 75) return "silver";

    return "gold";
};

function getRarityName(rarity) {
    if (raritiesList.find(x => x.id == rarity)) return raritiesList.find(x => x.id === rarity).rarity;

    return "Unknown cardtype";
};

async function getPlayer(ratingB, ratingT, rareflag) {
    let query = `{ getPlayerVersionPackEmulator(ratingB: ${ratingB}, ratingT: ${ratingT}, rareflag: "${rareflag}") { def dri id nation_info{ img } pac pas phy meta_info{ common_name last_name first_name img } preferred_position rareflag rating sho min_price club_info{ img } } }`;
    let res = await graphql.request(query);

    return res.getPlayerVersionPackEmulator;
};

async function getCardColor(rareflag, rating) {
    let rarity = `${rareflag}-${getQuality(rating)}`;
    let query = `{ getCardColorsByRarity(rarity:"${rarity}") { rarity color_text color_stripes color_attr_names color_attr_values font_1 font_2 font_3 } }`;
    let res = await graphql.request(query);

    return res.getCardColorsByRarity;
};

async function getPacks() {
    let query = `{ getPacks { id name_id name description price players points } }`;
    let res = await graphql.request(query);

    return res.getPacks;
};

async function getPacksByName(name) {
    let query = `{ getPacks(name: "${name}") { id name_id name description price players points } }`;
    let res = await graphql.request(query);

    return res.getPacks;
};

async function getPackById(id) {
    let query = `{ getPackById(id: ${id}) { name players points price } }`;
    let res = await graphql.request(query);

    return res.getPackById;
};

async function getPlayerVersionById(id) {
    let query = `{ getPlayerVersionById(id: ${id}) { def dri id nation_info{ img } pac pas phy meta_info{ common_name last_name first_name img } preferred_position rareflag rating sho min_price club_info{ img } } }`;
    let res = await graphql.request(query);

    return res.getPlayerVersionById;
};

async function notifyPerson(client, auction, action) {
    let pInfo;
    let pName;

    switch (action) {
        case 1:
            try {
                let prefPerson = await getClubInfoById(auction.b_club_id);
                prefPerson = await client.fetchUser(`${prefPerson.author_id}`);
                prefPerson.createDM()
                    .then(async c => {
                        pInfo = await getPlayerVersionById(auction.player_id);
                        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;
                        c.send(`You have been outbid at an auction for ${pName} rated ${pInfo.rating} (Buy now).`);
                    })
                    .catch(e => console.log(`Tried to contact a person but he/she not likes me...`));
            } catch (e) {
                console.log(`Tried to contact a person but he/she not likes me...`);
            }
            break;
        case 2:
            try {
                let prefPerson = await getClubInfoById(auction.s_club_id);
                prefPerson = await client.fetchUser(`${prefPerson.author_id}`);
                prefPerson.createDM()
                    .then(async c => {
                        pInfo = await getPlayerVersionById(auction.player_id);
                        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;
                        c.send(`You have sold ${pName} rated ${pInfo.rating} for ${auction.buy_now} (Buy now).`);
                    })
                    .catch(e => console.log(`Tried to contact a person but he/she not likes me...`));
            } catch (e) {
                console.log(`Tried to contact a person but he/she not likes me...`);
            }
            break;
        case 3:
            try {
                let prefPerson = await getClubInfoById(auction.s_club_id);
                prefPerson = await client.fetchUser(`${prefPerson.author_id}`);
                prefPerson.createDM()
                    .then(async c => {
                        pInfo = await getPlayerVersionById(auction.player_id);
                        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;
                        c.send(`You have sold ${pName} rated ${pInfo.rating} for ${auction.buy_now} (Bid).`);
                    })
                    .catch(e => console.log(`Tried to contact a person but he/she not likes me...`));
            } catch (e) {
                console.log(`Tried to contact a person but he/she not likes me...`);
            }
            break;
        case 4:
            try {
                let prefPerson = await getClubInfoById(auction.b_club_id);
                prefPerson = await client.fetchUser(`${prefPerson.author_id}`);
                prefPerson.createDM()
                    .then(async c => {
                        pInfo = await getPlayerVersionById(auction.player_id);
                        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;
                        c.send(`You have won ${pName} rated ${pInfo.rating}. The player has been send to your transferpile.`);
                    })
                    .catch(e => console.log(`Tried to contact a person but he/she not likes me...`));
            } catch (e) {
                console.log(`Tried to contact a person but he/she not likes me...`);
            }
            break;
    }
};

async function addClubPlayer(club_id, player_id) {
    let query = `mutation { addClubPlayer(club_id: "${club_id}", player_id: "${player_id}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

function makeOptionMenuPacks(packs) {
    const t = new AsciiTable('Pack list')
        .setHeading('ID', 'Name', 'Price', 'Points')
        .setAlign(1, AsciiTable.LEFT)
        .setAlign(2, AsciiTable.CENTER)
        .setAlign(3, AsciiTable.LEFT)
        .setAlign(4, AsciiTable.LEFT);

    for (let pack of packs) {
        t.addRow(pack.id, pack.name, numberWithCommas(pack.price), numberWithCommas(pack.points));
    }

    return t;
};

function makeAuctionMenu(auctions, a, p, pp) {
    let t = new AsciiTable()
        .setTitle(`Transfer market for ${a.username}#${a.discriminator}. Page ${p}/${pp}.`)
        .setHeading('ID', 'Name', 'Rating', 'Current bid', 'Start price', 'Buy now', 'Time remaining')
        .setAlign(1, AsciiTable.LEFT)
        .setAlign(2, AsciiTable.LEFT)
        .setAlign(3, AsciiTable.LEFT)
        .setAlign(4, AsciiTable.LEFT)
        .setAlign(5, AsciiTable.LEFT)
        .setAlign(6, AsciiTable.LEFT)
        .setAlign(7, AsciiTable.LEFT);

    let cDate = new Date();
    cDate = cDate.getTime();

    for (let auction of auctions) {
        let bid = auction.current_bid;

        if (bid < 1) bid = "-";

        t.addRow(auction.id, (auction.card_info.meta_info.common_name ? auction.card_info.meta_info.common_name : `${auction.card_info.meta_info.first_name} ${auction.card_info.meta_info.last_name}`), auction.card_info.rating, numberWithCommas(bid), numberWithCommas(auction.start_price), numberWithCommas(auction.buy_now), hDuration(auction.end_timestamp - cDate, {
            round: true,
            largest: 1
        }));
    }

    if (pp > 1) {
        t += footer + " | You can switch 3 minutes between pages";
    } else {
        t += footer;
    }

    return t;
};

function makeTransferMenu(transfers, a, p, pp, am) {
    let max = 100;

    if (am > max) max = am;

    let t = new AsciiTable()
        .setTitle(`Transferpile of ${a.username}#${a.discriminator}. Page ${p}/${pp}. Amount ${am}/${max}.`)
        .setHeading('ID', 'Name', 'Rating', 'Current bid', 'Buy now', 'Time remaining')
        .setAlign(1, AsciiTable.LEFT)
        .setAlign(2, AsciiTable.LEFT)
        .setAlign(3, AsciiTable.LEFT)
        .setAlign(4, AsciiTable.LEFT)
        .setAlign(5, AsciiTable.LEFT)
        .setAlign(6, AsciiTable.LEFT);

    let cDate = new Date();
    cDate = cDate.getTime();

    for (let transfer of transfers) {
        let cBid;
        let cTime;
        let cBuy;

        if (!transfer.auction_info || transfer.auction_info == undefined) {
            cBid = "-";
            cTime = "-";
            cBuy = "-";
        } else {
            cBid = transfer.auction_info.current_bid;
            cTime = transfer.auction_info.end_timestamp;
            cBuy = transfer.auction_info.buy_now;
        }

        t.addRow(transfer.id, (transfer.card_info.meta_info.common_name ? transfer.card_info.meta_info.common_name : `${transfer.card_info.meta_info.first_name} ${transfer.card_info.meta_info.last_name}`), transfer.card_info.rating, numberWithCommas(cBid), numberWithCommas(cBuy), transfer.auction_info ? hDuration(cTime - cDate, {
            round: true,
            largest: 1
        }) : cTime);
    }

    if (pp > 1) {
        t += footer + " | You can switch 3 minutes between pages";
    } else {
        t += footer;
    }

    return t;
};

function makeClubMenu(players, a, p, pp) {
    let t = new AsciiTable()
        .setTitle(`Club player(s) from ${a.username}#${a.discriminator}. Page ${p}/${pp}.`)
        .setHeading('ID', 'Name', 'Rating', 'Version', 'Position')
        .setAlign(1, AsciiTable.LEFT)
        .setAlign(2, AsciiTable.LEFT)
        .setAlign(3, AsciiTable.LEFT)
        .setAlign(4, AsciiTable.LEFT)
        .setAlign(5, AsciiTable.LEFT);

    for (let player of players) {
        t.addRow(player.id, (player.card_info.meta_info.common_name ? player.card_info.meta_info.common_name : `${player.card_info.meta_info.first_name} ${player.card_info.meta_info.last_name}`), player.card_info.rating, getRarityName(`${player.card_info.rareflag}-${getQuality(player.card_info.rating)}`), player.card_info.preferred_position);
    }

    if (pp > 1) {
        t += footer + " | You can switch 3 minutes between pages";
    } else {
        t += footer;
    }

    return t;
};

async function getUserClubId(author_id) {
    let query = `{ getUserClubByAuthorId(author_id: "${author_id}") { id points coins creation_time } }`;
    let res = await graphql.request(query);

    return res.getUserClubByAuthorId;
};

async function getClubInfoById(id) {
    let query = `{ getUserClubById(id: ${id}) { id points coins creation_time author_id } }`;
    let res = await graphql.request(query);

    return res.getUserClubById;
};

async function getCurrentAuctionsCount(club_id, name) {
    let query;

    if (!name || name == undefined) {
        query = `{ getCurrentAuctionsCount(club_id: "${club_id}") { auctions } }`;
    } else {
        query = `{ getCurrentAuctionsCount(club_id: "${club_id}", name: "${name}") { auctions } }`;
    }

    let res = await graphql.request(query);

    return res.getCurrentAuctionsCount;
};

async function createUserClub(author_id) {
    let query = `mutation { createUserClub(author_id: "${author_id}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function getClubPlayer(club_id, player_id) {
    let query = `{ getClubPlayer(club_id: "${club_id}", player_id: "${player_id}") { id } }`;
    let res = await graphql.request(query);

    return res.getClubPlayer;
};

async function resetTransferPlayer(aId) {
    let query = `mutation { resetTransferPlayer(auction_id: "${aId}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {

    }

    return true;
};

async function getAuctionById(auction_id) {
    let query = `{ getAuctionById(id: "${auction_id}") { id player_id b_club_id s_club_id current_bid start_price buy_now end_timestamp } }`;
    let res = await graphql.request(query);

    return res.getAuctionById;
};

async function getActiveAuctions(club_id, page, name) {
    let query;

    if (!name || name == undefined) {
        query = `{ getCurrentAuctions(club_id: "${club_id}", page: ${page}) { id current_bid buy_now start_price end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }`;
    } else {
        query = `{ getCurrentAuctions(club_id: "${club_id}", name: "${name}", page: ${page}) { id current_bid buy_now start_price end_timestamp card_info{ rating rareflag preferred_position meta_info{ first_name last_name common_name } } } }`;
    }

    let res = await graphql.request(query);

    return res.getCurrentAuctions;
};

async function addCoinsToClub(club_id, coins) {
    let query = `mutation { addCoinsToClub(club_id: "${club_id}", coins: "${coins}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function addPointsToClub(club_id, points) {
    let query = `mutation { addPointsToClub(club_id: "${club_id}", points: "${points}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function addTransferpilePlayer(club_id, player_id, auction_id) {
    let query;

    if (!auction_id || auction_id == undefined) {
        query = `mutation { addTransferPlayer(club_id: "${club_id}", player_id: "${player_id}") { id } }`;
    } else {
        query = `mutation { addTransferPlayer(club_id: "${club_id}", player_id: "${player_id}", auction_id: ${auction_id}) { id } }`;
    }

    let res = await graphql.request(query);

    return res.addTransferPlayer;
};

function nextCurrentBid(p) {
    p = parseInt(p, 10);

    if (p >= 100000) return Math.ceil(p / 1000) * 1000;
    if (p >= 10000) return Math.ceil(p / 250) * 250;
    if (p >= 1000) return Math.ceil(p / 100) * 100;

    return Math.ceil(p / 50) * 50;
}

async function removeCoinsFromClub(club_id, coins) {
    let query = `mutation { removeCoinsFromClub(club_id: "${club_id}", coins: "${coins}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function removePointsFromClub(club_id, points) {
    let query = `mutation { removePointsFromClub(club_id: "${club_id}", points: "${points}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function auctionBuyNow(auction_id, club_id) {
    let query = `mutation { changeTransferPlayer(club_id: "${club_id}", auction_id: "${auction_id}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function auctionBid(auction_id, end_timestamp, bid, b_club_id) {
    let query = `mutation { changeAuctionPlayer(club_id: "${b_club_id}", auction_id: "${auction_id}", current_bid: ${bid}, end_timestamp: "${end_timestamp}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function removePlayerFromTransferpile(club_id, id) {
    let query = `mutation { removePlayerFromTransferpile(club_id: "${club_id}", id: ${id}) { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

async function removePlayerFromClub(club_id, id) {
    let query = `mutation { removePlayerFromClub(club_id: "${club_id}", id: ${id}) { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function getAnimation(rf, rt) {
    let a = "nonrare";

    if (rf === 1) a = "rare";
    if ((rf !== 3 && rt >= 83) || (rf === 3 && rt <= 82) || (rf === 48)) a = "board";
    if ((rf !== 3 && rt > 85) || (rf === 3 && rt >= 83) || (rf === 12)) a = "walkout";

    return a;
};

async function makePlayerCard(player_info) {
    let positions = {
        p: {
            "pac": "pac",
            "sho": "sho",
            "pas": "pas",
            "dri": "dri",
            "def": "def",
            "phy": "phy"
        },
        g: {
            "pac": "DIV",
            "sho": "HAN",
            "pas": "KIC",
            "dri": "REF",
            "def": "SPE",
            "phy": "POS"
        }
    }

    Canvas.registerFont(`Roboto-Bold.ttf`, {
        family: "Roboto Bold"
    });
    Canvas.registerFont(`Champions-Regular.otf`, {
        family: "Champions"
    });
    Canvas.registerFont(`fut.ttf`, {
        family: "DIN Condensed Web"
    });
    Canvas.registerFont(`futlight.ttf`, {
        family: "DIN Condensed Web Light"
    });

    const packCard = Canvas.createCanvas((644 / 2.15), (900 / 2.15));
    const ctx = packCard.getContext('2d');

    const colors = await getCardColor(player_info.rareflag, player_info.rating);
    const background = await Canvas.loadImage(`http://fifa.tjird.nl/cards/${player_info.rareflag}-${getQuality(player_info.rating)}.png`);
    ctx.drawImage(background, 0, 0, (644 / 2.15), (900 / 2.15));

    const playerpicture = await Canvas.loadImage(player_info.meta_info.img);

    ctx.drawImage(playerpicture, 95, 57, 160, 160);

    let playername = player_info.meta_info.common_name ? player_info.meta_info.common_name.toUpperCase() : player_info.meta_info.last_name.toUpperCase();
    let pSize = '19px';
    let pHeight = 241;

    if (playername.length < 15) {
        pSize = '24px';
        pHeight = 241;
    }

    ctx.font = `${pSize} '${colors.font_3}'`;
    ctx.fillStyle = `#${colors.color_text}`;
    ctx.textAlign = "center";
    ctx.fillText(playername, packCard.width / 2, pHeight);

    ctx.font = `45px '${colors.font_1}'`;
    ctx.fillText(player_info.rating, 90, 93);

    ctx.font = `28px '${colors.font_2}'`;
    ctx.fillText(player_info.preferred_position.toUpperCase(), 90, 119);

    const nation = await Canvas.loadImage(player_info.nation_info.img);
    ctx.drawImage(nation, 70, 128, nation.width * 0.6, nation.height * 0.6);

    const club = await Canvas.loadImage(player_info.club_info.img);
    ctx.drawImage(club, 70, 165, club.width * 0.31, club.height * 0.31);

    ctx.font = `18px '${colors.font_3}'`;
    ctx.fillStyle = `#${colors.color_attr_values}`;
    ctx.textAlign = "center";
    ctx.fillText(player_info.pac, packCard.width * 0.28, packCard.height * 0.67);
    ctx.fillText(player_info.sho, packCard.width * 0.28, packCard.height * 0.73);
    ctx.fillText(player_info.pas, packCard.width * 0.28, packCard.height * 0.79);
    ctx.fillText(player_info.dri, packCard.width * 0.598, packCard.height * 0.67);
    ctx.fillText(player_info.def, packCard.width * 0.598, packCard.height * 0.73);
    ctx.fillText(player_info.phy, packCard.width * 0.598, packCard.height * 0.79);

    if (player_info.preferred_position === "GK") {
        positions = positions.g;
    } else {
        positions = positions.p;
    }

    ctx.fillStyle = `#${colors.color_attr_names}`;
    ctx.textAlign = "left";
    ctx.fillText(positions.pac.toUpperCase(), packCard.width * 0.33, packCard.height * 0.67);
    ctx.fillText(positions.sho.toUpperCase(), packCard.width * 0.33, packCard.height * 0.73);
    ctx.fillText(positions.pas.toUpperCase(), packCard.width * 0.33, packCard.height * 0.79);
    ctx.fillText(positions.dri.toUpperCase(), packCard.width * 0.648, packCard.height * 0.67);
    ctx.fillText(positions.def.toUpperCase(), packCard.width * 0.648, packCard.height * 0.73);
    ctx.fillText(positions.phy.toUpperCase(), packCard.width * 0.648, packCard.height * 0.79);

    ctx.strokeStyle = `#${colors.color_stripes}`;

    ctx.beginPath();
    ctx.moveTo(80, 124);
    ctx.lineTo(101, 124);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 160);
    ctx.lineTo(101, 160);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(packCard.width / 2, 262);
    ctx.lineTo(packCard.width / 2, 337);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(62, 249);
    ctx.lineTo(235, 249);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((packCard.width / 2) - 23, 350);
    ctx.lineTo((packCard.width / 2) + 23, 350);
    ctx.stroke();

    const attachment = new Attachment(packCard.toBuffer(), 'card.png');

    return attachment;
};

async function setDialogue(f, c, t) {
    return new Promise(async (resolve, reject) => {
        await c.awaitMessages(f, {
                max: 1,
                time: t
            })
            .then(collected => {
                let f = collected.first();

                if (f.content.toLowerCase() === "stop" || f.content.toLowerCase() === "cancel") reject(1);

                resolve(f);
            })
            .catch(e => {
                reject(2);
            });
    });
};

async function setDialogueReactions(f, m, t) {
    return new Promise(async (resolve, reject) => {
        await m.awaitReactions(f, {
                max: 1,
                time: t
            })
            .then(collected => {
                let f = collected.first();

                resolve(f);
            })
            .catch(e => {
                reject();
            });
    });
};

async function getClubCollectionCount(club_id, name) {
    let query;

    if (!name || name == undefined) {
        query = `{ getClubCollection(club_id: "${club_id}") { player_id } }`;
    } else {
        query = `{ getClubCollection(club_id: "${club_id}", name: "${name}") { player_id } }`;
    }

    let res = await graphql.request(query);

    return res.getClubCollection;
};

async function getClubCollection(club_id, page, name) {
    let query;

    if (!name || name == undefined) {
        query = `{ getClubCollection(club_id: "${club_id}", page: ${page}) { id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    } else {
        query = `{ getClubCollection(club_id: "${club_id}", page: ${page}, name: "${name}") { id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    }

    let res = await graphql.request(query);

    return res.getClubCollection;
};

async function getClubTransferpileCount(club_id) {
    let query = `{ getTransferpile(club_id: "${club_id}") { player_id } }`;
    let res = await graphql.request(query);

    return res.getTransferpile;
};

async function getClubPlayerById(club_id, id) {
    let query = `{ getClubCollectionPlayer(club_id: "${club_id}", id: "${id}") { id player_id card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    let res = await graphql.request(query);

    return res.getClubCollectionPlayer;
};

async function getTransferpilePlayerById(club_id, id) {
    let query = `{ getTransferpilePlayer(club_id: "${club_id}", id: "${id}") { id player_id auction_info{current_bid buy_now end_timestamp} card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    let res = await graphql.request(query);

    return res.getTransferpilePlayer;
};

async function getClubTransferpile(club_id, page, name) {
    let query;

    if (!name || name == undefined) {
        query = `{ getTransferpile(club_id: "${club_id}", page: ${page}) { id auction_info{current_bid buy_now end_timestamp} card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    } else {
        query = `{ getTransferpile(club_id: "${club_id}", page: ${page}, name: "${name}") { id auction_info{current_bid buy_now end_timestamp} card_info { rating rareflag preferred_position meta_info { first_name last_name common_name } } } }`;
    }

    let res = await graphql.request(query);

    return res.getTransferpile;
};

async function addAuctionPlayer(cid, pid, end, buy, startp) {
    let query = `mutation { addAuctionPlayer(club_id: "${cid}", player_id: "${pid}", end_timestamp: ${end}, buy_now: ${buy}, start_price: ${startp}) { id } }`;
    let res = await graphql.request(query);

    return res.addAuctionPlayer;
}

async function updateTransferPlayer(id, aId) {
    let query = `mutation { updateTransferPlayer(id: "${id}", auction_id: "${aId}") { id } }`;

    try {
        await graphql.request(query);
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}

module.exports = {
    getClubTransferpileCount,
    getClubPlayerById,
    getTransferpilePlayerById,
    getClubTransferpile,
    getQuality,
    removePlayerFromTransferpile,
    removePlayerFromClub,
    getRarityName,
    getPlayer,
    getCardColor,
    getPacks,
    getPacksByName,
    numberWithCommas,
    getPackById,
    makeTransferMenu,
    getAnimation,
    addClubPlayer,
    getUserClubId,
    createUserClub,
    getClubPlayer,
    addCoinsToClub,
    addPointsToClub,
    setDialogueReactions,
    removeCoinsFromClub,
    removePointsFromClub,
    makePlayerCard,
    setDialogue,
    makeOptionMenuPacks,
    getClubCollectionCount,
    getClubCollection,
    getActiveAuctions,
    makeAuctionMenu,
    getCurrentAuctionsCount,
    addTransferpilePlayer,
    makeClubMenu,
    getAuctionById,
    getPlayerVersionById,
    nextCurrentBid,
    addAuctionPlayer,
    updateTransferPlayer,
    auctionBuyNow,
    auctionBid,
    getClubInfoById,
    notifyPerson,
    resetTransferPlayer
}