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
        label: 'Sync Events',
        accelerator: 'CmdOrCtrl+s',
        click() {
          mainWindow.send(ACTIONS.SYNC_EVENTS);
        }
      },
      {
        label: 'Add Event',
        accelerator: 'CmdOrCtrl+a',
        click (item, focusedWindow) {
          mainWindow.send('add-event');
          // addEventWindow = new BrowserWindow({
          //   backgroundColor: 'transparent',
          //   title: 'New Event'
          // });

          // addEventWindow.loadURL(`file://${__dirname}/add_event_form.html`);
          // addEventWindow.webContents.openDevTools();
        }
      },
    ]
  },
]


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const menu = Menu.buildFromTemplate(template)

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: 'Calendar',
    show: false,
    transparent: true,
    frame: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  Menu.setApplicationMenu(menu)
  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow.on(ACTIONS.SIGNAL_SYNCED_EVENTS, () => {
      app.quit();
      mainWindow = null;
    });

    mainWindow.send(ACTIONS.SYNC_EVENTS);
  });

  mainWindow.on('ready-to-show', function() {
       mainWindow.show();
       mainWindow.focus();
   });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

