const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    PermissionFlagsBits
} = require("discord.js");

const {
    loadSettings
} = require("../../utils/settings");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("tryout")
        .setDescription("Host a BBZ tryout.")

        .addStringOption(option =>
            option
                .setName("region")
                .setDescription("Choose the region")
                .setRequired(true)
                .addChoices(
                    { name: "🇺🇸 NA", value: "NA" },
                    { name: "🇪🇺 EU", value: "EU" },
                    { name: "🇸🇬 ASIA", value: "ASIA" },
                    { name: "🇦🇺 OCE", value: "OCE" },
                    { name: "🇧🇷 SA", value: "SA" }
                )
        )

        .addRoleOption(option =>
            option
                .setName("pingrole")
                .setDescription("Select the role to ping")
                .setRequired(true)
        ),

    async execute(interaction) {

        // =========================
        // Permission Check
        // =========================

        const settings = loadSettings();

        if (!settings.coachRole) {

            return interaction.reply({
                content: "❌ No coach role has been configured yet. Ask an administrator to run `/setcoachrole`.",
                ephemeral: true
            });

        }

        const hasCoachRole = interaction.member.roles.cache.has(
            settings.coachRole
        );

        const isAdmin = interaction.member.permissions.has(
            PermissionFlagsBits.Administrator
        );

        if (!hasCoachRole && !isAdmin) {

            return interaction.reply({
                content: "❌ Only tryout coaches can use this command.",
                ephemeral: true
            });

        }

        // =========================
        // Get Slash Command Options
        // =========================

        const region = interaction.options.getString("region");
        const pingRole = interaction.options.getRole("pingrole");

        // =========================
        // Create Modal
        // =========================

        const modal = new ModalBuilder()
            .setCustomId(`tryoutModal_${region}_${pingRole.id}`)
            .setTitle("Host BBZ Tryout");

        const privateServer = new TextInputBuilder()
            .setCustomId("privateServer")
            .setLabel("Private Server Link")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("Paste your Roblox private server link...")
            .setRequired(true);

        const notes = new TextInputBuilder()
            .setCustomId("notes")
            .setLabel("Notes (Optional)")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Example: Need PG only / First come first serve")
            .setRequired(false);

        const row1 = new ActionRowBuilder().addComponents(privateServer);
        const row2 = new ActionRowBuilder().addComponents(notes);

        modal.addComponents(row1, row2);

        // =========================
        // Show Modal
        // =========================

        await interaction.showModal(modal);

    }

};