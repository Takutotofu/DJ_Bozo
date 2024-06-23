const { SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with the bot\'s ping.')
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),
    category: 'utils',

    async run(interaction) {
        const button = new ActionRowBuilder().addComponents(new ButtonBuilder()
            .setCustomId('ping_aaaaaaaa')
            .setEmoji('🔁')
            .setLabel('Refresh')
            .setStyle(ButtonStyle.Secondary));

        await interaction.reply({content: `Ping : \`${interaction.client.ws.ping}ms\``, components: [button]});
    }
};