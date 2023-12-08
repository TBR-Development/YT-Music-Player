import { app, globalShortcut, Tray, Menu, nativeImage } from 'electron';

const menubar = require('menubar');
const path = require('path');

const iconPath = path.join(__dirname, 'MenuIcon.png')


const mb = menubar({
  browserWindow: { width: 450, height: 660 },
  preloadWindow: true,
  icon: path.join(__dirname, '/assets/icon.png'),
  webPreferences: {
    partition: 'presist: YouTube-Music',
  }
});

mb.app.commandLine.appendSwitch(
  "disable-background-occluded-windows",
  "true"
);

mb.on('ready', () => {
  console.log('app is ready');

  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      "label": "Open",
      "type": "normal",
      "click": () => app.show()
  },
  {
      "label": "Quit",
      "type": "normal",
      "click": () => app.quit()
  }
  ])
  
  mb.window.loadURL('https://music.youtube.com/');

});

globalShortcut.register('CommandOrControl+X', () => {
  if (process.platform !== 'darwin') {
    mb.app.removeAllListeners();
    mb.tray.removeAllListeners();
    mb.window.removeAllListeners();
    app.quit()
  };
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    mb.app.removeAllListeners();
    mb.tray.removeAllListeners();
    mb.window.removeAllListeners();
    app.quit()
  };
});