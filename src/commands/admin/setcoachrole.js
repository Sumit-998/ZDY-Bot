const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const {
    loadSettings,
    saveSettings
} = require("../../utils/settings");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("setcoachrole")
        .setDescription("Set the coach role allowed to use coach commands.")
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("Coach role")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),

    async execute(interaction) {

        const role = interaction.options.getRole("role");

        const settings = loadSettings();

        settings.coachRole = role.id;

        saveSettings(settings);

        await interaction.reply({

            content:
                `✅ Coach role set to ${role}`,

            ephemeral: true

        });

    }

};