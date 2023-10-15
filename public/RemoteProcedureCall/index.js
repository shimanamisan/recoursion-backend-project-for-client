import Client from './Socket/client.js';
import Prompt from './Prompt/prompt.js';

const client = new Client();
const prompt = new Prompt();

await prompt.runPromptSelectMethod();
await prompt.runPromptSelectArgument();

const message = prompt.sendServerJsonMessage();

client.serverConnect();
client.sendMessage(message);