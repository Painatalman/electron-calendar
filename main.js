const {app, BrowserWindow, Menu, ipcMain} = require('electron');

const ACTIONS = require('./actions.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, addEventWindow;

const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Event',
        accelerator: 'CmdOrCtrl+a',
        click (item, focusedWindow) {
          addEventWindow = new BrowserWindow({
            backgroundColor: 'transparent',
            title: 'New Event'
          });

          addEventWindow.loadURL(`file://${__dirname}/add_event_form.html`);
          addEventWindow.webContents.openDevTools();
        }
      },
    ]
  },
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: 'transparent',
    title: 'Calendar',
    show: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  mainWindow.on('ready-to-show', function() {
       mainWindow.show();
       mainWindow.focus();
   });
}

ipcMain.on('add-event', (event, data) => {
  console.log(data);
  mainWindow.send('add-event', data);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
