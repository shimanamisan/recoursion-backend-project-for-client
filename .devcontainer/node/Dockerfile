FROM node:18.18.0-alpine3.18

RUN apk update && apk upgrade && \
    apk add --no-cache \
    python3 \
    make \
    g++ \
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

ARG USER_ID="10000"
ARG GROUP_ID="10001"
ARG USER_NAME="user01"

# ユーザーとグループの追加
RUN addgroup -S -g "${GROUP_ID}" "${USER_NAME}" && \
  adduser -s /bin/bash -u "${USER_ID}" -G "${USER_NAME}" -D "${USER_NAME}"

WORKDIR /workspace

# ディレクトリの所有者を変更
RUN chown -R user01:user01 /workspace

USER user01