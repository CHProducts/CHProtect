const { EmbedBuilder, SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('このボットのヘルプを表示します。'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('ヘルプ 1/4')
            .setDescription('誰でも使用できるコマンド')
            .addFields({ name: '</guide:1149594413568368680>', value: 'セットアップ方法を表示します。' })
            .addFields({ name: '</help:1149251261535883384>', value: 'コマンドの一覧を表示します。' })
            .addFields({ name: '</ping:1148074510755561472>', value: 'Botの応答テストに使用します。遅延値も表示します。' })
            .setColor('#3CB371')
            .setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() });
        const button1 = new ButtonBuilder()
            .setCustomId('button1')
            .setEmoji('⏪')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);
        const button2 = new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('◀')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);
        const button3 = new ButtonBuilder()
            .setCustomId('button2')
            .setEmoji('▶')
            .setStyle(ButtonStyle.Primary);
        const button4 = new ButtonBuilder()
            .setCustomId('button4')
            .setEmoji('⏩')
            .setStyle(ButtonStyle.Primary);
        const support = new ButtonBuilder()
            .setURL('https://discord.gg/pdTWZNghry')
            .setLabel('サポートサーバー')
            .setStyle(ButtonStyle.Link);
        const row = new ActionRowBuilder()
            .addComponents(button1, button2, button3, button4, support);
        await interaction.reply({ content: 'コマンド一覧が表示されない？\n設定＞アプリの設定＞テキスト・画像＞から「埋め込みとリンクのプレビュー」の「埋め込み画像を表示し、チャットに投稿されたウェブリンクをプレビューします」をオンにしてください。', embeds: [embed], components: [row] });
    }
};