const { PermissionsBitField, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('任意のユーザーのメッセージをまとめて削除します。')
        .addUserOption(option => option.setName('member').setDescription('ユーザーを指定してください。').setRequired(true))
        .addIntegerOption(option => option.setName('count').setDescription('削除する数を指定してください。').setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),
    async execute(interaction) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error(権限不足)', value: 'Botにメッセージを管理する権限(`ManageMessages`)が付与されていません。\n管理者に問い合わせてください。' }).setFooter({ text: 'None 0.0.1' }).setColor('#ff0000')] });
        const user = interaction.options.getUser('member');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '存在しないメンバーです。' }).setFooter({ text: 'None 0.0.1' }).setColor('#ff0000')], ephemeral: true });
        const amount = interaction.options.getInteger('count');
        if (amount < 1 || amount > 100) {
            return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'countは1から100の間で指定してください。' }).setFooter({ text: 'None 0.0.1' }).setColor('#ff0000')], ephemeral: true });
        }
        const messages = await interaction.channel.messages.fetch({ limit: 100 });
        const userMessages = Array.from(messages.filter(m => m.author.id === member.id).values()).slice(0, amount);
        interaction.channel.bulkDelete(userMessages)
            .then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: `指定したメンバーの${userMessages.length}件のメッセージを削除しました。` }).setFooter({ text: 'None 0.0.1' }).setColor('#3CB371')], ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'メッセージを削除できませんでした。\n時間を空けて再度お試しください。' }).setFooter({ text: 'None 0.0.1' }).setColor('#ff0000')], ephemeral: true });
            })
    }
};