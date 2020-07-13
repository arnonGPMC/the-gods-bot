var welcomeChannelID = "697005813193244721";
var staffID = "705082092584829040";
var HighStaffID = "705082092584829040";
var serverID = "697005812626751499";
var memberCountChannel = "731462198731210803";
var bumbChannel = "720231659483431012";
var bumpID = "724976368349216771";
var testRoleID = "723794807260184646";
var boyRoleID = "716695646677237830";
var girlRoleID = "716682612474904656";
var muteRole = "716349942091743283";
var PunishmentsChannelID = "724315458282586144";
var commandChannel = "716207742561550337";
var byeChannelID = "697005813193244721";
var vmuteRole = "726480199209844806"

const discord = require("discord.js");
const client = new discord.Client();
const ms = require("ms");
var levels = [];

for (var i = 1; i < 50; i++) {
  levels.push(i * 50);
}

const canvas = require("canvas");
var db = require("quick.db");
const tits = require("pornsearch").search("tits");
const DabiImages = require("dabi-images");
const DabiClient = new DabiImages.Client();
client.login(process.env.TOKEN);

const { createCanvas, loadImage } = require("canvas");
const canvas2 = createCanvas(1600, 570);

client.on("ready", () => {
  console.log(levels);

  console.log("This Bot IsOnline");

  setInterval(function() {
    var status = `${client.users.size} Members Do !h If You Need Help`;

    // db.set("status", `${status}`)
    client.user //join again
      .setActivity(status, {
        type: "WATCHING"
      });
  });
});

client.on("message", async message => {
   let args = message.content.toLocaleLowerCase().split(" ");
  
  var cmd = args[0];
  if (message.channel.type === "dm") return;
  
  if (cmd == "*clear") {
    if (
      message.member.roles.find(role => role.id === staffID) ||
      message.member.roles.find(role => role.id === HighStaffID)
    ) {
      const deleteCount = parseInt(args[1], 10);

      if (!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("Please Choose A Number Between 2 To 100");

      //הכליר עובד?
      const fetched = await message.channel.fetchMessages({
        limit: deleteCount
      });
      message.channel
        .bulkDelete(fetched)
        .catch(error =>
          message.reply(
            ":x: I could not delete the Messages because they are over 14 days in chat"
          )
        );
      message.reply(`מחקתי בהצלחה ${args[1]} הודעות ✅`).then(msg => {
        msg.delete(3000);
      });
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("You Don't Have Prems!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }  
  if (cmd == "!helpme" || cmd == "!h" || cmd == "!help") {
     var channel = message.member.voiceChannel
    if (message.member.voiceChannel != null) {
      channel = "`" + message.member.voiceChannel.name + "`";
    } else {
      channel = "`📛 The Use Is Not At A Voice 📛`";
    }

    var reason = "";
    for (var i = 1; i < args.length; i++) {
      reason += " " + args[i];
    }
    if (reason == "") {
      reason = "No Reason";
    }

    const h_embed = new discord.RichEmbed()
      .addField("__User:__", message.author + "** | Need's Your Help**")
      .addField("__Reason__", reason)
      .addField("__Channel__", channel)
      .addField("__Staff__", `<@&${staffID}>`)
      .addField("__ID__", message.author.id)
      .setFooter("Created by MegaNoamSuper", client.user.avatarURL)
      .setThumbnail(message.member.user.avatarURL)
      .setTimestamp()
      .setColor("BLUE");

    let delay = await db.fetch(`delay_${message.author.id}`);
    if (delay !== null && 60000 - (Date.now() - delay) > 0) {
      const h_err = new discord.RichEmbed()
        .setDescription("You Need To Wait 60 Sec To Use That Command Again")
        .setColor("RED");
      message.channel.send(h_err).then(msg => {
        msg.delete(8000);
      });
    } else {
      message.channel.send(h_embed);
      message.channel.send("<@&" + staffID + ">");
      await db.set(`delay_${message.author.id}`, Date.now());
    }
  }
  //____________________//
  if (cmd == "*say") { 
    message.delete();
    if (
      message.member.roles.find(udsds => udsds.id === staffID)
    ) {
      message.channel.send(message.content.slice(5));
    } else {
      const not_persms = new discord.RichEmbed()
        .setDescription("You Dont Have Prems To Use This Command!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
  
  
  if (cmd == "*embed") { 
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
        .setDescription("You Dont Have Prems You Use This Command!")
        .setColor("RED");
      message.channel.send(not_persms).then(msg => {
        msg.delete(3000);
      });
    }
  }
  //___\\
     if(message.content ==  "good Morning"){
    const good_m2 = new discord.RichEmbed()
        .setTitle("__The GODS__")
        .setFooter("The Gods", client.user.avatarURL)
     
      .setTimestamp()
    .setDescription(`${message.author} , Good Morning!`)
        .setColor("BLUE")
    message.channel.send(good_m2)
  }
});