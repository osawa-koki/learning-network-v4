FROM node:18

WORKDIR /app

# パッケージはほとんどインストールされているので、早い段階でレイヤを構築
COPY package.json package-lock.json ./
RUN yarn install

# ホストのソースコードをコンテナにコピー
COPY . .

VOLUME [ "/app/dist" ]

CMD [ "yarn", "build" ]
