const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async run(client, message) {
        if (message.author.bot) return;
        if (message.content.toLowerCase().includes('roméo') || message.content.toLowerCase().includes('romeo')) return message.reply('Un vrai bozo celui-la :clown:');
        if (message.content.toLowerCase().includes('seb')) return message.reply('Un vrai bozo celui-la :clown:');
    }
}