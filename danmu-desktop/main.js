// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, Tray, Menu, ipcMain } = require('electron')
const path = require('path')

let mainWindow
let childWindow
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    // autoHideMenuBar: true, 
    // icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  ipcMain.on('deleteChild', (event) => {
    childWindow.destroy()
  })
  ipcMain.on('createChild', (event) => {
    createChildWindow()

    childWindow.setVisibleOnAllWorkspaces(true, 'visibleOnFullScreen')
    childWindow.setAlwaysOnTop(true,"screen-saver")

  })
  ipcMain.on('change',(event,mytext,colorInput,opacityInput,sizeInput)=>{
    try{
      childWindow.webContents.executeJavaScript(
        `
        showdanmu('${mytext}','${colorInput}',${opacityInput},${sizeInput})
        `
        )
      }catch(e){

      }

  })
  ipcMain.on('setChild',(event)=>{
    childWindow.setIgnoreMouseEvents(true)
    childWindow.webContents.executeJavaScript(
      `
document.getElementById("childbody").style.borderColor="transparent";
    `
    )
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()

  // createChildWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  tray = new Tray(path.join(__dirname, 'assets/icon.png'));
  const menu = [
    {
      label: 'open manager',
      click: () => { mainWindow.show() }
    },
    {
      label: 'quit',
      // role: 'quit',
      click: () => { if (BrowserWindow.getAllWindows().length === 2){ childWindow.destroy() ;app.quit() }else{app.quit()}}
      
    }
  ];
  tray.setContextMenu(Menu.buildFromTemplate(menu));
  tray.setToolTip('danmu manager');

  tray.on('double-click', () => {
    mainWindow.show();
  });
  mainWindow.on('minimize', ev => {
    ev.preventDefault();
    mainWindow.hide();
    
  });
  mainWindow.on('close', e => {
    if (BrowserWindow.getAllWindows().length === 2){ childWindow.destroy() ;app.quit() }else{app.quit()}
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function createChildWindow() {
  // const { width, height } = screen.getPrimaryDisplay().size; 
  childWindow = new BrowserWindow({
    closable:false,
    width:400, height:400, //for multiscreen
    skipTaskbar:true,
    transparent: true,
    frame: false,
    // resizable: false,
    icon: path.join(__dirname, 'assets/icon.png')
  })

  // childWindow.setIgnoreMouseEvents(true)
  // childWindow.webContents.openDevTools()
  childWindow.loadFile('child.html')

  childWindow.once('ready-to-show', () => {
    childWindow.show()
  })

  childWindow.on('closed', () => {
    childWindow.destroy()
  })

}




