import net from 'net';

export default class Client {

    #socket;
    
    #port = 8000;

    #server_address = '192.168.1.3'

    constructor(){

        // INFO: https://nodejs.org/api/net.html#new-netsocketoptions
        this.#socket = new net.Socket();
        this.setSendMessageEvent();
        this.setSocketCloseEvent();
        this.setErrorHandler();
    }

    sendMessage(message) {

        if(!message) {
            throw new Error('送信するメッセージがありません');
        }

        this.#socket.write(message);
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
        });
    }

    setErrorHandler(){
        // エラーが発生した際に発火するイベント
        this.#socket.on('error', (err) => {
            console.error('エラーイベントが発生しました:', err.message);
            console.error('詳細なエラー内容:', err);
        });
    }

}