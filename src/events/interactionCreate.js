module.exports = {

    name: 'interactionCreate',

    async execute(interaction) {

        // =========================
        // Slash Commands
        // =========================
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {

                await command.execute(interaction);

            } catch (error) {

                console.error(error);

                if (interaction.replied || interaction.deferred) {

                    await interaction.followUp({
                        content: '❌ Something went wrong.',
                        ephemeral: true
                    });

                } else {

                    await interaction.reply({
                        content: '❌ Something went wrong.',
                        ephemeral: true
                    });

                }

            }

            return;

        }

        // =========================
        // Modal Submissions
        // =========================
        if (interaction.isModalSubmit()) {

            if (interaction.customId.startsWith("tryoutModal")) {

                const modal = require("../interactions/modals/tryoutModal");

                try {

                    await modal.execute(interaction);

                } catch (error) {

                    console.error(error);

                    if (!interaction.replied && !interaction.deferred) {

                        await interaction.reply({
                            content: "❌ Something went wrong while processing the tryout.",
                            ephemeral: true
                        });

                    }

                }

            }

            return;

        }

        // =========================
        // Buttons
        // =========================
        if (interaction.isButton()) {

            const buttons = require("../interactions/buttons/tryoutButtons");

            try {

                await buttons.execute(interaction);

            } catch (error) {

                console.error(error);

                if (!interaction.replied && !interaction.deferred) {

                    await interaction.reply({
                        content: "❌ Something went wrong while handling the button.",
                        ephemeral: true
                    });

                }

            }

            return;

        }

    }

};