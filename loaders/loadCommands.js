const { readdirSync } = require('fs');

module.exports = client => {
    let count = 0;
    const diresCommands = readdirSync('./commands');
    for (const dire of diresCommands) {
        const commands = readdirSync(`./commands/${dire}`).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const command = require(`../commands/${dire}/${file}`);
            client.commands.set(command.data.name, command);
            count++;
        }
    }

    console.log(`[Commands] => Loaded ${count} commands`)
}