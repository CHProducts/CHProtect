const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('遅延値を表示します'),
    async execute(interaction) {
        await interaction.reply({ embeds: [new EmbedBuilder().addFields({ name: 'Pong!', value: `${interaction.client.ws.ping}ms` }).setColor('#3CB371').setFooter({ text: 'CH Protect 0.0.1', iconURL: interaction.client.user.displayAvatarURL() })] });
    }
};