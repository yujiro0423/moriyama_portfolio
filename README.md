# 森山湧二郎 (もりもり) ポートフォリオサイト

このサイトは森山湧二郎（ハンドルネーム：もりもり）のポートフォリオサイトです。

## 🎯 サイト概要

- **作成者**: 森山湧二郎 (Y.M)
- **テーマ**: ダークテーマのモダンなポートフォリオ
- **技術**: HTML5, CSS3, JavaScript, Bootstrap 5
- **ホスティング**: GitHub Pages

## 📁 ファイル構造

```
moriyama_portfolio/
├── index.html              # メインHTMLファイル
├── style.css              # カスタムCSSスタイル
├── README.md              # このファイル
├── assets/
│   ├── css/              # 追加CSSファイル（今後使用）
│   ├── js/
│   │   └── main.js       # メインJavaScriptファイル
│   └── images/           # 画像ファイル
└── hero_objects/
    └── images/           # ヒーローセクション用画像
```

## 🎨 デザインの特徴

- **ダークテーマ**: 目に優しい暗色ベースのデザイン
- **グラデーション**: 紫系のグラデーションでモダンな印象
- **レスポンシブ**: モバイル、タブレット、デスクトップ対応
- **アニメーション**: スムーズなスクロールとフェードイン効果
- **ホバーエフェクト**: インタラクティブな要素

## 📝 コンテンツセクション

### 1. Hero Section (ヒーロー)
- プロフィール写真
- メインキャッチコピー
- 基本的な自己紹介

### 2. About Section (自己紹介)
- 詳細なプロフィール
- スキル・趣味の概要

### 3. Skills Section (スキル)
- プログラミングスキルの進捗バー
- VBA (1年)
- Python (6ヶ月)
- C# (学習開始)
- Web Development (勉強中)

### 4. Music Section (音楽活動)
- バンド情報
- 使用楽器の紹介
- 今後の活動告知エリア
- 動画埋め込みエリア

### 5. Portfolio Section (作品集)
- プログラミング作品
- 音楽作品
- 動的にコンテンツを追加可能

### 6. Interests Section (趣味・読書)
- 読書傾向
- 興味のある分野

### 7. Contact Section (連絡先)
- メール: moriyamayujiro@gmail.com
- GitHub: yujiro0423
- Twitter: @yuppa0423

## 🔧 コンテンツの追加方法

### プログラミング作品を追加する場合

```javascript
// main.jsを開き、以下のコードを実行
portfolioManager.addProgrammingProject({
    title: "プロジェクト名",
    description: "プロジェクトの説明",
    github: "https://github.com/yujiro0423/project-name",
    demo: "https://yujiro0423.github.io/project-name",
    technologies: ["Python", "Flask", "SQLite"]
});
```

### 音楽作品を追加する場合

```javascript
portfolioManager.addMusicProject({
    title: "楽曲名",
    description: "楽曲の説明",
    audio: "path/to/audio/file.mp3",
    spotify: "https://open.spotify.com/track/..."
});
```

### ライブ告知を追加する場合

```javascript
portfolioManager.addMusicAnnouncement({
    title: "ライブタイトル",
    date: "2025-12-01",
    description: "ライブの詳細情報",
    link: "https://example.com/live-info"
});
```

### 演奏動画を追加する場合

```javascript
portfolioManager.addMusicVideo({
    title: "動画タイトル",
    url: "https://www.youtube.com/embed/VIDEO_ID",
    description: "動画の説明"
});
```

## 🖼️ 画像の追加

### プロフィール画像を追加する場合

1. `assets/images/` フォルダに画像ファイルを配置
2. `index.html` の以下の部分を編集:

```html
<!-- 現在のプレースホルダー -->
<div class="bg-secondary rounded-circle profile-img d-flex align-items-center justify-content-center">
    <i class="bi bi-person-circle" style="font-size: 10rem; color: var(--text-muted);"></i>
</div>

<!-- 実際の画像に変更 -->
<img src="assets/images/profile.jpg" alt="森山湧二郎" class="profile-img rounded-circle">
```

### その他の画像

- `assets/images/` - 一般的な画像
- `hero_objects/images/` - ヒーローセクション用の装飾画像

## 🚀 GitHub Pagesでの公開手順

1. GitHubリポジトリを作成
2. ファイルをアップロード
3. リポジトリの Settings > Pages で設定
4. Source を "Deploy from a branch" に設定
5. Branch を "main" に設定
6. 数分後に `https://yujiro0423.github.io/moriyama_portfolio` でアクセス可能

## 🎵 音楽関連ファイルの管理

### 推奨フォルダ構造

```
assets/
├── audio/
│   ├── originals/        # オリジナル楽曲
│   └── covers/          # カバー楽曲
└── images/
    └── music/           # アルバムアートワークなど
```

### 音楽ファイルの注意点

- ファイルサイズを最適化する
- 著作権に注意する
- 対応フォーマット: MP3, WAV, OGG

## 🔄 定期的な更新

### 月次更新推奨項目

1. **スキルセクション**: 学習進捗の更新
2. **読書セクション**: 新しく読んだ本の追加
3. **プロジェクト**: 新しい作品の追加
4. **音楽活動**: ライブやレコーディングの告知

### 年次更新推奨項目

1. デザインのリニューアル
2. 新しい技術の導入
3. パフォーマンスの最適化

## 📱 レスポンシブ対応

サイトは以下のデバイスで最適化されています：

- **デスクトップ**: 1200px以上
- **タブレット**: 768px - 1199px
- **モバイル**: 767px以下

## 🎨 カスタマイズ

### 色の変更

`style.css` の `:root` セクションでカラーパレットを変更可能：

```css
:root {
    --primary-color: #667eea;     /* メインカラー */
    --secondary-color: #764ba2;   /* セカンダリカラー */
    --accent-color: #f093fb;      /* アクセントカラー */
    /* その他の色設定... */
}
```

### フォントの変更

```css
body {
    font-family: 'あなたの好きなフォント', 'Segoe UI', sans-serif;
}
```

## 📧 問い合わせ

サイトに関する質問や改善提案は以下まで：

- **Email**: moriyamayujiro@gmail.com
- **GitHub**: [@yujiro0423](https://github.com/yujiro0423)
- **Twitter**: [@yuppa0423](https://twitter.com/yuppa0423)

---

© 2025 森山湧二郎 (もりもり). All rights reserved.
Homepage data displaying Moriyama's portfolio
