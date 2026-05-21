# Polyrepo 旧アーキテクチャ

> このページは `polyrepo` ブランチのアーキテクチャを記録しています。参照専用のアーカイブです。

## 元のディレクトリ構造

```
fast-vue3/          ← 単一リポジトリ・単一アプリ
├── src/
│   ├── api/user/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layout/
│   ├── router/
│   ├── store/modules/
│   ├── utils/http/axios/
│   └── views/
├── build/vite/plugins/
├── mock/
├── types/
├── vite.config.mts
└── package.json
```

## 技術的負債

| 問題 | 影響 |
|------|------|
| `src/` 下に全コードが混在 | 境界不明確、抽出・再利用が困難 |
| Vite 設定がルートに直書き | プロジェクト間で共有不可 |
| TypeScript strict モードなし | 型安全性が不十分 |
| 依存バージョン固定戦略なし | アップグレードリスク高 |
| Lint ツールチェーン未整備 | チーム開発で品質が不均一 |

## Phase 1 での改善内容

アーカイブ前に実施した標準化作業：

- **ディレクトリ整理** — `src/` 下のモジュール境界を再整理
- **ESLint Flat Config 導入** — `eslint.config.mjs`
- **Prettier・Stylelint 統一**
- **commitlint + czg** — コンベンショナルコミット対応
- **Lefthook 導入** — Husky の軽量代替
- **TypeScript 型補完** — `types/` 下のグローバル型宣言

## アーカイブ手順

```bash
git checkout -b polyrepo
git tag v0.3.0-polyrepo-final
git checkout main
```

## 限界まとめ

Polyrepo では対応困難な場面：

1. 複数 UI フレームワークのサポート
2. チーム協業での明確な責務分担
3. 依存バージョンの一元管理
4. コードの横断的な再利用
5. 構築キャッシュとタスク並列化

これらがMonorepoへの移行を推進した根本的な要因です。
