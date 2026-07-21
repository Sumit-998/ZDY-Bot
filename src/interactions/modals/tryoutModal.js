const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const {
    loadSettings
} = require("../../utils/settings");

module.exports = {

    async execute(interaction) {

        const settings = loadSettings();

        if (!settings.tryoutChannel) {
            return interaction.reply({
                content: "❌ Tryout channel hasn't been configured.",
                ephemeral: true
            });
        }

        // =========================
        // Get Region + Ping Role
        // =========================

        const parts = interaction.customId.split("_");

        const region = parts[1];
        const pingRoleId = parts[2];

        // =========================
        // Modal Inputs
        // =========================

        const privateServer =
            interaction.fields.getTextInputValue("privateServer");

        const notes =
            interaction.fields.getTextInputValue("notes") || "None";

        // =========================
        // Get Tryout Channel
        // =========================

        const channel =
            interaction.guild.channels.cache.get(settings.tryoutChannel);

        if (!channel) {
            return interaction.reply({
                content: "❌ Configured tryout channel no longer exists.",
                ephemeral: true
            });
        }

        // =========================
        // Build Embed
        // =========================

        const embed = new EmbedBuilder()
            .setColor("#00ff88")
            .setTitle("🏀 BBZ TRYOUT HOSTING")
            .addFields(
                {
                    name: "🌍 Region",
                    value: region,
                    inline: true
                },
                {
                    name: "👤 Host",
                    value: `${interaction.user}`,
                    inline: true
                },
                {
                    name: "🔗 Private Server",
                    value: privateServer
                },
                {
                    name: "📝 Notes",
                    value: notes
                }
            )
            .setFooter({
                text: "Hosted using ZDY Bot"
            })
            .setTimestamp();

        // =========================
        // Buttons
        // =========================

        const buttons = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId(`endTryout_${interaction.user.id}`)
                .setLabel("End Tryout")
                .setEmoji("🔴")
                .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
                .setCustomId(`cancelTryout_${interaction.user.id}`)
                .setLabel("Cancel Tryout")
                .setEmoji("❌")
                .setStyle(ButtonStyle.Secondary)

        );

        // =========================
        // Send Tryout
        // =========================

        await channel.send({

            content: `<@&${pingRoleId}>`,

            embeds: [embed],

            components: [buttons]

        });

        // =========================
        // Reply to Coach
        // =========================

        await interaction.reply({

            content: "✅ Tryout posted successfully!",

            ephemeral: true

        });

    }

};