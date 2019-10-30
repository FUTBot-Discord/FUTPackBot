import { GraphQLClient } from 'graphql-request';

const graphql = new GraphQLClient(process.env.G_ENDPOINT, { headers: {} });
const raritiesList = require('../../rarities.json');

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
    let query = `{ getPacks { id name_id name description price players } }`;
    let res = await graphql.request(query);

    return res.getPacks;
};

async function getPacksByName(name) {
    let query = `{ getPacks(name: "${name}") { id name_id name description price players } }`;
    let res = await graphql.request(query);

    return res.getPacks;
};

async function getPackById(id) {
    let query = `{ getPackById(id: ${id}) { name players } }`;
    let res = await graphql.request(query);

    return res.getPackById;
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

async function getUserClubId(author_id) {
    let query = `{ getUserClubByAuthorId(author_id: "${author_id}") { id } }`;
    let res = await graphql.request(query);

    return res.getUserClubByAuthorId;
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

module.exports = {
    getQuality,
    getRarityName,
    getPlayer,
    getCardColor,
    getPacks,
    getPacksByName,
    numberWithCommas,
    getPackById,
    getAnimation,
    addClubPlayer,
    getUserClubId,
    createUserClub,
    getClubPlayer,
    addCoinsToClub,
    removeCoinsFromClub
}