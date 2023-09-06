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
                )
            })
        );
    })) {
        await message.delete()
    }
    if (message.author.bot) return;
    const spamKey = `${message.author.id}-${message.content}`;
    let spamCount = spamMap.get(spamKey) || 0;

    if (spamCount >= 4) {
        message.channel.send({ embeds: [new Discord.EmbedBuilder().addFields({ name: 'スパム検知', value: `${message.author}はタイムアウトされました。` }).setColor('ff0000').setFooter({ text: 'None 0.0.1' })] });
        spamCount = 0
        message.member.timeout(2 * 60 * 1000)
        return;
    }

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
            embed.timestamp?.match(/[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/)
        );
    })) {
        await message.delete()
    }
})

client.login(process.env.TOKEN);