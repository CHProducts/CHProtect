const { ContextMenuCommandBuilder, ApplicationCommandType, PermissionsBitField, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('このメンバーを追放')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetUser.id)
        if (!member) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: 'サーバー内に存在しないメンバーです。' }).setColor('#ff0000').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })] });
        member.kick()
            .then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: '指定したメンバーを追放しました。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#3CB371')], ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '指定したメンバーを追放できませんでした。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('ff0000')], ephemeral: true });
            });
    }
};