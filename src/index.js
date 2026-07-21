require("dotenv").config();

const {
    Client,
    Collection,
    GatewayIntentBits
} = require("discord.js");

const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.commands = new Collection();

// Load Commands
commandHandler(client);

// Load Events
eventHandler(client);

console.log("TOKEN exists:", !!process.env.TOKEN);
console.log("TOKEN length:", process.env.TOKEN?.length);

// Login
client.login(process.env.TOKEN);