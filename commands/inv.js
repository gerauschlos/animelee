exports.run = (client, message, args) => {
    if(!client.profile.has(message.author.id)){
        return message.channel.send(`You have not started Animelee!`)
    }
    const Discord = require(`discord.js`);

    const items = client.profile.get(message.author.id, "items");
    items.sort((a, b) => a-b)
    let items_set = Array.from(new Set(items));
    let size = 20;let arrayOfArrays=[];
    for(let i = 0;i<items_set.length;i+=size){
      arrayOfArrays.push(items_set.slice(i, i+size));
    }
    if(args.length == 0){
        var target = 0
    }
    else if(args.length !== 0){
        if(!isNaN(args[0])){
            var target = parseInt(args[0]) - 1
        }
        if(target + 2 > arrayOfArrays.length){
            return message.channel.send(`This is not a valid items page.`)
        }
    }
    let inv = arrayOfArrays[target]
    const inventory = new Discord.RichEmbed()
        .setColor(`#0099ff`)
        .setTitle(`Your inventory!`)
        .setAuthor(message.author.username)
        .setDescription(`To use an item marked "consumable" please see the \`!use\` command`);
    for (let i = 0; i < inv.length; i++) {
        let page = target * 10 
        let item = client.items.items[items_set[i]];
        let name = item.name;
        let type = item.type;
        let max = item.capacity;
        let held = items.reduce((total,x) => (x==items_set[i] ? total+1 : total), 0);
        inventory.addField(`${i+1+page}. ${name} x${held}/${max}`, `\`${type}\``);
    }
    message.channel.send(inventory);
}