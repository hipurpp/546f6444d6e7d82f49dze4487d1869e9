const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  
  console.log(`Connecté avec succès.`); 
  client.user.setActivity(`RADIO 24/7 @Madd`);
});


client.on("message", async message => {

  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "arreter") 
  {
    if(message.author.id == config.ownerID)
    {
      if(client.voiceChannel) return message.channel.send("Je ne suis pas dans un channel vocal.").then(message => message.delete(5000));
      message.member.voiceChannel.leave();
      message.channel.send(`Le propriétaire du serveur a arrêté la radio.`).then(message => message.delete(5000));
    }
    else
    {
      message.channel.send(`Seul le propriétaire du serveur peut utiliser cette commande.`).then(message => message.delete(5000));
    }
    
  }

  if(command === "lancer") 
  { 
    if(message.author.id == config.ownerID)
    {
      if (!message.member.voiceChannel) return message.channel.send(`Vous n'êtes pas dans un salon vocal.`).then(message => message.delete(5000));
		  if (!message.member.voiceChannel.joinable) return message.channel.send("Impossible d'accéder au salon vocal.").then(message => message.delete(5000));

      if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playStream('http://209.95.50.189:8124/;stream/1');
          message.channel.send(`La radio a été lancée par le propriétaire du serveur.`).then(message => message.delete(5000));
        })
        .catch(console.log);  
    } 
      else 
      {
        message.channel.send(`Erreur critique.`);
      }
    }
    else
    {
      message.channel.send(`Seul le propriétaire du serveur peut utiliser cette commande.`).then(message => message.delete(5000));
      
    }

  }

});

client.login(config.token);