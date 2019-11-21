import {
    getAuctionById,
    getUserClubId,
    nextCurrentBid
} from "../functions/general";

exports.run = async (client, message, args) => {
    if (args[0] == undefined || args[0] == null) return channel.send(`Please fill-in an id of an auction. ${author}`);

    const channel = message.channel;
    const author = message.author;
    const cInfo = await getUserClubId(author.id);
    const aInfo = await getAuctionById(args[0]);

    if (aInfo === null) return channel.send(`Auction has not been found. Try again... ${author}`);
    if (aInfo.s_club_id === cInfo.id) return channel.send(`You can't bid on your own item. ${author}`);
    if (args[1] == undefined || args[1] == null) return;

    const bid = nextCurrentBid(args[1]);

    if (bid < aInfo.start_price) return channel.send(`Your bid must be higher then the start price ${aInfo.start_price}. ${author}`);

}