exports.run = async (client, message, args) => {
    const code = args.join(" ");
    const validusers = ['314385179420393472', '377551134702829568', '165918545975181312', '229601796442685440']
if(!validusers.includes(message.author.id)){
    return message.channel.send("You can't use this command!")
}
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    const MAX_CHARS = 3 + 2 + clean.length + 3;
      if (MAX_CHARS > 2000) {
        message.channel.send("Output exceeded 2000 characters. Sending as a file.", { files: [{ attachment: Buffer.from(clean), name: "output.txt" }] });
      }
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
}