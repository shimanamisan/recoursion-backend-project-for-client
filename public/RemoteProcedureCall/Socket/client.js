import net from 'net';
import readline from 'readline';

export default class Client {

    #socket;

    #rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    #port = 8000;

    #server_address = '192.168.1.3'

    constructor(){
        this.#socket = new net.Socket();
        this.setSendMessageEvent();
        this.setSocketCloseEvent();
        this.setErrorHandler();
    }

    recieveUserInput(){

        this.#rl.question('サーバから呼び出す処理の番号を選択して下さい:\n' +
                          '1. floor(double x):\n' +
                          '2. nroot(int n, int x)\n' +
                          '3. reverse(string s):\n' +
                          '4. validAnagram(string str1, string str2):\n' +
                          '5. sort(string[] strArr):\n', (input) => {
            // // ソケットにデータを送信する
            // this.#socket.write(input, (err) => {

            // if(err){
            //     console.error('サーバにメッセージを送信できませんでした:', err);
            // } else {
            //     console.log('メッセージの送信に成功しました');
            // }
            // });
        });
    }

    serverConnect() {

        this.#socket.connect(this.#port, this.#server_address, () => {
            console.log('Connected to the server.');
        });

    }

    setSendMessageEvent() {
        // データを受信したときに発火するイベント
        this.#socket.on('data', (data) => {
            console.log('Received:', data.toString());
            // 通信を閉じる
            this.#socket.destroy();
        });
    }

    setSocketCloseEvent(){
        // ソケットが完全に閉じたときに発火するイベント
        this.#socket.on('close', () => {
            console.log('Connection closed.');
            this.#rl.close();
        });
    }

    setErrorHandler(){
        // エラーが発生した際に発火するイベント
        this.#socket.on('error', (err) => {
            console.error('エラーイベントが発生しました:' , err.message);
            console.error('詳細なエラー内容:' , err);
        });
    }

}