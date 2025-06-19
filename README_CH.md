# 桌面字幕（Desktop Captions）

桌面字幕是一款 Electron 應用程式，讓你可以在桌面上顯示可自訂的文字或圖片浮窗。非常適合用來顯示重要備忘、品牌標誌，或為你的工作空間增添個人風格。

## 特色

* **自訂浮窗**：可顯示任意文字或圖片（支援網址）。
* **外觀調整**：可自訂文字顏色、字體大小、透明度。
* **永遠置頂**：浮窗會固定在所有視窗最上層。
* **穿透模式**：可設定浮窗為滑鼠穿透，不影響操作其他視窗。
* **可拖曳視窗**：可自由拖曳浮窗到螢幕任意位置。
* **系統匣圖示**：可從系統匣快速開啟控制面板或結束程式。
* **現代化控制面板**：時尚的控制面板，並有動態背景（Vanta.js）。

## 截圖

（請於此處補上應用程式的截圖，例如控制面板與浮窗展示）

**控制面板：**
![控制面板截圖佔位圖](placeholder_control_panel.png)

**浮窗範例：**
![浮窗截圖佔位圖](placeholder_overlay.png)

## 快速開始

你可以用以下方式取得桌面字幕：

* **下載已編譯版本**：前往 [releases page](https://github.com/guan4tou2/desktop-captions/releases) 下載 Windows（.exe/NSIS）、Linux（.AppImage/.deb）、macOS（.dmg）等版本（如有提供）。
* **自行編譯**：請參考下方「從原始碼建置」說明。

### 使用說明

1. 啟動應用程式。
2. 會出現**控制面板**：
    * 在「Text」欄位輸入你想顯示的文字，也可直接輸入圖片網址（如 `https://path.to/your/image.png`）。
    * 使用下方控制項調整**顏色**、**字體大小**、**透明度**。
3. 點擊 **「Start Overlay」** 顯示字幕浮窗。
    * 浮窗會出現在螢幕上，可拖曳移動。
4. 點擊 **「Set Overlay」** 啟用滑鼠穿透，紅色邊框會消失。
5. 點擊 **「Stop Overlay」** 關閉字幕浮窗。
6. 可於**系統匣**找到應用程式圖示：
    * 點擊可喚出控制面板。
    * 右鍵可選擇開啟控制面板或結束程式。

## 從原始碼建置

你需要先安裝 [Node.js](https://nodejs.org/) 及 npm（Node.js 內建）。

1. **下載原始碼：**
    ```bash
    git clone https://github.com/guan4tou2/desktop-captions.git
    ```
2. **進入專案資料夾：**
    ```bash
    cd desktop-captions
    ```
3. **安裝相依套件：**
    ```bash
    npm install
    ```
4. **開發模式執行：**
    * 會自動用 Webpack 打包 JS 檔案。
    ```bash
    npm start
    ```
5. **打包成安裝檔（選用）：**
    * 產生各平台安裝檔（如 .exe、.AppImage）：
        ```bash
        npm run pack-dist
        ```
    * 產生未壓縮的打包目錄：
        ```bash
        npm run pack
        ```
    * 打包結果會在 `pack` 目錄下。

## 使用技術

* **[Electron](https://www.electronjs.org/):** 跨平台桌面應用框架
* **[Node.js](https://nodejs.org/):** 執行環境
* **HTML, CSS, JavaScript:** UI 與應用邏輯
* **[Webpack](https://webpack.js.org/):** JS 模組打包
* **[Tailwind CSS](https://tailwindcss.com/):** 控制面板樣式
* **[Vanta.js](https://www.vantajs.com/):** 動態背景
* **[electron-builder](https://www.electron.build/):** 打包與發行

## 授權

本專案採用 [CC0-1.0 Universal](LICENSE) 公眾領域授權。你可以自由使用、修改、散布、再授權本軟體，無任何限制。
