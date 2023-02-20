import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";
dotenv.config()



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

//setting openai
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration)

const channelIDCP = '1076368177270894694'
// const guilIDCP = '821569263197487125'

client.on('messageCreate', async function(message) {

  try {
    if (message.author.bot) return
    if (message.channel.id !== channelIDCP) return
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Hey Give me a response to this : ${message.content}`,
        temperature: 0.5,
        max_tokens: 300,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });
  
      message.reply(response.data.choices[0].text)


  } catch (error) {
    console.log(error)
  }

})

client.login(process.env.DISCORD_KEY)