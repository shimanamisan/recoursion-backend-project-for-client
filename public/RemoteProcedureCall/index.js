import Client from './Socket/client.js';
import Prompt from './Prompt/prompt.js';

const client = new Client();
const prompt = new Prompt();

// メソッドを選択するプロンプトを実行する
await prompt.runPromptSelectMethod();
// 引数を選択するプロンプトを実行する
await prompt.runPromptSelectArgument();

const message = prompt.sendServerJsonMessage();

client.serverConnect();
client.sendMessage(message);