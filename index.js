const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.MessageContent]
});
const fs = require('fs');
require('dotenv').config();
const spamMap = new Map();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
        console.log(`Loaded command ${file}`);
    } catch (err) {
        console.error(`Unable to load file ${file}: ${err}`);
    };
};

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    client.user.setActivity('てすとちう')
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.guild === null) return interaction.reply('DMでは使用できません。');
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'まだコマンドが実装されていないようです。実装されるまでお待ちください。', ephemeral: true });
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `エラーが発生しました。時間をおいて再度実行してください。`, ephemeral: true });
        };
    };
    if (interaction.isButton()) {
        if (interaction.customId === 'button1') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 1/3')
                .setDescription('誰でも使用できるコマンド')
                .addFields({ name: '</help:1149251261535883384>', value: 'コマンドの一覧を表示します。' })
                .addFields({ name: '</ping:1148074510755561472>', value: 'Botの応答テストに使用します。遅延値も表示します。' })
                .setColor('#3CB371')
                .setFooter({ text: 'None 0.0.1' });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button2')
                .setEmoji('⏹')
                .setStyle(Discord.ButtonStyle.Primary);
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button3')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary)
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });

        };
        if (interaction.customId === 'button2') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 2/3')
                .setDescription('特定の権限を持った人が使用できるコマンド')
                .addFields({ name: '</ban:1148938996127367238>', value: '**必須権限: メンバーをBAN**\n指定したメンバーをBanします。' })
                .addFields({ name: '</kick:1148938996127367239>', value: '**必須権限: メンバーをキック**\n指定したメンバーを追放します。' })
                .addFields({ name: '</timeout:1148938996127367240>', value: '**必須権限: メンバーをタイムアウト**\n指定したメンバーをタイムアウトします。' })
                .addFields({ name: '</untimeout:1148941549380575282>', value: '**必須権限: メンバーをタイムアウト**\n指定したメンバーのタイムアウトを解除します。' })
                .addFields({ name: '</clear:1148928229651009550>', value: '**必須権限: メッセージの管理**\n指定したメンバーのメッセージを一定数削除します。' })
                .setColor('#3CB371')
                .setFooter({ text: 'None 0.0.1' });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button2')
                .setEmoji('⏹')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button3')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary)
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        };
        if (interaction.customId === 'button3') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 3/3')
                .setDescription('デフォルトで動作する機能')
                .addFields({ name: 'スパム検知', value: '特定の時間内に数回連続で同じ発言をしたユーザーにタイムアウト処罰を実行します。\n**ただし、タイムアウト権限を所持しているユーザーは対象外となります。**\n秒数や回数、on/off等はオプションで設定できるようにしますがんばりますゆるして' })
                .addFields({ name: 'Token検知', value: '発言内にDiscord内で使用されるTokenが含まれていた場合削除します。\non/offはオプションで設定できるようにしますがんばりますゆるして' })
                .setColor('#3CB371')
                .setFooter({ text: 'None 0.0.1' });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button2')
                .setEmoji('⏹')
                .setStyle(Discord.ButtonStyle.Primary)
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button3')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        };
    };
});

client.on('messageCreate', async (message) => {
    if (message.content.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/)) return await message.delete()
    if (message.embeds.some(embed => {
        return (
            embed.title?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.description?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.name?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.iconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.proxyIconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.text?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.iconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.proxyIconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.thumbnail?.proxyURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.thumbnail?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.video?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.video?.proxyURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.timestamp?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.fields?.some(field => {
                return (
                    field.name?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
                    field.value?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/)
                );
            })
        );
    })) {
        if (!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Token検知', value: 'Tokenの送信を検知しました。Bot自身にメッセージの管理権限(`ManageMessages`)がないため削除できません。\n' + `該当メッセージ: ${message.url}` }).setColor('#ff0000').setFooter({ text: 'None 0.0.1' })] });
        };
        await message.delete();
    }
    if (message.author.bot || message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers)) return;
    const spamKey = `${message.author.id}-${message.content}`;
    let spamCount = spamMap.get(spamKey) || 0;

    if (spamCount >= 4) {
        message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'スパム検知', value: `${message.author}はタイムアウトされました。` }).setColor('ff0000').setFooter({ text: 'None 0.0.1' })] });
        message.member.timeout(2 * 60 * 1000);
        return;
    };

    spamMap.set(spamKey, spamCount + 1);
    setTimeout(() => {
        spamMap.delete(spamKey);
    }, 10000);
});

client.on('messageUpdate', async (oldMessage, message) => {
    if (message.content.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/)) return await message.delete()
    if (message.embeds.some(embed => {
        return (
            embed.title?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.description?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.name?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.iconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.proxyIconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.author?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.text?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.iconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.footer?.proxyIconURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.thumbnail?.proxyURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.thumbnail?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.video?.url?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.video?.proxyURL?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.timestamp?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
            embed.fields?.some(field => {
                return (
                    field.name?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/) ||
                    field.value?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/)
                );
            })
        );
    })) {
        if (!message.guild.members.me.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Token検知', value: 'Tokenの送信を検知しました。Bot自身にメッセージの管理権限(`ManageMessages`)がないため削除できません。\n' + `該当メッセージ: ${message.url}` }).setColor('#ff0000').setFooter({ text: 'None 0.0.1' })] });
            return;
        };
        await message.delete();
    };
});

client.login(process.env.TOKEN);
