//________________________________________clear___________________________________________\\
if (cmd == "!clear") {
    if (
      message.member.roles.find(role => role.id === staffID) ||
      message.member.roles.find(role => role.id === HighStaffID)
    ) {
      const deleteCount = parseInt(args[1], 10);

      if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("אנא בחר מספר בין 2 ל- 100 כדי למחוק את ההודעות ");

      //הכליר עובד?
      const fetched = await message.channel.fetchMessages({
        limit: deleteCount
      });
      message.channel
        .bulkDelete(fetched)
        .catch(error =>
          message.reply(
            "לא יכולתי למחוק את ההודעות כי הם מעל 14 ימים בצאט  :x:"
          )
        );
      message.reply(`מחקתי בהצלחה ${args[1]} הודעות ✅`).then(msg => {
        msg.delete(3000);
      });
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
//_______________________________________________help me___________________________________________________\\
if (cmd == "!הלפמי" || cmd == "!h") {
    if (message.member.voiceChannel != null) {
      channel = "`" + message.member.voiceChannel.name + "`";
    } else {
      channel = "`📛 המשתמש לא בשום חדר 📛`";
    }

    var reason = "";
    for (var i = 1; i < args.length; i++) {
      reason += " " + args[i];
    }
    if (reason == "") {
      reason = "אין סיבה";
    }

    const h_embed = new discord.RichEmbed()
      .addField("__User:__", message.author + "** | זקוק לעזרתכם **") //סבבה
      .addField("__סיבה__", reason)
      .addField("__חדר__", channel)
      .addField("__Staff__", `<@&${staffID}>`)
      .addField("__ID__", message.author.id)
      //  `<@723876743756251178>, ${message.author} זקוק לעזרתכם! \n חדר: ${channel} \n סיבה: ${reason}`
      // )
      .setFooter("Created by Eliran", client.user.avatarURL)
      .setThumbnail(message.member.user.avatarURL)
      .setTimestamp()
      .setColor("BLUE");

    let delay = await db.fetch(`delay_${message.author.id}`);
    if (delay !== null && 60000 - (Date.now() - delay) > 0) {
      const h_err = new discord.RichEmbed()
        .setDescription("אתה צריך לחכות 60 שניות בשביל להשתמש בפקודה זו שוב!")
        .setColor("RED");
      message.channel.send(h_err).then(msg => {
        msg.delete(8000);
      });
    } else {
      message.channel.send(h_embed);
      message.channel.send("<@&" + staffID + ">");
      await db.set(`delay_${message.author.id}`, Date.now());
    }

//___________________________________________________Auto Responce____________________________________________________________\\
  
   if(message.content ==  "צהריים טובים"){
    const good_m2 = new discord.RichEmbed()
        .setTitle("__Eliran Bot__")
.setFooter("Eliran bot", client.user.avatarURL)
     
      .setTimestamp()
    .setDescription(`${message.author} , צהריים טובים`)
        .setColor("BLUE")
    message.channel.send(good_m2)
  }
//____________________________________________Watching____________________________________\\
  
  setInterval(function() {
    var status = `${client.users.size} מבברים !help`;

    // db.set("status", `${status}`)
    client.user //join again
      .setActivity(status, {
        type: "WATCHING"
      });
  }, 1800);
});
//___________________________________________Say________________________________________________\\
  if (cmd == "!say") { 
    message.delete();
    if (
      message.member.roles.find(udsd => udsd.id === HighStaffID) ||
      message.member.roles.find(udsds => udsds.id === staffID)
    ) {
      message.channel.send(message.content.slice(5));
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
  
  
  if (cmd == "!embed") { 
    message.delete();
    if (
      message.member.roles.find(udsd => udsd.id === HighStaffID) ||
      message.member.roles.find(udsds => udsds.id === staffID)
    ) {
      const say_e = new discord.RichEmbed()
      .setDescription(message.content.slice(8))
      .setColor("BLUE")
      message.channel.send(say_e);
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("אין לך גישות בשביל להשתמש בפקודה זו!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
//________________________________________________________Disable DM___________________\\
  if (message.channel.type === "dm") return;
//____________________________________________Welcome Bye sya ___________________________________________________________\\
client.on("guildMemberRemove", async member => {
  member.guild.channels
    .find(channel => channel.id === memberCountChannel)
    .edit({ name: `Member Count: ${member.guild.memberCount}` });

  member.send("הפסדת הרבה דברים בכך שיצאת מהשרת, כגון: הגרלות, משחקים שווים ועוד")
  
  const joinedserver =
    "**" +
    member.joinedAt.getDate() +
    "/" +
    (member.joinedAt.getMonth() + 1) +
    "/" +
    member.joinedAt.getFullYear() +
    " | " +
    (member.joinedAt.getHours() + 3) +
    ":" +
    member.joinedAt.getMinutes() +
    ":" +
    member.joinedAt.getSeconds() +
    "**";

  const h_embed = new discord.RichEmbed();

  var welcome = client.channels.get(byeChannelID);

  const welcome2 = new discord.RichEmbed()
    .setTitle("ביי ביי")
    .setDescription(
      `${member} ביי ביי ! \n עכשיו יש בשרת${member.guild.memberCount} אנשים! \n יצא ב: ${joinedserver}`
    )
    .setColor("GREEN")
    .setThumbnail(member.user.displayAvatarURL);

  welcome.send(welcome2);
});

client.on("guildMemberAdd", async member => {
  member.guild.channels
    .find(channel => channel.id === memberCountChannel)
    .edit({ name: `Member Count: ${member.guild.memberCount}` });

  var welcome = client.channels.get(welcomeChannelID);

  const ctx2 = canvas2.getContext("2d");

  loadImage(member.user.displayAvatarURL).then(imageback2343 => {
    ctx2.drawImage(imageback2343, 55, 102, 360, 345);

    const joinedserver =
      "**" +
      member.joinedAt.getDate() +
      "/" +
      (member.joinedAt.getMonth() + 1) +
      "/" +
      member.joinedAt.getFullYear() +
      " | " +
      (member.joinedAt.getHours() + 3) +
      ":" +
      member.joinedAt.getMinutes() +
      ":" +
      member.joinedAt.getSeconds() +
      "**";

    loadImage(
      "https://media.discordapp.net/attachments/716195229849354260/730018079320571964/file_1.png"
    ).then(imageback32 => {
      const h_embed = new discord.RichEmbed()
        .setFooter("Created by Eliran", client.user.avatarURL)

        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
        .setColor("BLUE");
      ctx2.drawImage(imageback32, 0, 0, 1600, 570); // Derpy, do u know what this error means? : unable to open database file, look at the console
      const attachment2 = new discord.Attachment(canvas2.toBuffer());
      const welcome2 = new discord.RichEmbed()
        .setTitle("ברוך הבא")
        .setDescription(
          `${member} ברוך הבא לשרת! \n אתה השחקן ה${member.guild.memberCount} בשרת \n <#722910233902710799> נא לקרוא את החוקים! \n נכנס ב: ${joinedserver}`
        )
        .setColor("GREEN")
        .setThumbnail(member.user.displayAvatarURL);

      welcome.send(welcome2);
      welcome.send(attachment2);
    });
  });
});