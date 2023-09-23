const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('指定したユーザーを追放します')
        .addUserOption(option => option.setName('member').setDescription('追放するメンバーを指定してください').setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers),
    async execute(interaction) {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error(権限不足)', value: 'Botにメンバーを追放する権限(`KickMembers`)が付与されていません。\n管理者に問い合わせてください。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#ff0000')], ephemeral: true });
        const user = interaction.options.getUser('member');
        const member = await interaction.guild.members.fetch(user.id);
        if (!member) return interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '存在しないメンバーです。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#ff0000')], ephemeral: true });
        member.timeout(time)
            .then(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Done.', value: '指定したユーザーを追放しました。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('#3CB371')], ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Error', value: '指定したユーザーを追放できませんでした。' }).setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() }).setColor('ff0000')], ephemeral: true });
            });
    }
};