const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    async run(client) {

        await client.application.commands.set(client.commands.map(command => command.data));
        console.log('[SlashCommands] => Loaded');
        client.user.setActivity('un vrai bozo', { type: ActivityType.Watching });

        console.log(`[Bot] => Logged in as ${client.user.tag}`);
    }
}