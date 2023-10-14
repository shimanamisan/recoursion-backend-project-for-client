FROM node:18.18.0-alpine3.18

RUN apk update && apk upgrade && \
    apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    # bashのインストール
    bash \
    # タイムゾーンの設定
    tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    # 不要なキャッシュやファイルを削除
    rm -rf /var/cache/apk/* && \
    # 名前付きパイプの出力先 /data/temp/ ディレクトリを作成する
    mkdir -p /data/temp/

WORKDIR /workspace