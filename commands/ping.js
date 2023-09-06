const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('応答テスト'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
};