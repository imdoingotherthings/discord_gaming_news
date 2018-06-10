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
    let arr5 = [];
    if(message.author.bot) return;
    if(message.content === `!news 5`) {
        fetch(url).then(function (res) {
            return res.json();
        }).then(function (res) {
            let art = res.articles;
            for (let i in art) {
                let p = art[i];
                arr5.push(p);
            }
        }).then(function (res) {
            message.reply(`Here's the latest news!`);
            let firstFive = arr5.slice(0,5);
            for (let j = 0; j < firstFive.length; j++) {  
                message.reply(firstFive[j].url);   
                console.log(firstFive[j].url);        
                // if (firstFive[j].author !== null) {
                //     embed.setAuthor(firstFive[j].author);
                // } 
                // embed.setColor('#2c3e50');
                // embed.setTitle(firstFive[j].title);     
                // embed.setURL(firstFive[j].url);
                // embed.setImage(firstFive[j].urlToImage);
                // embed.setDescription(firstFive[j].description);
                // embed.setTimestamp(firstFive[j].publishedAt);
                // embed.setFooter('Bot by Arade | Rovenway EST. 2016');   
                // message.channel.send({embed});
            }
        });
    };
    // let arr = [];
    // if(message.content === `!news`) {
    //     fetch(url).then(function (res) {
    //         return res.json();
    //     }).then(function (res) {
    //         let art = res.articles;
    //         for (let i in art) {
    //             let p = art[i];
    //             arr.push(p);
    //         }
    //     }).then(function (res) {
    //         message.reply(`Here's the latest news!`);
    //         let first = arr[0];
    //         if (first.author !== null) {
    //             embed.setAuthor(first.author);
    //         } 
    //         embed.setColor('#2c3e50');
    //         embed.setTitle(first.title);     
    //         embed.setURL(first.url);
    //         embed.setImage(first.urlToImage);
    //         embed.setDescription(first.description);
    //         embed.setTimestamp(first.publishedAt);
    //         embed.setFooter('Bot by Arade | Rovenway EST. 2016');
    //         message.channel.send({embed});
    //     });
    // };
});

client.login(config.token);

