const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType
} = require('discord.js');

const {
    loadSettings,
    saveSettings
} = require('../../utils/settings');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('settryoutchannel')
        .setDescription('Set the tryout announcement channel.')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Select the tryout channel')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const channel = interaction.options.getChannel('channel');

        const settings = loadSettings();

        settings.tryoutChannel = channel.id;

        saveSettings(settings);

        await interaction.reply({
            content: `✅ Tryout channel set to ${channel}.`,
            ephemeral: true
        });

    }

};