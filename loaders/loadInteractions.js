const { readdirSync } = require('fs');

module.exports = (client) => {
    let count = 0;
    const dirsInteractions = readdirSync('./interactions');
    for (const dir of dirsInteractions) {
        const fileDirs = readdirSync(`./interactions/${dir}`).filter((file) => file.endsWith('.js'));
        for (const file of fileDirs) {
            const interaction = require(`../interactions/${dir}/${file}`);
            client.interactions.set(interaction.name, interaction);
            count++;
        }
    };
    console.log(`[Interactions] => Loaded ${count} interactions`);
};