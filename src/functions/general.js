import { GraphQLClient } from 'graphql-request';
import * as raritiesList from '../../rarities.json';

const graphql = new GraphQLClient("http://futbot-graphql-1:5000/graphql", { headers: {} });

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
    let query = `{ getPlayerVersionPackEmulator(ratingB: ${ratingB}, ratingT: ${ratingT}, rareflag: "${rareflag}") { def dri nation_info{ img } pac pas phy meta_info{ common_name last_name img } preferred_position rareflag rating sho club_info{ img } } }`;
    let res = await graphql.request(query);

    return res.getPlayerVersionPackEmulator;
};

async function getCardColor(rareflag, rating) {
    let rarity = `${rareflag}-${getQuality(rating)}`;
    let query = `{ getCardColorsByRarity(rarity:"${rarity}") { rarity color_text color_stripes color_attr_names color_attr_values font_1 font_2 font_3 } }`;
    let res = await graphql.request(query);

    return res.getCardColorsByRarity;
};

module.exports = {
    getQuality,
    getRarityName,
    getPlayer,
    getCardColor
}