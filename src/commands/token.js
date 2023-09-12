const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('token')
        .setDescription('Token検知のon/off')
        .addSubcommand(subcommand =>
            subcommand
                .setName('enable')
                .setDescription('Token検知の有効化'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Token検知の無効化'))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'enable') {
            const serverId = interaction.guild.id;
            const data = require(`${__dirname}/../jsons/token.json`);
            let serverData = data[serverId];
            if (!serverData) {
                serverData = {};
                data[serverId] = serverData;
            }
            serverData['Token検知'] = subcommand;
            fs.writeFile(`${__dirname}/../jsons/token.json`, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    const errorstack = '```js\n' + err.stack + '```';
                    interaction.reply({ embeds: [new EmbedBuilder().setTitle(`${err}`).setColor('#ff0000').setDescription(`${errorstack}\n</bugreport:1084336997973364850>でバグを報告してください。`)] })
                } else {
                    interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: 'Token検知を有効化しました。' }).setColor('#3CB371').setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                }
            });
        };
        if (subcommand === 'disable') {
            const serverId = interaction.guild.id;
            const data = require(`${__dirname}/../jsons/token.json`);
            let serverData = data[serverId];
            if (!serverData) {
                serverData = {};
                data[serverId] = serverData;
            }
            serverData['Token検知'] = subcommand;
            fs.writeFile(`${__dirname}/../jsons/token.json`, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    const errorstack = '```js\n' + err.stack + '```';
                    interaction.reply({ embeds: [new EmbedBuilder().setTitle(`${err}`).setColor('#ff0000').setDescription(`${errorstack}\n</bugreport:1084336997973364850>でバグを報告してください。`)] })
                } else {
                    interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: 'Token検知を無効化しました。' }).setColor('#3CB371').setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                }
            });
        };
    }
}
