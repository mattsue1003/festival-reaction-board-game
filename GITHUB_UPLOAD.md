# GitHub 上傳說明

本資料夾已整理成可直接上傳的網站與桌遊素材專案，包含：

- Next.js／Vinext 遊戲介紹網站
- 12 個節日、48 張牌面 PDF
- 48 張牌背 PDF
- 1:1 Facebook 宣傳圖與原始牌背圖片
- README、玩法規則與社群貼文文案

## 使用 GitHub 網頁介面

1. 在 GitHub 建立一個新的空白 repository。
2. 點選 **Add file → Upload files**。
3. 將本專案資料夾內的檔案全部拖曳上傳。
4. 確認 `app`、`public`、`scripts`、`package.json` 與 `README.md` 都在 repository 根目錄。
5. 點選 **Commit changes**。

## 使用 Git 指令

將 `YOUR_REPOSITORY_URL` 替換成自己的 GitHub repository 網址：

```bash
git init
git add .
git commit -m "建立節慶反應桌遊網站與社群素材"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

## 建議不要上傳

`node_modules`、`.next`、`.vinext`、`dist`、`tmp` 等本機產生資料已由 `.gitignore` 排除；GitHub 上傳時不需要這些資料夾。
