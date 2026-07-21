const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const commandsPath = path.join(__dirname, 'src', 'commands');
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {

    const folderPath = path.join(commandsPath, folder);

    if (!fs.lstatSync(folderPath).isDirectory()) continue;

    const commandFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

        const command = require(path.join(folderPath, file));

        commands.push(command.data.toJSON());

    }
}

// Replace these with your values
const TOKEN = 'MTUyODgxMTYzMTIxMDAwNDY2MA.GuPOiI.rfZqYkB8PvIoEZwimNkkdP7dfrPZgXTJwtaWcA';
const CLIENT_ID = '1528811631210004660';
const GUILD_ID = '1503050760269729977';

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log(`Registering ${commands.length} commands...`);

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log('✅ Commands registered successfully.');
    } catch (error) {
        console.error(error);
    }
})();