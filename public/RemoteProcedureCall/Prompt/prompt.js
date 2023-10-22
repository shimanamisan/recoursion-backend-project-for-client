import enquirer from 'enquirer';
const { Select, Input, Form } = enquirer;

export default class Prompt {
    
    #resultObj = {"jsonrpc":"2.0"};

    constructor(){ }

    async runPromptSelectMethod(){

        const config = {
            type: 'select',
            options: {
                message: 'サーバから呼び出すメソッドを選択して下さい',
                choices: [
                    { name: 'floor(double x)', method: "floor", value: '1' },
                    { name: 'nroot(int n, int x)', method: "nroot", value: '2' },
                    { name: 'reverse(string s)', method: "reverse", value: '3' },
                    { name: 'validAnagram(string str1, string str2)', method: "validAnagram", value: '4' },
                    { name: 'sort(string[] strArr)', method: "sort", value: '5' },
                ]
            }
        };

        // メソッドを選択するプロンプトを作成して、ユーザーの入力を受け取る
        const selectName = await this.runPromptMethod(config);
        // プロンプトで選択されてたメソッド名で検索する
        const selectedChoice = config.options.choices.find(choice => choice.name === selectName);
        if (selectedChoice) {
            
            this.#resultObj.id = parseInt(selectedChoice.value);
            this.#resultObj.method = selectedChoice.method;

            return
        }

        throw new Error('値が見つかりません');
    }

    async runPromptSelectArgument(){
        const config = this.getArgumentPromptConfig();
        // 引数を選択するプロンプトを作成して、ユーザーの入力を受け取る
        this.#resultObj.param = await this.runPromptArgument(config);
    }

    async runPromptMethod(config) {

        try {
            const prompt = this.createPrompt(config);
            const answer = await prompt.run();

            return answer;
            
        } catch (err) {
            console.error('エラーが発生しました:', err.message);
        }
    }

    async runPromptArgument(config) {

        try {
            const prompt = this.createPrompt(config);
            const answer = await prompt.run();

            // param がオブジェクト形式だったら param を配列に変換する
            if(typeof answer === 'object' && answer !== null){
                console.log(answer)
                const argument = answer
                return Object.values(argument).map(value => {
                    // 数値に変換する。数値に変換できない場合は、元の値をそのまま返す。
                    return isNaN(Number(value)) ? value : Number(value);
                });
                
            }

            // 'sort(string[] strArr)' が選択されていた場合
            if(this.#resultObj.id === 5) {
                return [...answer];
            }

            // オブジェクト形式でなければ数値に変換できるか判定する
            return isNaN(Number(answer)) ? answer : Number(answer);;
            
        } catch (err) {
            console.error('エラーが発生しました:', err.message);
            console.error('詳細なエラー内容:',  err);
        }
    }

    checkArgumentType(value) {

        if(typeof value === 'string') {
            return 'string';

        }else if (typeof value === 'number') {
            // 純粋な整数でない（小数点を含む）場合は double を返す
            return Number.isInteger(value) ? 'int' : 'double';

        }else if (Array.isArray(value)) {
            return 'array';

        }

        // 上記以外の型だった場合
        return 'unknown';
    }

    sendServerJsonMessage () {

        // パラメータが配列か判定する
        if (Array.isArray(this.#resultObj.param)) {
            // param が配列の場合、各要素の型をチェックする
            this.#resultObj.param_types = this.#resultObj.param.map(param => {
                return this.checkArgumentType(param); // 各要素の型を文字列で返す
            });

        } else {
            // param が配列でない場合、単一の型を設定する
            this.#resultObj.param_types = this.checkArgumentType(this.#resultObj.param);
        }
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
            
            case 3 :
                return {
                    type: 'input',
                    options: {
                        message: `${this.#resultObj.method} メソッドに引数を渡す値を入力して下さい`,
                        validate: (selectedItems) => {
        
                            if(!isNaN(parseInt(selectedItems))){
                                return '文字列を指定して下さい';
                            }
                            return true;
                        },
                    }
                }
    
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
                                if(!isNaN(parseInt(selectedItems[key]))) {
                                    return `${key} は数字ではなく文字列を指定して下さい`;
                                }
                            }

                            // すべてのバリデーションが通ればtrueを返す
                            return true;
                        },
                    }
                };
    
            case 5:
                return {
                    type: 'input',
                    options: {
                        message: `${this.#resultObj.method} メソッドに引数を渡す値を入力して下さい`,
                        validate: (selectedItems) => {
        
                            if(!isNaN(parseInt(selectedItems))){
                                return '文字列を指定して下さい';
                            }
                            // 不正な値だった場合の文字列を返し再度入力を求める
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
            return new Input(config.options);
        
        } else if (config.type === 'form') {
            return new Form(config.options);
        }

        throw new Error('不正なプロンプトタイプが選択されています');
    }

}