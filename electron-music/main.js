const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

//Set env
process.env.NODE_ENV = 'development';

let mainWindow;

let fns = {
  sendPauseSongMessage: sendPauseSongMessage,
  sendNextSongMessage: sendNextSongMessage,
  sendPrevSongMessage: sendPrevSongMessage,
  openFileDialog: openFileDialog
};
const mainMenuTemplate = require('./main/menu')(fns);

//Listen for when app is ready
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  mainWindow.on('closed', () => {
    app.quit();
  });

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Insert menu
  Menu.setApplicationMenu(mainMenu);
});

function sendPauseSongMessage() {
  mainWindow.webContents.send('modal-pause-song', 'pause');
}

function sendNextSongMessage() {
  mainWindow.webContents.send('modal-next-song', 'next');
}

function sendPrevSongMessage() {
  mainWindow.webContents.send('modal-prev-song', 'prev');
}

function openFileDialog() {

}
