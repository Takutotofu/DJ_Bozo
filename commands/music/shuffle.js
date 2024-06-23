const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffle the queue.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),
    category: 'music',

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()) return await interaction.reply({ content: 'There is no music playing!', ephemeral: true });
        if (queue.tracks.data.length < 2) return await interaction.reply({ content: 'There are not enough songs in the queue to shuffle!', ephemeral: true });

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelMember) return await interaction.followUp('You need to be in a voice channel to play music!');
        if (voiceChannelBot && voiceChannelMember.id !== voiceChannelMember.id) return await interaction.followUp('You need to be in the same voice channel as me to play music!');

        queue.tracks.shuffle();
        await interaction.reply('🔀 | The queue has been shuffled!');

    }
};