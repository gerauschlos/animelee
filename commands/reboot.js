exports.run = async (client, message, argsl) => {
    if(message.author.id !== '314385179420393472'){
        return message.channel.send(`You cannot use this command!`)
    }
    try {
      await message.reply("Bot is shutting down.");
      process.exit(1);
    } catch (e) {
      return message.channel.send("Couldn't reboot, please check console")
      console.log(e);
    }
};