# IN BRAND Inc. ホームページ

IN BRAND Inc. のコーポレートサイトを構築する Next.js プロジェクトです。

## ローカルで表示する方法（納品に影響しません）

納品物（ソースコード・`delivery_out`・`delivery_public`）には手を加えず、ローカルでのみ表示する手順です。

1. **このフォルダ（delivery）で次を実行する**
   ```bash
   npm install
   npm run dev
   ```
2. ブラウザで **http://localhost:3000** を開く  
   （初回はコンパイルに十数秒かかることがあります）
3. **画像・動画も表示したい場合**  
   親ディレクトリの `delivery_public/public/` の中身を、このフォルダの `public/` にコピーしてから `npm run dev` を実行する。  
   コピーはローカル確認用であり、納品用の `delivery_public` フォルダはそのままでよい。

- **納品への影響:** `npm run dev` で生成される `.next` や `node_modules` は Git の対象外のため、納品物に含まれません。納品先へ渡すのは従来どおり「delivery（ソース）」「delivery_out」「delivery_public」です。
- **表示がおかしい場合:** `.next` を削除してから再度 `npm run dev` を実行する（`rm -rf .next && npm run dev`）。

## 開発サーバーの起動

開発環境を立ち上げるには以下のコマンドのいずれかを実行します。

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

ブラウザで `http://localhost:3000` を開くと、開発サーバーの表示を確認できます。`app/page.tsx` を更新するとページは自動的にリロードされます。

## 静的エクスポートと Docker + Nginx

`docker/Dockerfile.nginx` イメージは `out` ディレクトリに生成される静的エクスポートを配信します。

1. 依存関係のインストールと静的エクスポートの生成 (`next.config.ts` で `output: "export"` が有効になっているため `out` が作成されます)。

   ```bash
   npm install
   npm run build
   ```

2. Docker Compose で Nginx を起動します (`docker/docker-compose.yml` が軽量なイメージをビルドし、静的エクスポートとカスタム設定を読み取り専用ボリュームとしてマウントするため `out` の更新が即座に反映されます)。

   ```bash
   docker compose -f docker/docker-compose.yml up --build
   ```

ブラウザで `http://localhost:8080` を開くと、Nginx による静的サイトの配信を確認できます。停止するには `Ctrl+C`、または別ターミナルで `docker compose -f docker/docker-compose.yml down` を実行してください。
