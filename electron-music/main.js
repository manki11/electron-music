const electron = require('electron');
const {app, BrowserWindow, Menu, dialog} = electron;
const fs= require('fs');

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
  console.log("Pause");
}

function sendNextSongMessage() {
  mainWindow.webContents.send('modal-next-song', 'next');
  console.log("Next");
}

function sendPrevSongMessage() {
  mainWindow.webContents.send('modal-prev-song', 'prev');
  console.log("Previous");

}

// To select .mp3 file
function openFileDialog() {
  console.log("Open");
  dialog.showOpenDialog(mainWindow, {properties: ['openDirectory']}, (filePath)=>{
    if(filePath) {
      fs.readdir(filePath[0], (err, files) => {
        let arr = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].substr(-4) === '.mp3') {
            arr.push(files[i]);
          }
        }
        console.log(arr);
        let objectToSend = {};
        objectToSend.path = filePath[0];
        objectToSend.files = arr;
        mainWindow.webContents.send('modal-folder-content', objectToSend);
      })
    }else{
      console.log("No file chosen");
    }
  })
}
