const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('banword')
        .setDescription('禁止ワードの設定を行います。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('禁止ワードの追加を行います。')
                .addStringOption(option => option.setName('text').setDescription('禁止するワードを入力してください。').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('setting')
                .setDescription('特定の禁止ワードの設定を行います。')
                .addStringOption(option => option.setName('text').setDescription('設定を変更する禁止ワードを指定してください。').setRequired(true).setAutocomplete(true))
                .addIntegerOption(option => option.setName('time').setDescription('タイムアウトする時間を設定してください。').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('指定した禁止ワードを除外します。')
                .addStringOption(option => option.setName('text').setDescription('除外する禁止ワードを指定してください。').setRequired(true).setAutocomplete(true)))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        const data = require(`${__dirname}/../jsons/banword.json`);
        const choices = [];
        const serverData = data[interaction.guild.id];
        if (!serverData || Object.keys(serverData).length === 0) return;
        Object.keys(data[interaction.guild.id]).forEach(key => {
            choices.push(key);
        });
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));
        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );
    },
    async execute(interaction) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error(権限不足)', value: 'Botにメンバーをタイムアウトする権限(`ModerateMembers`)が付与されていないため設定できません。\n管理者に問い合わせてください。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#ff0000')], ephemeral: true });
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'add') {
            const text = interaction.options.getString('text')
            const serverId = interaction.guild.id;
            const filePath = `${__dirname}/../jsons/banword.json`;
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    return;
                }

                let jsonData;

                try {
                    jsonData = JSON.parse(data);
                } catch (parseErr) {
                    interaction.reply({ content: 'セーブデータの解析中にエラーが発生しました。', ephemeral: true });
                    return;
                }

                if (jsonData === null) {
                    interaction.reply({ content: '他のプロセスによってファイルが使用中です。しばらく待ってから再試行してください。', ephemeral: true });
                    return;
                }
                let serverData = data[serverId];
                if (!serverData) {
                    serverData = {};
                    data[serverId] = serverData;
                };
                serverData[text] = 2;
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    } else {
                        interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: `「${text}」を禁止ワードに追加しました。` }).setColor('#3CB371').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    };
                });
            });
        };
        if (subcommand === 'remove') {
            const text = interaction.options.getString('text')
            const serverId = interaction.guild.id;
            const filePath = `${__dirname}/../jsons/banword.json`;
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    return;
                }

                let jsonData;

                try {
                    jsonData = JSON.parse(data);
                } catch (parseErr) {
                    interaction.reply({ content: 'セーブデータの解析中にエラーが発生しました。', ephemeral: true });
                    return;
                }

                if (jsonData === null) {
                    interaction.reply({ content: '他のプロセスによってファイルが使用中です。しばらく待ってから再試行してください。', ephemeral: true });
                    return;
                }
                const serverData = data[serverId];
                if (!serverData || !serverData[text]) {
                    interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: `${text}という禁止ワードは登録されていません。` }).setColor('ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    return;
                };
                delete serverData[text];
                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    } else {
                        interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: `「${text}」を禁止ワードから除外しました。` }).setColor('#3CB371').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    };
                });
            })
        };
        if (subcommand === 'setting') {
            const text = interaction.options.getString('text');
            const time = interaction.options.getInteger('time')
            const serverId = interaction.guild.id;
            const filePath = `${__dirname}/../jsons/banword.json`;
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    return;
                }

                let jsonData;

                try {
                    jsonData = JSON.parse(data);
                } catch (parseErr) {
                    interaction.reply({ content: 'セーブデータの解析中にエラーが発生しました。', ephemeral: true });
                    return;
                }

                if (jsonData === null) {
                    interaction.reply({ content: '他のプロセスによってファイルが使用中です。しばらく待ってから再試行してください。', ephemeral: true });
                    return;
                }
                const serverData = data[serverId];
                if (!serverData || Object.keys(serverData).length === 0) {
                    interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '禁止ワードの登録がありません。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    return;
                };
                if (!serverData[text]) {
                    interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: `${text}という禁止ワードは登録されていません。` }).setColor('ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    return;
                };
                if (time < 1) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '引数「time」には1以上の数を指定してください。' }).setColor('ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                data[interaction.guild.id][text] = time;

                fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });
                    } else {
                        interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: `「${text}」のタイムアウト時間を${time}分に変更しました。` }).setColor('#3CB371').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })], ephemeral: true });
                    };
                });
            });
        };
    }
};