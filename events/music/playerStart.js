module.exports = {
    name: 'playerStart',
    async run(client, queue, track) {
        await queue.metadata.channel.send(`🎶 | Now playing \`${track.title}\` during \`${track.duration}\``);
    }
};