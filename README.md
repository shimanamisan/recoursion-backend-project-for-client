# recoursion-backend-project-for-client

[![PHP](https://img.shields.io/badge/Node-18.18.0-red.svg)](https://www.php.net/downloads.php)
[![Docker](https://img.shields.io/badge/Docker-24.0.5-red.svg)](https://docs.docker.com/engine/release-notes/24.0/)
[![License](https://img.shields.io/badge/License-MIIT-blue.svg)](https://licenses.opensource.jp/MIT/MIT.html)

# 概要

Recoursionバックエンドプロジェクトで使用するCLIクライアント（Node.js）

[recoursion-backend-project-for-php](https://github.com/shimanamisan/recoursion-backend-project-for-php) リポジトリ（バックエンド）と併用します。

## 前提

別途開発用のマシンを用意していることを前提としています。

WSL2環境下やDocker Desktop環境下でも動作すると思いますが、別途設定が必要になる場合があります。

Docker と VS Code の拡張機能 [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) を使用することを前提としています。

# 検証済み環境

- Ubuntu 22.04.3 LTS

# 使用方法

1. 適当な作業ディレクトリで、以下のコマンドを実行します。
    ```bash
    $ git clone git@github.com:shimanamisan/recoursion-backend-project-for-client.git
    ```

2. `rrecoursion-backend-project-for-client`を VS Code で開き、`F1`キーでコマンドパレット開き、開発コンテナを起動します。
![スクリーンショット 2023-07-30 093122](https://github.com/shimanamisan/php-test-object/assets/49751604/8f2b59ca-8205-494d-9b47-dc385b03ccb0)

3. VS Code のターミナルを開き、起動したコンテナにアタッチされていることを確認します。
![スクリーンショット 2023-10-15 235728](https://github.com/shimanamisan/recoursion-backend-project-for-client/assets/49751604/5571a09d-c0a8-4a57-978c-b1c7783d36e5)

4. 開いたターミナルから`public/RemoteProcedureCall`ディレクトリに移動し必要なパッケージをインストールします。
    ```bash
    $ cd public/RemoteProcedureCall

    $ npm install
    ```

5. サーバ側のプログラムが実行されていることを確認して以下のコマンドを実行します。
    ```bash
    $ node index.js
    ```
    呼び出すメソッドを選択します。
    
   ![スクリーンショット 2023-10-23 071145](https://github.com/shimanamisan/recoursion-backend-project-for-client/assets/49751604/b6e05617-9a6d-4323-8ded-d1c90bb01f74)
