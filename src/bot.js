import * as Discord from 'discord.js';
import Enmap from "enmap";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const client = new Discord.Client();

client.prefix = process.env.DC_PREFIX;

fs.readdir(`${__dirname}/events`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`${__dirname}/events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir(`${__dirname}/commands`, (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`${__dirname}/commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}.`);
        client.commands.set(commandName, props);
    });
});

client.login(process.env.DC_TOKEN);