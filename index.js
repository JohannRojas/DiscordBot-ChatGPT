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


// const create = async() => {
  
//   const response = await openai.createImage({
//     prompt: 'monkey flipping off a camera',
//     n: 1,
//     // max_tokens: 100,
//     size: "256x256"
//   })
//   console.log("🚀 ~ file: index.js:47 ~ client.on ~ response:", response.data.data[0].url)
// }

// create()

client.on('messageCreate', async function(message) {

  try {
    if (message.author.bot) return
    if (message.channel.id !== channelIDCP) return
      // const response = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: `Hey Give me a response to this : ${message.content}`,
      //   temperature: 0.5,
      //   max_tokens: 300,
      //   top_p: 1.0,
      //   frequency_penalty: 0.5,
      //   presence_penalty: 0.0,
      // });
      const response = await openai.createImage({
        prompt: `${message.content}`,
        n: 1,
        size: "1024x1024"
      })

      message.reply(response.data.data[0].url)


  } catch (error) {
    console.log(error)
  }

})

client.login(process.env.DISCORD_KEY)