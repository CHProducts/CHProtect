const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('指定したユーザーをタイムアウトします')
        .addUserOption(option => option.setName('member').setDescription('メンバーを指定してください').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('分数を指定してください').setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers),
    async execute(interaction) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error(権限不足)', value: 'Botにメンバーを管理する権限(`ModerateMembers`)が付与されていません。\n管理者に問い合わせてください。' }).setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#ff0000')], ephemeral: true });
        const user = interaction.options.getUser('member');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '存在しないメンバーです。' }).setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#ff0000')], ephemeral: true });
        const time = interaction.options.getInteger('time');
        member.timeout(time * 60 * 1000)
            .then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: '指定したユーザーをタイムアウトしました。' }).setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#3CB371')], ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '指定したユーザーをタイムアウトできませんでした。' }).setFooter({ text: 'None 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('ff0000')], ephemeral: true });
            });
    }
};
