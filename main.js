// Modules to control application life and create native browser window
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
  // win.openDevTools();

  // First URL
  win.loadURL("https://music.youtube.com/");

  // mb.on('after-create-window', () => {});

  // Once dom-ready
  win.webContents.once("dom-ready", () => {
    setInterval(() => {
      // Artist Name
      const artistName = win.webContents
        .executeJavaScript(
          `document.querySelector('.player-controls .artist-name').innerText`
        )
        .then((result) => result.trim());

      // Track Name
      const trackName = win.webContents
        .executeJavaScript(
          `document.querySelector('.player-controls .track-name').innerText`
        )
        .then((result) => result.trim());

      // Player State
      const playerState = win.webContents
        .executeJavaScript(
          `document.querySelector('.player-controls .play-pause-btn').getAttribute('title')`
        )
        .then((result) => result.trim())
        .then((state) => (state == "Play" ? "⏸︎" : ""));

      Promise.all([artistName, trackName, playerState])
        .then(([artistName, trackName, playerState]) => {
          // Set Menubar Title
          mb.tray.setTitle(`${playerState} ${artistName} - ${trackName}`);
        })
        .catch(() => { });
    }, 1000);
  });

  //  Quit when the keyboard command CommandOrControl+X is used, except on macOS.
  //  There, it's common for applications and their menu bar to stay active until the user 
  //  quits explicitly with Cmd + Q.

  globalShortcut.register('CommandOrControl+X', () => {
    if (process.platform !== "darwin") app.quit();
    console.log("app has exited");
  });

});


//  Quit when all windows are closed, except on macOS. There, it's common
//  for applications and their menu bar to stay active until the user quits
//  explicitly with Cmd + Q.

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
