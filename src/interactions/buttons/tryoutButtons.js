const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {

    async execute(interaction) {

        const message = interaction.message;

        const embed = EmbedBuilder.from(message.embeds[0]);

        // =========================
        // End Tryout
        // =========================

        if (interaction.customId.startsWith("endTryout")) {

            const ownerId = interaction.customId.split("_")[1];

            const isOwner = interaction.user.id === ownerId;

            const isAdmin =
                interaction.member.permissions.has(
                    PermissionFlagsBits.Administrator
                );

            if (!isOwner && !isAdmin) {

                return interaction.reply({

                    content:
                        "❌ You don't have permission to end this tryout.",

                    ephemeral: true

                });

            }

            embed
                .setColor("#ff0000")
                .setTitle("🔴 BBZ TRYOUT ENDED");

            const disabledRow = new ActionRowBuilder().addComponents(

                ButtonBuilder.from(message.components[0].components[0])
                    .setDisabled(true),

                ButtonBuilder.from(message.components[0].components[1])
                    .setDisabled(true)

            );

            return interaction.update({

                embeds: [embed],

                components: [disabledRow]

            });

        }

        // =========================
        // Cancel Tryout
        // =========================

        if (interaction.customId.startsWith("cancelTryout")) {

            const ownerId = interaction.customId.split("_")[1];

            const isOwner = interaction.user.id === ownerId;

            const isAdmin =
                interaction.member.permissions.has(
                    PermissionFlagsBits.Administrator
                );

            if (!isOwner && !isAdmin) {

                return interaction.reply({

                    content:
                        "❌ You don't have permission to cancel this tryout.",

                    ephemeral: true

                });

            }

            return interaction.message.delete();

        }

    }

};