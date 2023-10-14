import enquirer from 'enquirer';
const { Select, Input  } = enquirer;

export default class Prompt {
    
    // 
    #prompt;

    #selectMethodName;

    #argument;

    constructor(){

        this.#prompt = new Select({
            message: 'サーバから呼び出すメソッドを選択して下さい',
            choices: [
              { name: 'floor(double x)', value: '1' },
              { name: 'nroot(int n, int x)', value: '2' },
              { name: 'reverse(string s)', value: '3' },
              { name: 'validAnagram(string str1, string str2)', value: '4' },
              { name: 'sort(string[] strArr)', value: '5' },
            ]
        });

    }

    async runPromptSelectMethod(){
        await this.#prompt.run()
            .then(answer => {
                this.#selectMethodName = answer;
            })
            .catch(console.error);
    }

    async runPromptSelectArgument(){
        this.#prompt = new Input({
            message: 'メソッドに引数を渡す値を入力して下さい',
            initial: '1'
        });

        await this.#prompt.run()
        .then(answer => console.log('Answer:', answer))
        .catch(console.log);
    }


}