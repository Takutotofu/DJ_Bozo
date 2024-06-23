const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

const MIN_VOLUME = 1;
const MAX_VOLUME = 200;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setvolume')
        .setDescription('Set the volume of the music player.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(null)
        .addNumberOption(opt => opt.setName('volume').setDescription('Value between 1 and 200').setRequired(true).setMaxValue(MAX_VOLUME).setMinValue(MIN_VOLUME)),
    category: 'music',

    async run(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue || !queue.isPlaying()) return await interaction.reply({ content: 'There is no music playing!', ephemeral: true });
        
        const voiceChannelMember = interaction.member.voice.channel;
        const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice.channel;
        if (!voiceChannelMember) return await interaction.followUp('You need to be in a voice channel to play music!');
        if (voiceChannelBot && voiceChannelMember.id !== voiceChannelMember.id) return await interaction.followUp('You need to be in the same voice channel as me to play music!');

        const volume = interaction.options.getNumber('volume');
        if (queue.node.volume === volume) return await interaction.reply({content: `The volume is already set to \`${queue.node.volume}%\`.`, ephemeral: true});
        
        queue.node.setVolume(volume);
        await interaction.reply(`The volume has been set to ${queue.node.volume}%.`);
    }
};