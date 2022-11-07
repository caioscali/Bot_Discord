const Discord = require("discord.js")

module.exports = {
    name: "adm", // Coloque o nome do comando
    description: "Abra o painel de solicitações.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
        } else {
            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`Faça sua solicitação aqui no servidor selecionando uma das opções abaixo:`);

            let painel = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("ausencia")
                    .setLabel("Ausência")
                    .setEmoji("📃")
                    .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                    .setCustomId("sugerir")
                    .setLabel("Sugerir")
                    .setEmoji("🗃")
                    .setStyle(Discord.ButtonStyle.Success)



                // new Discord.SelectMenuBuilder()
                // .setCustomId("painel_ticket")
                // .setPlaceholder("Clique aqui!")
                // .addOptions(
                //     {
                //         label: "Informar Ausencia",
                //         description: "Informe sua ausencia.",
                //         value: "ausencia"
                //     },
                //     {
                //         label: "Opção 2",
                //         description: "Abra um ticket na opção 2.",
                //         value: "opc2"
                //     },
                //     {
                //         label: "Opção 3",
                //         description: "Abra um ticket na opção 3.",
                //         value: "opc3"
                //     }
                // )
            );

            interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [painel] })
        }


    }
}