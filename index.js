const { Client } = require("discord.js-selfbot-v13");
const config = require("./config");
const client = new Client({
    checkUpdate: false,
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.author.id !== client.user.id) return;

    if (message.content.startsWith('c<clear')) {
        const args = message.content.split(' ');
        const count = parseInt(args[1]);

        if (isNaN(count)) {
            console.log('m9(^Д^)数字も分からないの？w');
            return;
        }

        if (count > 0) {
            try {
                const fetchedMessages = await message.channel.messages.fetch({ limit: count + 1 });
                const filteredMessages = fetchedMessages.filter(msg => msg.author.id === client.user.id);

                for (const msg of filteredMessages.values()) {
                    await msg.delete();
                }

            } catch (error) {
                console.error('メッセージの削除中にエラーが発生しました:', error);
            }
        } else {
            console.log('削除するメッセージの数は１以上にしてください。');
        }
    }
});

client.login(config.token);