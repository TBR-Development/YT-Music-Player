// Modules to control application life and create native browser window
const { app, globalShortcut } = require("electron");
const path = require("path");
const { menubar } = require("menubar");

const mb = menubar({
  browserWindow: { width: 450, height: 660 },
  preloadWindow: true,
  icon: path.join(__dirname, "/MenuIcon.png"),
  webPreferences: {
    partition: "persist:youtubemusic",
  },
});

mb.app.commandLine.appendSwitch(
  "disable-backgrounding-occluded-windows",
  "true"
);

mb.on("ready", () => {
  console.log("app is ready");

  win = mb.window;
  // win.openDevTools();

  // First URL
  win.loadURL("https://music.youtube.com/");

  // mb.on('after-create-window', () => {};

  // Once dom-ready
  // win.webContents.once("dom-ready", () => {});

  globalShortcut.register("CommandOrControl+X", () => {
    if (process.platform !== "darwin") {
      app.removeAllListeners();
      app.quit();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.removeAllListeners();
    app.quit();
  }
});
