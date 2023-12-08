import { app, globalShortcut, Tray, Menu } from 'electron';
import { path }from "path";
import { menubar } from "menubar";

let iconPath = path.join(__dirname, '/MenuIcon.png')

const mb = menubar({
  browserWindow: {
    width: 450,
    height: 660,
    show: true,
    webPreferences: {
      partition: 'persist:youtubemusic'
    } 
  },
  preloadWindow: true,
  icon: iconPath
});

mb.app.commandLine.appendSwitch(
  'disable-background-occluded-windows',
  'true'
);

mb.on('ready', () => {
  console.log('app is ready');

  const tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      "label": "Open",
      "type": "normal",
      "click": () => mb.app.show()
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