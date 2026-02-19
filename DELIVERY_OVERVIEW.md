# 納品物概要（開発会社様向け）

## ファイル構成

### delivery/

- ソースコード一式
- `npm install` → `npm run dev` で開発サーバーを起動可能

### delivery_out/

- 静的エクスポートデータを格納
- 内部に `out/` ディレクトリがあり、その中身をサーバーの公開ディレクトリへ配置することでサイトが公開可能

### delivery_public/

- Git 管理外の大型アセット（画像・動画など）
- 運用環境では `public/` 直下へ配置、もしくは CDN にアップロード

---

## 引き渡し手順

1. 上記 3 ファイルをダウンロードし、改ざん防止のため必要に応じてハッシュ値を共有
2. 各 ZIP を任意の作業ディレクトリに展開
3. `delivery.zip` 展開先で以下を実行
   ```bash
   npm install
   npm run dev
   ```
   → ブラウザで http://localhost:3000 を開いて確認
4. delivery_out.zip 展開先を Nginx 配信環境に配置
   → http://localhost:8080 で確認
5. delivery_public.zip に含まれるファイルを本番運用に合わせて配置

---

## ドキュメント

README.md：開発サーバーおよび Docker を用いた配信手順を記載
