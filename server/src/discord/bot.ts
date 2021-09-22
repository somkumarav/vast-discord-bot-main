import dotEnv from 'dotenv';
import { Client, Intents } from 'discord.js';
dotEnv.config();

const botToken = process.env.BOT_TOKEN;
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

bot.on('ready', () => {
  console.log(`${bot.user?.username} has logged in`);
  bot.user?.setActivity('everyone', { type: 'WATCHING' });
});

bot.on('guildMemberAdd', (member) => {
  const id = member.id;
  const url = 'http://localhost:3000/fka'; //
  member.send(`Welcom to vast server if You are a student fill form ${url}`);
});

bot.login(botToken);
export default bot;
