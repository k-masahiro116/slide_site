# Slide Site

GitHub Pages でスライドを公開するための静的サイトです。

## 使い方

1. トップページ（`index.html`）からスライドを選んで表示します。
2. 新しいスライドを追加する場合:
   - `slides/<名前>/index.html` を作成
   - `slides/manifest.json` に表紙情報を登録
3. GitHub に push します。
4. GitHub リポジトリの `Settings` -> `Pages` で、GitHub Actions によるデプロイを有効にします。

## ディレクトリ構成

```text
index.html              # スライド選択画面
catalog.js              # 選択画面の描画
styles.css              # 共通スタイル
script.js               # スライド表示用スクリプト
slides/
  manifest.json         # スライド一覧の定義
  intro/index.html      # スライド本体
  sample/index.html
```

## ローカル確認

```sh
python3 -m http.server 8000
```

その後、`http://localhost:8000` を開いてください。

## 操作

- 次へ: `Right` / `Down` / `Space`
- 前へ: `Left` / `Up`
- 最初へ: `Home`
- 最後へ: `End`
