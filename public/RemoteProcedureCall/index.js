import Client from './Socket/client.js';
import Prompt from './Prompt/prompt.js';

const client = new Client();
const prompt = new Prompt();

await prompt.runPromptSelectMethod();
await prompt.runPromptSelectArgument();





// client.serverConnect();



// // INFO: https://nodejs.org/api/net.html#new-netsocketoptions
// const client = new net.Socket();

// // ユーザーからの入力を待つ
// // 受け取った入力をjson文字列にしてソケットを通じてサーバ側に送信する
// // 返ってきたメッセージを受け取ってJSON形式で表示する

// let n = 0;
// let x = 0;

// const param = {
//     "method": "nroot", 
//     "params": [n, x], 
//     "param_types": ["int", "int"],
//     "id": 1
//  }

// client.connect(8000, '192.168.1.3', () => {  // PHPサーバのIPアドレスとポート
//     console.log('Connected to the server.');

//     rl.question('Enter a message to send: ', (message) => {
//         client.write(message);
//     });
// });

// client.on('data', (data) => {
//     console.log('Received:', data.toString());
//     client.destroy();  // サーバからの応答を受け取った後、接続を閉じます
// });

// client.on('close', () => {
//     console.log('Connection closed.');
//     rl.close();
// });
