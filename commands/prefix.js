exports.run = (client, message, args) => {
    if(message.member.hasPermission('ADMINISTRATOR', false, false)) {
        if(args.length == 0){
            return message.channel.send(`Please include the new prefix.`)
        }
        client.servers.set(message.guild.id, args[0], "prefix")
        message.channel.send(`Prefix set to \`${args[0]}\``)
    }
}