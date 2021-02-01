const Discord = require('discord.js')
const bot = new Discord.Client()
var prefix = ';'

var Usersapplying = [{id:Number, timestamp:Number}]
var Usersapplyingchangeable = []
var ApplyChannel = null
var CommandsChannel = null
var ApplyRole = null
var Builder, Adventurer, Pvper;

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
            {name:'applyroles', value:'set the channel to send applications.'},
            {name:'applyneededrole', value:"set the needed role to access moderation commands. THIS COMMAND IS ONLY ACCESSIBLE BY COSTIN"},
            {name:'applychannel', value:'set the channel to log applications.'},
            {name:'accept [USER] [IsPvp][IsBuild][IsExplorer]', value:'accept the user. replace the [Is...] with 0 or 1 if they will get those roles.'}
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
        Usersapplyingchangeable.push(message.author.id)

        const filter = m => m.author == message.author
        var answers = [Discord.Message]
        
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
                                    message.author.send("**6)** If you are applying for Builder, rate you building skills from 1-10 and tell us what client you use, else say no.");
                                    message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                    (collected => {
                                        answers.push(collected.first())
                                        message.author.send("**6.1)** If you are applying for Soldier, Rate your PVP skills from 1-10 and tell us what client you use, else say no.");
                                        message.author.dmChannel.awaitMessages(filter, { max: 1}).then
                                        (collected => {
                                            answers.push(collected.first())
                                            message.author.send("**6.2)** If you are applying for Explorer, Rate you elytraflight from 1-10 and tell us what client you use, else say no.");
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
    } else message.reply("An error has occured, the apply channel has not been setup!") }
    if (message.content.toLowerCase().startsWith(prefix + "applychannel")){
        if (message.author.id == "471746995737067554"){
        ApplyChannel = message.mentions.channels.first();
        message.channel.send("done");}
        else message.channel.send("You are not costin. failure.");
    }
    if (message.content.toLowerCase().startsWith(prefix + "applyneededrole")){
        if (message.author.id == "471746995737067554")
        if (message.mentions.roles.size == 1){
        ApplyRole = message.mentions.roles.first();
        message.channel.send("done");
    }
        else message.channel.send("There is no role!");
    }
    if (message.content.toLowerCase().startsWith(prefix + "applyroles")){
        if (ApplyRole != null){
        if (message.member.roles.cache.has(ApplyRole) || message.author.id == "471746995737067554")
        if (message.mentions.roles.size == 0){
            message.channel.send("There must be 3 roles!");
            message.channel.send("also, the order is this: Pvper, Builder, Explorer")
        }
        else if (message.mentions.roles.size == 3){
            let Args = message.content.split(' ');
            Pvper = getRoleFromMention(Args[1], message)
            Builder = getRoleFromMention(Args[2], message)
            Explorer = getRoleFromMention(Args[3], message)
            message.channel.send("done");
        }
        else if (message.mentions.roles.size >= 4){
            message.channel.send("Why are you setupping more than 3 roles? don't you need only pvper, builder, and explorer?");
        }}
    
    else message.channel.send("Costin is an idiot for not setupping the perm role.");
    }
    if(message.content.toLowerCase().startsWith(prefix + "accept"))
    {
        if (message.member.roles.cache.has(ApplyRole) || message.author.id == "471746995737067554"){
        let Args = message.content.split(' ');
        if (Args[1] != null){
        if (Args[1].match(Discord.MessageMentions.USERS_PATTERN) != null){
            let User = Args[1];
            User = User.replace(/(<@!)/, '');
            User = User.replace(/(>)/, '');
            if (Usersapplying.filter(e => e.id == User).length >= 1){
            if (Args[2] == 0 || Args[2] == 1){
                if(Args[3] == 0 || Args[3] == 1){
                    if (Args[4] == 0 || Args[4] == 1){
                        let Member = message.guild.members.cache.find(e => e.id == User);
                        if (Usersapplyingchangeable.includes(Member.id)){
                            let pvper
                            let builder
                            let explorer
                            let GotRoles
                            GotRoles = " ";
                            if (Args[2] == 1){
                                pvper = true
                                GotRoles += "Pvper "
                            }
                            if (Args[3] == 1){
                                builder = true;
                                GotRoles += "Builder "
                                }
                            if (Args[4] == 1){
                                explorer = true;
                                GotRoles += "Explorer"
                            }
                            if (GotRoles != " "){
                            message.channel.send("User is now a member.")
                            message.channel.send("His/Her/Their roles:" + GotRoles)
                            bot.users.cache.find(e => e.id == User).send("Your application has been accepted! roles given by the bot:" + GotRoles + ".")
                            }
                            else{
                                message.channel.send("User has been denied!")
                                bot.users.cache.find(e => e.id == User).send("Your application has been denied!")
                            }
                            if (pvper)
                            Member.roles.add(Pvper).catch(() => {});
                            if (builder)
                            Member.roles.add(Builder).catch(() => {});
                            if (explorer)
                            Member.roles.add(Explorer).catch(() => {message.channel.send("This bot doesn't have the permission!!")});

                            Usersapplyingchangeable = Usersapplyingchangeable.slice(Usersapplyingchangeable.findIndex(e => e.id == Member.id), Usersapplyingchangeable.findIndex(e => e.id == Member.id))
                    } else message.channel.send("the user was accepted/denied already!")}
                    else{
                        message.channel.send("the second argument should be 0 or 1 whetever the player is applied as Explorer.");
                    }
                }
                else{
                    message.channel.send("the third argument should be 0 or 1 whetever the player is applied as Builder.");
                }
            }
            else message.channel.send("the second argument should be 0 or 1 whetever the player is applied as Pvper.");} else
            message.channel.send("the user didn't applied!")
        } else message.channel.send("first argument isn't a user!")
    }else{
        message.channel.send("you must enter the arguments!");
        message.channel.send("arguments format is ;accept [Ping] [Pvper] [Builder] [Explorer] where you replace [Pvper], [Builder] and [Explorer] with 0 if not to give that corresponding role or 1 if to give the corresponding role.")
        message.channel.send("and [Ping] with the user's ping. try getting his ping by going in a non-member channel, get his ping, copy it, and paste it here.")
    }
} else message.channel.send("You do not have the required role to access this command!")}
}
)

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
        ).setFooter("Instructions: ;accept User IsPvp IsBuild IsAdvent where you replace all those is.. with 0 or 1 depending on what roles you want him to have."))
}
function getRoleFromMention(mention, message) {
    if (!mention) return;

	if (mention.startsWith('<@&') && mention.endsWith('>')) {
        mention = mention.slice(3, -1);
		return message.guild.roles.cache.get(mention);
	}
}

bot.login('ODA0MjM2NTM4OTg0NTI5OTIw.YBJZpA.ffQxr-l5T8rvPhRPbILTdOWP6rY')
