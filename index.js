const Discord = require("discord.js")
const Jimp = require('jimp')

const config = require("./config.json")

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds
  ]
});

module.exports = client

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

const { QuickDB } = require("quick.db")
const db = new QuickDB(); // npm i quick.db better-sqlite3

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} Não envie links no servidor!`)
    }

  }
})

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "ausencia") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 1.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setLabel("Fechar ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );
            let botao2 = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("ausencia")
                .setLabel("Ausência")
                .setEmoji("📃")
                .setStyle(Discord.ButtonStyle.Success)
            );

            ch.send({ embeds: [embed], components: [botao, botao2] }).then(m => {
              m.pin()
            })
          })
        }

      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 2.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            ch.send({ embeds: [embed], components: [botao] }).then(m => {
              m.pin()
            })
          })
        }

      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.id}`;
        let categoria = "" // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
            name: nome,
            type: Discord.ChannelType.GuildText,
            parent: categoria,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [
                  Discord.PermissionFlagsBits.ViewChannel
                ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks,
                  Discord.PermissionFlagsBits.AddReactions
                ]
              }
            ]
          }).then((ch) => {
            interaction.reply({ content: `✅ Olá ${interaction.user}, seu ticket foi aberto em ${ch}!`, ephemeral: true })
            let embed = new Discord.EmbedBuilder()
              .setColor("Random")
              .setDescription(`Olá ${interaction.user}, você abriu o ticket pela opção 3.`);
            let botao = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("fechar_ticket")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger)
            );

            ch.send({ embeds: [embed], components: [botao] }).then(m => {
              m.pin()
            })
          })
        }

      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.reply(`Olá ${interaction.user}, este ticket será excluído em 5 segundos...`)
      setTimeout(() => {
        try {
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)
    } else if (interaction.customId === "ausencia") {
      const modal = new Discord.ModalBuilder()
        .setTitle('Ausencia')
        .setCustomId('modalAusencia')
        .setComponents(
          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('Dia incio da ausência (DD/MM/AAAA)')
              .setCustomId('inicio')
              .setStyle(Discord.TextInputStyle.Short)
          ),
          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('Dia tremino da ausência (DD/MM/AAAA)')
              .setCustomId('termino')
              .setStyle(Discord.TextInputStyle.Short)
          ),
          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('Motivo')
              .setCustomId('motivo')
              .setStyle(Discord.TextInputStyle.Paragraph)
          )
        );

      interaction.showModal(modal);
    } else if (interaction.customId === "sugerir") {
      const modal = new Discord.ModalBuilder()
        .setTitle('Sugerir')
        .setCustomId('modalSugerir')
        .setComponents(

          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('Escreva aqui sua sugestão')
              .setCustomId('sugestao')
              .setStyle(Discord.TextInputStyle.Paragraph)
          )
        );

      interaction.showModal(modal);
    } else if (interaction.customId === "reservista") {
      const modal = new Discord.ModalBuilder()
        .setTitle('Reservista')
        .setCustomId('modalReservista')
        .setComponents(

          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('Nome:')
              .setCustomId('nome')
              .setStyle(Discord.TextInputStyle.Short)
          ),
          new Discord.ActionRowBuilder().setComponents(
            new Discord.TextInputBuilder()
              .setLabel('ID')
              .setCustomId('id')
              .setStyle(Discord.TextInputStyle.Short)
          )
        );

      interaction.showModal(modal);
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modalAusencia") {

      const inicio = interaction.fields.getTextInputValue('inicio');
      const termino = interaction.fields.getTextInputValue('termino');
      const motivo = interaction.fields.getTextInputValue('motivo');
      let membro = interaction.guild.members.cache.get(interaction.user.id);
      interaction.reply({ content: `O usuário ${membro} teve seu apelido alterado.`, ephemeral: true })
      const embed = new Discord.EmbedBuilder()
        .setTitle('Ministério da Defesa | Sistema de Ausência:')
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/cRDjGLK.png')
        .setColor('Green')
        .addFields(
          {
            name: '👮 | Militar: ', value: interaction.user.toString()
          }, {
          name: 'Inicio Ausência: ', value: interaction.fields.getTextInputValue('inicio'),
        }, {
          name: 'Termino Ausência: ', value: interaction.fields.getTextInputValue('termino')
        }, {
          name: 'Motivo Ausência: ', value: interaction.fields.getTextInputValue('motivo')
        }
        )
      var canal = interaction.channel
      canal.id = config.AUSENCIA_CHANNEL
      canal.send({ embeds: [embed] })
    } else if (interaction.customId === "modalSugerir") {
      let canal = interaction.guild.channels.cache.get(config.CANAL_SUGERIR) // Canal de sugestões do servidor
      if (!canal) {
        interaction.reply(`Olá ${interaction.user}, o canal de sugestões ainda não foi configurado no script!`)
      } else {
        let sugestao = interaction.fields.getTextInputValue('sugestao');
        let embed = new Discord.EmbedBuilder()
          .setColor("Green")
          .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
          .setTitle("Nova sugestão!")
          .setDescription(`**Sugestão de ${interaction.user}:**\n${sugestao}`);

        canal.send({ embeds: [embed] }).then(msg => {
          msg.react("✅")
          msg.react("❌")
          interaction.reply({ content: `Olá ${interaction.user}, sua sugestão foi publicada em ${canal} com sucesso.`, ephemeral: true })
        }).catch(() => {
          interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!`, ephemeral: true })
        })
      }
    } else if (interaction.customId === "modalReservista") {
       const canal = interaction.channel
      canal.id = config.CANAL_RESERVISTA
      const hoje = new Date()
      const nome = interaction.fields.getTextInputValue('nome')
      const id = interaction.fields.getTextInputValue('id')
      const dia = hoje.getDate().toString().padStart(2,'0')
      const mes = String(hoje.getMonth() + 1).padStart(2,'0')
      const ano = hoje.getFullYear()
      const emissao = `Data de Emissão: ${dia}/${mes}/${ano}`
 
      Promise.all([
        Jimp.read('./img/reservista/fundo.png'),
        Jimp.loadFont(Jimp.FONT_SANS_32_BLACK),
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
      ]).then(([fundo, fonte, fonte2]) => {
        fundo.print(fonte, 80, 350, nome)
        fundo.print(fonte, 450, 260, id)
        fundo.print(fonte2, 80, 450, emissao)
        fundo.write('./img/reservista/reservista.png')

        canal.send({ files: ["./img/reservista/reservista.png"] }).then(msg => {
          interaction.reply({ content: `Olá ${interaction.user}, foi emitido a carteira de reservista e foi publicada no ${canal} com sucesso.`, ephemeral: true })
        }).catch(() => {
          interaction.reply({ content: `Ops ${interaction.user}, algo deu errado!`, ephemeral: true })
        })
      });
    }
  }  
})

client.on("guildMemberAdd", (member) => {
  let canal_logs = "1034170874300989581";
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content".
})

client.on("guildMemberRemove", (member) => {
  let canal_logs = "1034170890008658023"; // Coloque o ID do canal de texto
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Adeus ${member.user.username}....`)
    .setDescription(`> O usuário ${member} saiu do servidor!\n> 😓 Espero que retorne um dia.\n> Nos sobrou apenas \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content". 
})

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "porte") {
      if (interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`)) {
        let c = interaction.guild.channels.cache.find(c => c.name === `🎫-${interaction.user.id}`);
        interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true })
      } else {
        interaction.guild.channels.create(`🎫-${interaction.user.id}`, {
          type: "GUILD_TEXT",
          //parent: "",
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["VIEW_CHANNEL"]
            },
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
            }
          ]
        }).then(c => {

          interaction.reply({ content: `Olá, seu ticket foi aberto em ${c}.`, ephemeral: true })

          let embed = new Discord.MessageEmbed()
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setDescription(`Olá \`${interaction.user.username}\`, boas vindas ao seu ticket.\nAgurade alguns instantes para receber o suporte.\n\nFeche seu ticket com \`🔒\`.`);

          let botao = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("tf")
                .setEmoji("🔒")
                .setStyle("SECONDARY")
            );

          c.send({ embeds: [embed], components: [botao] }).then(msg => msg.pin())
        })
      }
    } else if (interaction.customId === "tf") {
      interaction.reply(`\\🔒 Olá ${interaction.user}, este ticket será fechado em \`5 segundos\`...`).then(() => {
        setTimeout(() => {
          interaction.channel.delete();
        }, 5000)
      })
    }
  }
});