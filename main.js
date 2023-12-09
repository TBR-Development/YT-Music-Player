import { app, globalShortcut, Tray, Menu } from "electron";
import { menubar } from "menubar";

import { tray, contextMenu } from "./assets/menus/trayMenu";

app.on("ready", () => {
  const iconPath = "./assets/images/MenuIcon.png";

  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray,
    browserWindow: {
      width: 450,
      height: 660,
      webPreferences: {
        partition: "persist:youtubemusic",
      },
    },
    preloadWindow: true,
    icon: iconPath,
  });

  mb.app.commandLine.appendSwitch(
    "disable-background-occluded-windows",
    "true"
  );

  mb.on("ready", () => {
    console.log("YouTube Music app is ready.");

    mb.window.loadURL("https://music.youtube.com/");

    globalShortcut.register("CommandOrControl+X", () => {
      if (process.platform !== "darwin") app.quit();
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
