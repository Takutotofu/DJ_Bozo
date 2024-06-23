const { readdirSync } = require('fs');

module.exports = client => {
    const dirsEvents = readdirSync('./events');
    
    let count = 0;
    for (const dir of dirsEvents) {
        const events = readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));
        for (const file of events) {
            const event = require(`../events/${dir}/${file}`);
            if (dir === 'music') client.player.events.on(event.name, (...args) => event.run(client, ...args));
            else client.on(event.name, (...args) => event.run(client, ...args));
            count++;
        }
    };

    console.log(`[Events] => Loaded ${count} events`);
}