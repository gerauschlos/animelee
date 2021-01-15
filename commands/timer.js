exports.run = (client, message, args) => {
    if(args.length == 0){
        return message.channel.send(`Please include the amount of time and the measure, S for seconds, M for minutes, D for days. E.g: \!timer 5 m\``)
    }
    if(args.length == 1){
        return message.channel.send(`Please include the amount of time and the measure, S for seconds, M for minutes, D for days. E.g: \!timer 5 m\``)
    }
    let time = Math.floor(parseInt(args[0]))
    let check = args[1].toLowerCase()
    var am = "minutes"
    var ms = time * 60000
    if(check == `s`){
        var am = "seconds"
        var ms = time * 1000
    }
    else if(check == `m`){
        var am = "minutes"
        var ms = time * 60000
    }
    else if(check == `h`){
        var am = "hours"
        var ms = time * 3600000
    }
    else if(check == `d`){
        var am = "days"
        var ms = time * 86400000
    }
    const ayy = client.emojis.get("680868650718199864");
    message.channel.send(`Your timer has been set for \`${time}\` ${am}.`)
    setTimeout(() => {message.channel.send(`Tuturuu ${ayy}! Your timer is up <@${message.author.id}>!`); }, ms);
}