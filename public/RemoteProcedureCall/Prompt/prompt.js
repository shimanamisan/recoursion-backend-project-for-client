import enquirer from 'enquirer';
const { Select, Input, Form } = enquirer;

export default class Prompt {
    
    #resultObj = {};

    constructor(){ }

    async runPromptSelectMethod(){

        const config = {
            type: 'select',
            options: {
                name: 'method',
                message: 'サーバから呼び出すメソッドを選択して下さい',
                choices: [
                    { name: 'floor(double x)', value: '1' },
                    { name: 'nroot(int n, int x)', value: '2' },
                    { name: 'reverse(string s)', value: '3' },
                    { name: 'validAnagram(string str1, string str2)', value: '4' },
                    { name: 'sort(string[] strArr)', value: '5' },
                ]
            }
        };

        this.#resultObj.method = await this.runPrompt(config);

        // メソッド名からサーバに送信するメソッドidを検索する
        this.#resultObj.id = parseInt(config.options.choices.find(choice => choice.name === this.#resultObj.method).value);
    }

    async runPromptSelectArgument(){
        const config = this.getArgumentPromptConfig();
        this.#resultObj.param = await this.runPrompt(config);
    }

    async runPrompt(config) {

        try {
            const prompt = this.createPrompt(config);
            const answer = await prompt.run();
            
            return answer;
            
        } catch (err) {
            console.error('エラーが発生しました:', err.message);
            console.error('詳細なエラー内容:',  err);
        }
    }

    sendServerJsonMessage () {
        return JSON.stringify(this.#resultObj);
    }

    getArgumentPromptConfig() {
          
        switch (this.#resultObj.id) {
            case 2:
                return {
                    type: 'form',
                    options: {
                        message: `${this.#resultObj.method} メソッドに引数を渡す値を入力して下さい`,
                        choices: [
                            { name: 'argument1', message: 'int n' },
                            { name: 'argument2', message: 'int x' },
                        ],
                        validate: (selectedItems) => {
                        
                            // 入力値はオブジェクトとして渡ってくる
                            // 例:  argument1: '11', argument2: '111' }
                            // console.log(selectedItems);

                            for(let key in selectedItems){

                                if(isNaN(parseInt(selectedItems[key]))) {
                                    return `${key} は数字を指定して下さい`;
                                }

                            }

                             // すべてのバリデーションが通ればtrueを返す
                            return true;
                        },
                    }
                };
    
            case 4:
                return {
                    type: 'form',
                    options: {
                        message: `${this.#resultObj.method} メソッドに引数を渡す値を入力して下さい`,
                        choices: [
                            { name: 'argument1', message: 'string str1' },
                            { name: 'argument2', message: 'string str2' },
                        ],
                        validate: (selectedItems) => {

                            for(let key in selectedItems){
                                if(!selectedItems[key]) {
                                    return `${key} に値を入力して下さい`;
                                }
                            }

                            // すべてのバリデーションが通ればtrueを返す
                            return true;
                        },
                    }
                };
    
            default:
                return {
                    type: 'input',
                    options: {
                        message: `${this.#resultObj.method} メソッドに引数を渡す値を入力して下さい`,
                        validate: (selectedItems) => {
        
                            if(!isNaN(parseInt(selectedItems))){
                              // trueを返すと入力が正常だった意味になる
                              return true;
                            }
                            // 不正な値だった場合の文字列を返し再度入力を求める
                            return '数字を入力して下さい';
                          },
                    }
                };
        }
    }

    createPrompt(config){

        if (config.type === 'select') {
            return new Select(config.options);

        } else if (config.type === 'input') {
            return new Input(config.options)
        
        } else if (config.type === 'form') {
            return new Form(config.options)
        }

        throw new Error('不正なプロンプトタイプが選択されています');
    }

}