const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const spamMap = new Map();

const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.GuildMembers, Discord.GatewayIntentBits.MessageContent],
    allowedMentions: {
        parse: ["users"]
    }
});

client.commands = new Discord.Collection(); //commandsフォルダのChatInputCommandを格納するためのプロパティ
client.contexts = new Discord.Collection(); //commandsフォルダのContextMenuCommandを格納するためのプロパティ

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && !file.startsWith('context_'));
for (const file of commandFiles) {
    try {
        const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command);
        console.log(`Loaded command ${file}`);
    } catch (err) {
        console.error(`Unable to load file ${file}: ${err}`);
    };
};
const ContextFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file.startsWith('context_'));

for (const file of ContextFiles) {
    try {
        const command = require(`./commands/${file}`);
        client.contexts.set(command.data.name, command);
        console.log(`Loaded Context Menus command ${file}`);
    } catch (err) {
        console.error(`Unable to load file ${file}: ${err}`);
    };
};

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    client.user.setActivity('/help | Created By CatHouse Products')
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.guild) return interaction.reply('DMでは使用できません。');
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return interaction.reply({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Error', value: '実装されていないコマンドです。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })], ephemeral: true });
        try {
            await command.execute(interaction);
        } catch (error) {
            stderr(error)
            await interaction.reply({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Error', value: 'コマンドの実行中にエラーが発生しました。\n時間をおいて再度実行してください。\n(エラー内容は開発元に報告いたしました。)' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })], ephemeral: true });
        };
    };
    if (interaction.isButton()) {
        if (interaction.customId === 'button1' || interaction.customId === 'button6') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 1/4')
                .setDescription('誰でも使用できるコマンド')
                .addFields({ name: '</guide:1149594413568368680>', value: 'セットアップ方法を表示します。' })
                .addFields({ name: '</help:1149251261535883384>', value: 'コマンドの一覧を表示します。' })
                .addFields({ name: '</ping:1148074510755561472>', value: 'Botの応答テストに使用します。遅延値も表示します。' })
                .setColor('#3CB371')
                .setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('⏪')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button2')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary);
            const button4 = new Discord.ButtonBuilder()
                .setCustomId('button4')
                .setEmoji('⏩')
                .setStyle(Discord.ButtonStyle.Primary);
            const support = new Discord.ButtonBuilder()
                .setURL('https://discord.gg/pdTWZNghry')
                .setLabel('サポートサーバー')
                .setStyle(Discord.ButtonStyle.Link);
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3, button4, support);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        };
        if (interaction.customId === 'button2') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 2/4')
                .setDescription('特定の権限を持った人が使用できるコマンド')
                .addFields({ name: '</ban:1148938996127367238>', value: '**必須権限: メンバーをBAN**\n指定したメンバーをBanします。' })
                .addFields({ name: '</kick:1148938996127367239>', value: '**必須権限: メンバーをキック**\n指定したメンバーを追放します。' })
                .addFields({ name: '</timeout:1148938996127367240>', value: '**必須権限: メンバーをタイムアウト**\n指定したメンバーをタイムアウトします。' })
                .addFields({ name: '</untimeout:1148941549380575282>', value: '**必須権限: メンバーをタイムアウト**\n指定したメンバーのタイムアウトを解除します。' })
                .addFields({ name: '</clear:1148928229651009550>', value: '**必須権限: メッセージの管理**\n指定したメンバーのメッセージを一定数削除します。' })
                .setColor('#3CB371')
                .setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('⏪')
                .setStyle(Discord.ButtonStyle.Primary);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button6')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary);
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button3')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary);
            const button4 = new Discord.ButtonBuilder()
                .setCustomId('button4')
                .setEmoji('⏩')
                .setStyle(Discord.ButtonStyle.Primary);
            const support = new Discord.ButtonBuilder()
                .setURL('https://discord.gg/pdTWZNghry')
                .setLabel('サポートサーバー')
                .setStyle(Discord.ButtonStyle.Link);
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3, button4, support);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        };
        if (interaction.customId === 'button3') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 3/4')
                .setDescription('禁止ワード関連')
                .addFields({ name: '</banword add:1149320385259647057>', value: '禁止ワードを追加します。' })
                .addFields({ name: '</banword remove:1149320385259647057>', value: '指定した禁止ワードを除外します。' })
                .addFields({ name: '</banword list:1149320385259647057>', value: '登録されている禁止ワードの一覧を表示します。' })
                .addFields({ name: '</banword setting:1149320385259647057>', value: '指定した禁止ワードのタイムアウト時間を変更します。' })
                .setColor('#3CB371')
                .setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('⏪')
                .setStyle(Discord.ButtonStyle.Primary);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button2')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary)
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button4')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary)
            const button4 = new Discord.ButtonBuilder()
                .setCustomId('button5')
                .setEmoji('⏩')
                .setStyle(Discord.ButtonStyle.Primary);
            const support = new Discord.ButtonBuilder()
                .setURL('https://discord.gg/pdTWZNghry')
                .setLabel('サポートサーバー')
                .setStyle(Discord.ButtonStyle.Link);
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3, button4, support);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        };
        if (interaction.customId === 'button4' || interaction.customId === 'button5') {
            const embed = new Discord.EmbedBuilder()
                .setTitle('ヘルプ 4/4')
                .setDescription('デフォルトで動作する機能')
                .addFields({ name: 'スパム検知', value: '特定の時間内に数回連続で同じ発言をしたユーザーにタイムアウト処罰を実行します。\n**ただし、タイムアウト権限を所持しているユーザーは対象外となります。**\n秒数や回数、on/off等は今後のアップデートで各サーバーごとに設定できるようにする予定です。' })
                .addFields({ name: 'Token検知', value: '発言内にDiscord内で使用されるTokenが含まれていた場合削除します。\nデフォルトで有効ですが、</token enable:1149662028282208407>で有効化、</token disable:1149662028282208407>で無効化できます。' })
                .setColor('#3CB371')
                .setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() });
            const button1 = new Discord.ButtonBuilder()
                .setCustomId('button1')
                .setEmoji('⏪')
                .setStyle(Discord.ButtonStyle.Primary);
            const button2 = new Discord.ButtonBuilder()
                .setCustomId('button3')
                .setEmoji('◀')
                .setStyle(Discord.ButtonStyle.Primary);
            const button3 = new Discord.ButtonBuilder()
                .setCustomId('button')
                .setEmoji('▶')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const button4 = new Discord.ButtonBuilder()
                .setCustomId('button4')
                .setEmoji('⏩')
                .setStyle(Discord.ButtonStyle.Primary)
                .setDisabled(true);
            const support = new Discord.ButtonBuilder()
                .setURL('https://discord.gg/pdTWZNghry')
                .setLabel('サポートサーバー')
                .setStyle(Discord.ButtonStyle.Link);
            const row = new Discord.ActionRowBuilder()
                .addComponents(button1, button2, button3, button4, support);
            await interaction.update({ embeds: [embed], components: [row] }).catch(() => { });
        }
    };
    if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);

        try {
            await command.autocomplete(interaction);
        } catch (error) {
            console.error(error);
        };
    };
    if (interaction.isUserContextMenuCommand()) {
        const command = client.contexts.get(interaction.commandName);
        if (!command) return interaction.reply({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Error', value: '実装されていないコマンドです。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })], ephemeral: true });
        try {
            await command.execute(interaction);
        } catch (error) {
            stderr(error);
            await interaction.reply({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Error', value: 'コマンドの実行中にエラーが発生しました。\n時間をおいて再度実行してください。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })], ephemeral: true });
        };
    }
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('ch!eval')) {
        if (message.author.id !== '895050958441160734') return;
        const code = message.content
            .slice(`ch!eval`.length)
            .trim()
            .replace(/^```(js)?/, '')
            .replace(/```$/, '')
            .trim();
        if (!code) {
            return message.reply('?????????:middle_finger:');
        }
        (async function () {
            const asyncEval = async (code) => {
                return await eval(`(async () => {${code}})()`);
            };
            await asyncEval(code)
                .then(() => {
                    message.react('✅');
                })
                .catch((err) => {
                    message.reply(`${err}`);
                    message.react('❎');
                });
        })();
    }
    const tokendata = require('./jsons/token.json');
    const serverId = message.guild.id;
    const tokenData = tokendata[serverId];
    if (tokenData && Object.keys(tokenData).length > 0) {
        if (tokenData['Token検知'] === 'disable') return;
    }

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
            message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Token検知', value: 'Tokenの送信を検知しました。Bot自身にメッセージの管理権限(`ManageMessages`)がないため削除できません。\n' + `該当メッセージ: ${message.url}` }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })] });
        };
        await message.delete();
    };
    if (message.author.bot || message.member.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers)) return;
    const data = require('./jsons/banword.json');
    const serverData = data[serverId];
    if (serverData && Object.keys(serverData).length > 0) {
        for (const text in serverData) {
            if (message.content.includes(text)) {
                message.member.timeout(serverData[text] * 60 * 1000, 'サーバー内で設定されている禁止ワードの発言')
                    .then(() => {
                        message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: '禁止ワード検知', value: '禁止ワードを発言したためタイムアウトされました。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })] })
                    })
                    .catch(() => { });
            };
        };
    };
    const spamKey = `${message.author.id}-${message.content}`;
    let spamCount = spamMap.get(spamKey) || 0;

    if (spamCount >= 4) {
        message.member.timeout(2 * 60 * 1000, '同じ内容の発言を繰り返したため')
            .then(() => {
                message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'スパム検知', value: `${message.author}はタイムアウトされました。` }).setColor('ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })] })
            })
            .catch(() => { });
        return;
    };

    spamMap.set(spamKey, spamCount + 1);
    setTimeout(() => {
        spamMap.delete(spamKey);
    }, 10000);

});

client.on('messageUpdate', async (oldMessage, message) => {
    const tokendata = require('./jsons/token.json');
    const serverId = message.guild.id;
    const tokenData = tokendata[serverId];
    if (tokenData && Object.keys(tokenData).length > 0) {
        if (tokenData['Token検知'] === 'disable') return;
    }
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
            message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'Token検知', value: 'Tokenの送信を検知しました。Bot自身にメッセージの管理権限(`ManageMessages`)がないため削除できません。\n' + `該当メッセージ: ${message.url}` }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: client.user.displayAvatarURL() })] });
        };
        await message.delete();
    };
});

client.on('error', stderr);

client.login(process.env.TOKEN)
    .catch(console.error);

/**
 * @param {Error} error 
 */
async function stderr(error) {
    const webhook = new Discord.WebhookClient({ url: process.env.ERRORLOG_URL });
    await webhook.send({ embeds: [new Discord.EmbedBuilder().setTitle(error.name).addFields({ name: 'ERROR STACK', value: '```js\n' + error.stack + '\n```' }).setTimestamp().setColor('#ff0000')] });
};
