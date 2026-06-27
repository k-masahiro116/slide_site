# Slide Site

GitHub Pages でスライドを公開するための静的サイトです。

## 使い方

1. `index.html` の `<section class="slide">` を編集してスライドを追加します。
2. GitHub に push します。
3. GitHub リポジトリの `Settings` -> `Pages` で、`Deploy from a branch`、`main`、`/ (root)` を選択します。

## ローカル確認

ブラウザで `index.html` を開くか、簡易サーバーを起動して確認できます。

```sh
python3 -m http.server 8000
```

その後、`http://localhost:8000` を開いてください。

## 操作

- 次へ: `Right` / `Down` / `Space`
- 前へ: `Left` / `Up`
- 最初へ: `Home`
- 最後へ: `End`

