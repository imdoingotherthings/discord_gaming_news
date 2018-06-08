const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("../config.json");
const NewsAPI = require('newsapi');
const embed = new Discord.RichEmbed();
const url = `https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${config.API_KEY}`;
const fetch = require('node-fetch');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
    let arr = [];
    if(message.author.bot) return;
    if(message.content === `${config.prefix}news`) {
        fetch(url).then(function (res) {
            return res.json();
        }).then(function (res) {
            let art = res.articles;
            for (let i in art) {
                let p = art[i];
                arr.push(p);
            }
        }).then(function (res) {
            message.reply(`Here's the latest news!`);
            let first = arr[0];
            if (first.author !== null) {
                embed.setAuthor(first.author);
            } 
            embed.setColor('#2c3e50');
            embed.setTitle(first.title);
            embed.addField('Source:', first.source.name, true);
            embed.setURL(first.url);
            embed.setThumbnail(first.urlToImage);
            embed.setDescription(first.description);
            embed.setTimestamp(first.publishedAt);
            embed.setFooter('Bot by Arade || .Andrade EST. 2016');
            message.channel.send({embed});
        });
    };
});

client.login(config.token);

