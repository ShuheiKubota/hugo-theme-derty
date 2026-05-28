# derty -- Hugo theme

## 必要なもの

-  このテーマでは Dart Sass を使っています。
- 事前に `hugo gen chromastyles` で `assets/css` に `syntax.css` と `syntax_dark.css` を作成しておくことで、ライトモード・ダークモードに合わせたシンタックスハイライトがされます。

## Render Hooks

- blockquote
- link

## 設定

### プロジェクトの設定

```toml
[params]
  [params.derty]
    # コンテンツの最終更新日時が設定した期間を過ぎると警告が表示されます。
    # 上2つが設定されていない場合は警告は表示されません。
    outdatedUnit = "year"
    outdatedLimit = 1
    # %s の部分に経過月数や経過年数が入ります。 HTML 可。
    outdatedMessageHTML = "最終更新日から %s 以上が経過しています。<br/>内容が古くなっている可能性があるのでご注意ください。"

    # 空白の場合は 📄 が使われる。 HTML 可。
    latestIconHTML = "<img src='/abc.png' />"

[markup]
  [markup.tableOfContents]
    # Hugo 標準の設定。
    startLevel = 2
    endLevel = 3
    ordered = false

  [markup.highlight]
    noClasses = false
```

## セクションの _index.md のフロントマター

### params: series: BOOLEAN

#### 記述例

```yaml
---
title: "..."
params:
    series: true
---
```

#### 説明

セクションページでのコンテンツの並び順を制御します。  
セクションが連載記事を扱う場合、コンテンツの一覧を**タイトル昇順**で並ぶようにします。

false (デフォルト) の場合、Hugo 標準通りの並び順になります。

true の場合、タイトルの昇順でコンテンツが並びます。  
