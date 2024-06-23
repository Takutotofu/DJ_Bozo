const { useQueue, QueueRepeatMode } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loop the current song.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addStringOption(opt => opt.setName('option').setDescription('The mode of loop').setRequired(true).addChoices({name:'Current', value:'current'}, {name:'Queue', value:'queue'})),
    category: 'music',

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()) return await interaction.reply({ content: 'There is no music playing!', ephemeral: true });

        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelMember) return await interaction.followUp('You need to be in a voice channel to play music!');
        if (voiceChannelBot && voiceChannelMember.id !== voiceChannelMember.id) return await interaction.followUp('You need to be in the same voice channel as me to play music!');

        const option = interaction.options.getString('option');
        if (option !== 'current' && option !== 'queue') return await interaction.reply({ content: 'Invalid option. Please choose between `current` and `queue`.', ephemeral: true });

        switch (option) {
            case 'current':
                if (queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.TRACK);
                    await interaction.reply('🔂 | The current song has been looped!');
                } else {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply('🔂❌ | The current song loop has been disabled!');
                }
                break;
            case 'queue':
                if (queue.repeatMode === 0) {
                    queue.setRepeatMode(QueueRepeatMode.QUEUE);
                    await interaction.reply('🔁 | The queue has been looped!');
                } else {
                    queue.setRepeatMode(QueueRepeatMode.OFF);
                    await interaction.reply('🔁❌ | The queue loop has been disabled!');
                }
                break
        
            default:
                break;
        }

    }
};