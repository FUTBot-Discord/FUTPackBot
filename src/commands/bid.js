import {
    getAuctionById,
    getUserClubId,
    nextCurrentBid,
    auctionBuyNow,
    auctionBid,
    notifyPerson,
    removeCoinsFromClub,
    addCoinsToClub,
    getPlayerVersionById
} from "../functions/general";
import hDuration from "humanize-duration"

exports.run = async (client, message, args) => {
    const channel = message.channel;
    const author = message.author;

    if (args[0] == undefined || args[0] == null) return channel.send(`Please fill-in an id of an auction. ${author}`);

    const cInfo = await getUserClubId(author.id);
    const aInfo = await getAuctionById(args[0]);

    if (aInfo === null) return channel.send(`Auction has not been found. Try again... ${author}`);

    let date = (new Date()).getTime();
    let diff = aInfo.end_timestamp - date;

    // if (aInfo.s_club_id === cInfo.id) return channel.send(`You can't bid on your own item. ${author}`);
    if (diff < 300) return channel.send(`Auction has just been expired. ${author}`);
    if (args[1] == undefined || args[1] == null) return channel.send(`You need to fill-in an amount what you want to bid. ${author}`);

    const bid = nextCurrentBid(args[1]);

    if (bid === NaN) return channel.send(`You amount can't be converted to an amount. Fill-in a normal number... ${author}`);
    if (cInfo.coins < bid) return channel.send(`You haven't enough coins to bid(${bid}) on this player. ${author}`);
    if (aInfo.b_club_id !== 0 && bid <= aInfo.current_bid) return channel.send(`Your bid must be higher then the current bid ${aInfo.current_bid}. ${author}`);
    if (bid < aInfo.start_price) return channel.send(`Your bid must be higher then the start price ${aInfo.start_price}. ${author}`);

    let end_timestamp;
    let pInfo;
    let pName;

    switch (diff > 28000) {
        case true:
            end_timestamp = aInfo.end_timestamp;
            break;
        case false:
            end_timestamp = date + 28000;
            break;
    };

    if (bid >= aInfo.buy_now) {
        await removeCoinsFromClub(cInfo.id, aInfo.buy_now);
        await addCoinsToClub(aInfo.s_club_id, aInfo.buy_now);
        await auctionBuyNow(aInfo.id, cInfo.id);

        if (aInfo.b_club_id !== 0) {
            await addCoinsToClub(aInfo.b_club_id, aInfo.current_bid);

            // Notify other person that has bet.
            if (cInfo.id !== aInfo.b_club_id) notifyPerson(client, aInfo, 1);

            // Notify person that sold this player.
            notifyPerson(client, aInfo, 2);
        }

        pInfo = await getPlayerVersionById(aInfo.player_id);
        pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;

        channel.send(`${author} has bought ${pName} rated ${pInfo.rating} for **${aInfo.buy_now}** coins. The player has been send to your transferpile.`);
        return;
    }

    await removeCoinsFromClub(cInfo.id, bid);
    await auctionBid(aInfo.id, end_timestamp, bid, cInfo.id);

    if (aInfo.b_club_id !== 0) {
        await addCoinsToClub(aInfo.b_club_id, aInfo.current_bid);

        // Notify other person that has bet.
        if (cInfo.id !== aInfo.b_club_id) notifyPerson(client, aInfo, 3);
    }

    date = (new Date()).getTime();
    diff = end_timestamp - date;
    pInfo = await getPlayerVersionById(aInfo.player_id);
    pName = pInfo.meta_info.common_name ? pInfo.meta_info.common_name : `${pInfo.meta_info.first_name} ${pInfo.meta_info.last_name}`;

    channel.send(`${author} has placed a bid on ${pName} rated ${pInfo.rating} for **${bid}** coins. Time remaining: ${hDuration(diff, {round: true,largest: 1})}`);

    return;
}