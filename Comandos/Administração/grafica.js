const Discord = require("discord.js")

module.exports = {
    name: "grafica", // Coloque o nome do comando
    description: "Abra o painel de solicitações.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
        } else {
            let embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setDescription(`Faça sua impressão selecionando uma das opções abaixo:`);

            let painel = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("reservista")
                    .setLabel("Reservista")
                    .setEmoji("📃")
                    .setStyle(Discord.ButtonStyle.Primary),
              
                

            );

            interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
            interaction.channel.send({ embeds: [embed], components: [painel] })
        }


    }
}