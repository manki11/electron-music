const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

//Set env
process.env.NODE_ENV= 'development';

let mainWindow;

//Listen for when app is ready
app.on('ready', ()=> {
  mainWindow= new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);

  mainWindow.on('closed', ()=>{
    app.quit();
  });
});
