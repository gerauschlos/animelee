exports.run = (client, message, args) => {
    let time = Math.floor(client.ping)
    message.channel.send(`Im not being fast for you! Baka.. ${time}ms`).catch(console.error);


}