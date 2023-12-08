const { app, globalShortcut } = require("electron");
const path = require("path");
const { menubar } = require("menubar");

const mb = menubar({
  browserWindow: { width: 450, height: 660 },
  preloadWindow: true,
  icon: path.join(__dirname, "/MenuIcon.png"),
  webPreferences: {
    partition: "persist:YT-Music-Player",
  },
});


mb.app.commandLine.appendSwitch(
  "disable-backgrounding-occluded-windows",
  "true"
);


mb.on("ready", () => {
  console.log("app is ready");

  win = mb.window;

  win.loadURL("https://music.youtube.com/");

  // mb.on('after-create-window', () => {});
  // win.webContents.once("dom-ready", () => {});

  globalShortcut.register('CommandOrControl+X', () => {
    if (process.platform !== "darwin") {
      mb.app.removeAllListeners();
      mb.tray.removeAllListeners();
      mb.window.removeAllListeners();
      mb.app.quit();
      console.log("app has exited")
    };

    console.log("app has exited");
  });

});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
