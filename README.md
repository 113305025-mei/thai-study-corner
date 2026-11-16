# Thai Study Corner｜泰語學習角落

一個適合繁體中文初學者的泰語學習小網站，包含打招呼、餐廳點餐及旅遊交通等實用主題。所有主題資料都放在 `content/lessons.json`，新內容可依 `AGENTS.md` 的規則持續擴充。

## 網站功能
- 依主題分類瀏覽泰語筆記
- 搜尋泰文、中文、發音提示或主題
- 手機和電腦都能瀏覽
- 無需安裝套件或建置工具

## 本機預覽
在專案資料夾內執行：

```bash
python3 -m http.server 8000
```

開啟 `http://localhost:8000/`。請不要直接以 `file://` 開啟 `index.html`，因為瀏覽器可能不允許載入本機 JSON。

## 在 GitHub Pages 公開
1. 在 GitHub 建立公開儲存庫，例如 `thai-study-corner`。
2. 將本專案所有檔案及資料夾上傳到儲存庫**根目錄**（不要多包一層資料夾）。
3. 到儲存庫 `Settings` → `Pages` → `Build and deployment`，選擇 `Deploy from a branch`。
4. Branch 選擇 `main`、資料夾選擇 `/ (root)`，按 `Save`。
5. 部署完成後，網址通常是 `https://USERNAME.github.io/thai-study-corner/`（請將 USERNAME 換成自己的帳號）。

## 如何新增一個主題
1. 先讀 `AGENTS.md` 的內容規範。
2. 在 `content/lessons.json` 陣列中新增一個物件，包含 `id`、`category`、`title`、`description`、`items`。
3. 每個主題放 3–6 個泰文詞句，每個詞句要有 `thai`、`pronunciation`、`chinese`、`example`。
4. 儲存後重新整理網頁；新主題就會自動出現。**不必編輯 HTML。**

注意：中文發音提示只是方便入門的近似讀法，並不能完全代表泰語聲調與實際發音。
