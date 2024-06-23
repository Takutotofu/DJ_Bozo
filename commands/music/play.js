const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song in a voice channel.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addStringOption(opt => opt.setName('song').setDescription('The song you want to play').setRequired(true)),
    category: 'music',

    async run(interaction) {
        await interaction.deferReply();
        const song = interaction.options.getString('song');

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelMember) return await interaction.followUp('You need to be in a voice channel to play music!');
        if (voiceChannelBot && voiceChannelMember.id !== voiceChannelMember.id) return await interaction.followUp('You need to be in the same voice channel as me to play music!');

        try {
            const { track } = await interaction.client.player.play(voiceChannelMember, song, {
                requestedBy: interaction.user,
                nodeOptions: {
                    metadata: interaction,
                    volume: 100,
                    leaveOnStop: true,
                    leaveOnEmpty: true,
                    leaveOnEnd: false,
                    selfDeaf: true
                }
            });
    
            await interaction.followUp(`\`${track.title}\` during \`${track.duration}\` has been added to the queue!`);
        } catch (err) {
            return await interaction.followUp(`The song \`${song}\` could not be played.`);
        };
    }
};