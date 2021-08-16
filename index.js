//////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.prefix;
const db = require("quick.db");
//////////////////////////////////////


/////////////////Event Ready/////////////////////
client.on("ready", () => {
  console.log(`[ - Bot is Online - ]`);
  console.log(`Name Bot : ${client.user.username}`);
  console.log(`Guilds : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}help | ( ZombieX Sug V2 )`, {
    type: "PLAYING"
  });
});
//////////////////////////////////////

/*

- [ All rights reserved ZombieX in YT ] -

*/


client.on("message", async message => {
  if(message.content.startsWith(prefix + "set-sug")){
(!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send(`**لا تمتلك صلاحيات كافيه**`);
   let channelmention = message.mentions.channels.first();
    if (!channelmention) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Error ❌")
          .setColor("RED")
          .setDescription(`**Ex : ${prefix}set-sug __#channel__**`)
      )
    }
    await db.set(`channel`, channelmention.id)
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Done ✅")
        .setColor("GREEN")
      ) 
        
  }

  if(message.content.startsWith(prefix + "sug")){
   let arg = message.content.split(" ").slice(1).join(" ");
   
   let channeel = client.channels.cache.get(await db.get(`channel`))
   if(!arg) return message.channel.send(
     new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("❌Error")
    .setDescription(`**${prefix}sug __Your Suggestion__**`)
     
     )
      const embed = new Discord.MessageEmbed()
       .setColor("BLUE")
       .setThumbnail(message.author.avatarURL())
       .setTitle("**`New Suggestion`**")
      .setDescription(`
     ** Suggestion :**
       \`\`\`${arg}\`\`\` `)
      .setTimestamp()
      .addField('Username', `${message.author.username}`, true)
      .addField('ID', `${message.author.id}`, true)
      channeel.send(embed)

            
  
      const done = new Discord.MessageEmbed()
      .setColor("#44ff00")
      .setTitle("**تـم أرسال أقتـراحك ✅**")
      message.channel.send(done)    


  }
  if(message.content == prefix + "help"){
    const embed = new Discord.MessageEmbed()
          .setThumbnail(client.user.avatarURL())
          .setColor("BLUE")
         .addField (`${prefix}sug`,"لأرسال أقتراح", true)
        .addField(`${prefix}set-sug`, "لتحديد روم الاقتراحات", true)
       .setFooter("Developer :!ZombieX#0001")
          message.channel.send(embed)
  }
  
});
//////////////////////////////
require('./server')();
client.login(process.env.token)
//////////////////////////////
