const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null),
    category: 'music',

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()) return await interaction.reply({ content: 'There is no music playing!', ephemeral: true });
        if (!queue.history.nextTrack) return await interaction.reply({ content: 'There is no next song to go next to!', ephemeral: true });

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelMember) return await interaction.followUp('You need to be in a voice channel to play music!');
        if (voiceChannelBot && voiceChannelMember.id !== voiceChannelMember.id) return await interaction.followUp('You need to be in the same voice channel as me to play music!');

        queue.node.skip();
        await interaction.reply(`⏭️ | The music \`${queue.history.currentTrack.title}\` is skipped for \`${queue.history.nextTrack.title}\`!`);
    }
};