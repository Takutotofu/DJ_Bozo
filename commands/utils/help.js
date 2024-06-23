const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help on how to use the bot.')
        .setDMPermission(true)
        .setDefaultMemberPermissions(null)
        .addStringOption(opt => opt.setName('command').setDescription('The command you want to get help for.').setRequired(false)),
    category: 'utils',

    async run(interaction) {
        let command;
        if (interaction.options.getString('command')) {
            command = interaction.client.commands.get(interaction.options.getString('command').toLowerCase());
            if (!command) return await interaction.reply({content: 'Command not found.', ephemeral: true});
        }

        if (!command) {
            let categories = [];
            interaction.client.commands.forEach(cmd => {
                if (!categories.includes(cmd.category)) categories.push(cmd.category);
            });
            
            let embed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle('All commands for ***' + interaction.client.user.tag+'***')
                .setThumbnail(interaction.client.user.avatarURL())
                .setDescription(`Commands : \`${interaction.client.commands.size}\`\nCategories : \`${categories.length}\``)
                .setTimestamp()
                .setFooter({text: 'Requested by ' + interaction.user.tag, iconURL: interaction.user.avatarURL()});

            await categories.sort().forEach(async category => {
                let commands = interaction.client.commands.filter(cmd => cmd.category === category);
                embed.addFields({name: category, value: `${commands.map(cmd => `\`${cmd.data.name}\` : ${cmd.data.description}`).join('\n')}`});
            });
            
            await interaction.reply({embeds: [embed], ephemeral: true});

        } else {
            let embed = new EmbedBuilder()
                .setColor(interaction.client.color)
                .setTitle(`Command ***/${command.data.name}***`)
                .setThumbnail(interaction.client.user.avatarURL())
                .setDescription(`Category : \`${command.category}\`\nName : \`${command.data.name}\`\nDescription : \`${command.data.description}\`\n Permission : \`${command.data.DefaultMemberPermissions}\`\nDM : \`${command.data.DMPermission ? 'Yes' : 'No'}\``)
                .setTimestamp()
                .setFooter({text: 'Requested by ' + interaction.user.tag, iconURL: interaction.user.avatarURL()});

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
};