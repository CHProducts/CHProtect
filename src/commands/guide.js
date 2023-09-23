const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('guide')
        .setDescription('このBotのセットアップガイドです。'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('セットアップガイド')
            .addFields({ name: 'まず初めに', value: 'このBotを導入してくださりありがとうございます。\nあなたのサーバーが安全に守られることを保証いたします。' })
            .addFields({ name: '1,ロールの順位', value: 'Botを導入した際に追加された「CH Protect」ロールの順位をできる限り上にするか、\nできる限り順位の高いロールをBotに付与してください。\nBot自身のロールより順位が高いロールが付与されているユーザーは対処できないためです。' })
            .addFields({ name: '2,権限の確認', value: 'Botに付与されているロールに「管理者」権限がついていることを確認してください。\n権限がない場合対処ができない場合があります。' })
            .addFields({ name: '\n', value: '\n' })
            .addFields({ name: '以上', value: '使用可能なコマンドは</help:1149251261535883384>で確認することが出来ます。' })
            .setColor('#3CB371')
            .setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() });
        await interaction.reply({ embeds: [embed] })
    }
};