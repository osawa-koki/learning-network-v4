# learning-network-v4

🌐🌐🌐 ネットワークについて学ぶためのサイト。  

## 環境構築

### 1. AWS CLIの設定

[公式サイト](https://aws.amazon.com/jp/cli/)からインストールします。  
インストール後、`aws configure`を実行し、アクセスキーとシークレットキーを入力します。  

アクセスキーとシークレットキーは、AWSのIAMページから作成します。  

`aws sts get-caller-identity`コマンドを実行して、自分のアカウントIDが表示されればOKです。  

### 2. AWS SAMの設定

[公式サイト](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)からインストールします。  
これはLambdaやAPI GatewayなどのAWSのサービスの管理ツールです。  

### 3. Lambdaのデプロイ

以下のコマンドを実行します。  
これは`./api`ディレクトリに移動して実行します。  

```shell
sam build --use-container
sam deploy --guided
```

本番環境へのデプロイは、`main`ブランチにマージすると自動で行われます。  
しかしながら、ECRへの新規イメージのpushは手動で行う必要があります。  
これは上記のコマンドを実行することで行われます。  

新規の関数を登録するにはECRが必要ですが、これはローカルで上記コマンドを実行して、`samconfig.toml`を更新する必要があります。  
新規に関数を作成して、ECRを作成した際には、`samconfig.toml`を登録しているGitHubシークレット情報を更新する必要があります。  
GitHubシークレットの登録に関しては、後述します。  

---

ローカルでLambdaを実行する場合は、以下のコマンドを実行します。  

```shell
sam local start-api
```

---

デプロイ後に、API GatewayのURLが表示されます。  
正しく動作しているかどうかを確認してください。  

### 4. Next.jsの設定

`.env.local.example`をコピーして、`.env.local`を作成します。  
`.env.local`には、API GatewayのURLを記述します。  

```shell
NEXT_PUBLIC_LAMBDA_API_URL=https://xxxxxxxxxx.execute-api.ap-northeast-1.amazonaws.com/Prod
```

これはGit管理対象外にしています。  
デプロイ用にはGitHubシークレットを使用します。  
詳しくは後述します。  

---

ローカルでNext.jsを実行する場合は、以下のコマンドを実行します。  

```shell
yarn dev
```

本番環境にデプロイするには`main`ブランチにマージします。  

### 5. シークレットの設定

GitHubのリポジトリのSettingsから、`Secrets`を作成します。  
設定内容は以下の通りです。  

| Name | Value |
| ---- | ----- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキー |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットキー |
| AWS_REGION | AWSのリージョン |
| SAMCONFIG_TOML | `samconfig.toml`の内容をBASE64エンコードしたもの |
| ENV_LOCAL | `.env.local`の内容 |
