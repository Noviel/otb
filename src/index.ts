import d from 'dotenv';
import { Telegraf } from 'telegraf';

const c = d.config();

function getBotAccessToken(): string {
  const botAccessToken = process.env.BOT_TOKEN;

  if (!botAccessToken) {
    throw new Error('Unable to get Bot Access Token. Ensure that BOT_TOKEN environment variable is provided.');
  }

  return botAccessToken;
}

const bot = new Telegraf(getBotAccessToken());
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
