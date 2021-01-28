const Discord = require('discord.js')
const bot = new Discord.Client()
var prefix = ';'

var Usersapplying = [{id:Number, timestamp:Number}]
var ApplyChannel = null
var CommandsChannel = null

bot.once('ready', () => {

    bot.user.setActivity(prefix + 'help is bad', {type: 'PLAYING'})

})

bot.on('message', message => {

    if (message.content == prefix + "help"){
        embedGeneral = new Discord.MessageEmbed()
        .setColor('#535C69')
        .addFields(
            {name:'help', value:'this command.'},
            {name:'info', value:'show info about this bot.'},
            {name:'apply', value:'apply to be a team member.'}
        )
        .setTitle("General")
        embedModeration = new Discord.MessageEmbed()
        .addFields(
            {name:'AC', value:'set the channel to send applications.'}
        )
        .setColor('#535C69')
        .setFooter("Made by Costin88boss")
        .setTitle("Moderation")

        message.channel.send(embedGeneral)
        message.channel.send(embedModeration)

        };
    if(message.content == prefix + "info"){
        return message.channel.send(new Discord.MessageEmbed()
        .setTitle('Info')
        .addField('Creator', 'costin88boss/The forgotten one'))
    }
    if(message.content == prefix + "apply"){
        if (ApplyChannel != null){
        if (Usersapplying.some(e => e.id == message.author.id)){
            Timestamp = Usersapplying.some(e => e.id == message.author.id).timestamp
            date = new Date(Timestamp * 1000);
            var months = date.getMonth()
            if(months >= 1){
            bruh = Usersapplying.indexOf(message.author.id)
            Usersapplying.splice(bruh, 1);
            }
            else{
                return message.author.send("Did you read this line?\n> If you are not contacted about your application within a maximum of 3 days, It has likely been denied and you will need to wait another month before applying again.")
            }

            console.log("done")
        }
        else

        message.author.send("Welcome!");
        message.author.send("So you would like to apply? There are a couple questions we must ask you first.")
        message.author.send("**1)** Why do you want to join us? ")

        Usersapplying.push({id:message.author.id, timestamp:Date.now()})

        const filter = m => m.author == message.author
        var answers = [Discord.Message]
        message.content.starts
        
        message.author.createDM().then((channel) => 
        {channel.awaitMessages(filter, { max: 1}).then
                (collected => {
                    answers.push(collected.first())
                message.author.send("**2)** Are you a member of any allied groups already?");
                message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                    (collected => {
                        answers.push(collected.first())
                        message.author.send("**3)** Do you wish to become a Builder/Explorer/Soldier");
                        message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                        (collected => {
                            answers.push(collected.first())
                            message.author.send("**4)** How long have you been playing on 5b5t? (we will check this)");
                            message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                            (collected => {
                                answers.push(collected.first())
                                message.author.send("**5)** Whats your ign?");
                                message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                (collected => {
                                    answers.push(collected.first())
                                    message.author.send("**6)** If you are applying for Builder, rate you building skills from 1-10 and tell us what client you use.");
                                    message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                    (collected => {
                                        answers.push(collected.first())
                                        message.author.send("6.1) If you are applying for Soldier, Rate your PVPskills from 1-10 and tell us what client you use.");
                                        message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                        (collected => {
                                            answers.push(collected.first())
                                            message.author.send("**6.2)** If you are applying for Explorer, Rate you eltraflight from 1-10 and tell us what client you use.");
                                            message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                            (collected => {
                                                answers.push(collected.first())
                                                message.author.send("**7)** If you are not contacted about your application within a maximum of 3 days, It has likely been denied and you will need to wait another month before applying again.");
                                                message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                                (collected => {
                                                    answers.push(collected.first())
                                                    message.author.send("Done! your application has been sent.")
                                                    SendToChannel(answers, message.author);
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
    }}
    if (message.content.startsWith(prefix + "AC")){
        ApplyChannel = message.mentions.channels.first();
    }

})

function SendToChannel(Answers, User) {
    ApplyChannel.send(new Discord.MessageEmbed()
    .setTitle("Application by " + User.username)
    .addFields(
        {name:"**1)** Why do you want to join us?", value:Answers[1].content},
        {name:"**2)** Are you a member of any allied groups already?", value:Answers[2].content},
        {name:"**3)** Do you wish to become a Builder/Explorer/Soldier", value:Answers[3].content},
        {name:"**4)** How long have you been playing on 5b5t? (we will check this)", value:Answers[4].content},
        {name:"**5)** Whats your ign?", value:Answers[5].content},
        {name:"**6)** If you are applying for Builder, rate you building skills from 1-10 and tell us what client you use.", value:Answers[6].content},
        {name:"6.1) If you are applying for Soldier, Rate your PVPskills from 1-10 and tell us what client you use.", value:Answers[7].content},
        {name:"**6.2)** If you are applying for Explorer, Rate you eltraflight from 1-10 and tell us what client you use.", value:Answers[8].content},
        {name:"**7)**If you are not contacted about your application within a maximum of 3 days, It has likely been denied and you will need to wait another month before applying again.", value:Answers[9].content},
        ).setFooter("bot is in beta, so please manage yourself the user."))
}

bot.login(process.env.BOT_TOKEN)
