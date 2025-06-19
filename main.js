// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, Tray, Menu, ipcMain } = require("electron");
const path = require("path");

// 在打包（dist）後 __dirname 會變成 dist 資料夾，所以 icon.png 需要往上一層尋找
const iconPath = path.join(__dirname, "../assets/icon.png");

let mainWindow;
let childWindow;

// 用來暫存最後一次的字幕設定，確保 childWindow 建立完成後可以立即顯示
let lastOverlay = {
  text: "",
  color: "#3fd9ab",
  opacity: 100,
  size: 24,
};

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    resizable: false,
    // autoHideMenuBar: true,
    // icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, "preload.bundle.js"), // Corrected path
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // RELOCATED HANDLERS START
  mainWindow.on("minimize", (ev) => {
    ev.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", (e) => {
    console.log("[Main] Window close event triggered");
    // close all child windows
    if (BrowserWindow.getAllWindows().length === 2) {
      childWindow.destroy();
      app.quit();
    } else {
      app.quit();
    }
  });
  // RELOCATED HANDLERS END

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  ipcMain.on("deleteChild", (event) => {
    childWindow.destroy();
  });
  ipcMain.on("createChild", (event) => {
    createChildWindow();

    childWindow.setVisibleOnAllWorkspaces(true, "visibleOnFullScreen");
    childWindow.setAlwaysOnTop(true, "screen-saver");
  });
  ipcMain.on("change", (event, mytext, colorInput, opacityInput, sizeInput) => {
    // 更新暫存的字幕資料
    lastOverlay = {
      text: mytext,
      color: colorInput,
      opacity: opacityInput,
      size: sizeInput,
    };
    try {
      childWindow.webContents.executeJavaScript(
        `
        // eslint-disable-next-line
        showdanmu('${mytext.replace(
          /'/g,
          "\\'"
        )}','${colorInput}',${opacityInput},${sizeInput})
        `
      );
    } catch (e) {}
  });
  ipcMain.on("setChild", (event) => {
    childWindow.setIgnoreMouseEvents(true);
    childWindow.webContents.executeJavaScript(
      `
document.getElementById("childbody").style.borderColor="transparent";
    `
    );
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();

  // createChildWindow()
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  tray = new Tray(iconPath);
  const menu = [
    {
      label: "open manager",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "quit",
      // role: 'quit',
      click: () => {
        if (BrowserWindow.getAllWindows().length === 2) {
          childWindow.destroy();
          app.quit();
        } else {
          app.quit();
        }
      },
    },
  ];
  tray.setContextMenu(Menu.buildFromTemplate(menu));
  tray.setToolTip("desktop captions");

  tray.on("double-click", () => {
    mainWindow.show();
  });
  // mainWindow.on('minimize', ev => {
  //   ev.preventDefault();
  //   mainWindow.hide();

  // });
  // mainWindow.on('close', e => {
  //   if (BrowserWindow.getAllWindows().length === 2){ childWindow.destroy() ;app.quit() }else{app.quit()}
  // });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createChildWindow() {
  // const { width, height } = screen.getPrimaryDisplay().size;
  childWindow = new BrowserWindow({
    closable: false,
    width: 400,
    height: 400, //for multiscreen
    skipTaskbar: true,
    transparent: true,
    frame: false,
    // resizable: false,
    icon: iconPath,
  });

  // childWindow.setIgnoreMouseEvents(true)
  // childWindow.webContents.openDevTools()
  childWindow.loadFile("child.html");

  childWindow.once("ready-to-show", () => {
    childWindow.show();
  });

  childWindow.on("closed", () => {
    childWindow.destroy();
  });

  // 當 child 視窗完成載入後，再把最後一次的字幕設定傳遞進去，避免載入時機差導致文字沒有顯示
  childWindow.webContents.once("did-finish-load", () => {
    if (lastOverlay.text !== "") {
      childWindow.webContents.executeJavaScript(
        `
        // eslint-disable-next-line
        showdanmu('${lastOverlay.text.replace(/'/g, "\\'")}','${
          lastOverlay.color
        }',${lastOverlay.opacity},${lastOverlay.size})
        `
      );
    }
  });
}
