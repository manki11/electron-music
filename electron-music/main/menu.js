const electron = require('electron');
const app = electron.app;

module.exports = function (fns) {
  let mainMenuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'About',
          role: 'about'
        }, {
          label: 'Select Folder',
          click: () => {
            fns.openFileDialog();
          },
          accelerator: process.platform === 'darwin' ? 'Command+O' : 'Ctrl+0'
        }, {
          type: 'separator'
        }, {
          type: 'separator'
        }, {
          label: 'Quit',
          click: () => {
            app.quit();
          },
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q'
        }
      ]
    },
    {
      label: 'Controls',
      submenu: [
        {
          label: 'Pause Song',
          click: () => {
            fns.sendPauseSongMessage();
          },
          accelerator: process.platform === 'darwin' ? 'Command+E' : 'Ctrl+E'
        },{
          type: 'separator'
        }, {
          label: 'Next Song',
          click: () => {
            fns.sendNextSongMessage();
          },
          accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N'
        }, {
          label: 'Previous Song',
          click: () => {
            fns.sendPrevSongMessage();
          },
          accelerator: process.platform === 'darwin' ? 'Command+P' : 'Ctrl+P'
        }
      ]
    }
  ];

  //Add developer tools item if not in production
  if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu: [
        {
          label: 'Toggle Dev Tools',
          click: (item, foccusedWindow) => {
            foccusedWindow.toggleDevTools();
          },
          accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I'
        }, {
          type: 'separator'
        },  {
          role: 'reload'
        }
      ]
    })
  }

  //If mac add empty object to menu
  if (process.platform === 'darwin') {
    mainMenuTemplate.unshift({});
  }

  return mainMenuTemplate;
};
