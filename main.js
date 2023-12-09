import { app, globalShortcut } from "electron";
import { menubar } from "menubar";

import { tray, contextMenu } from "./assets/menus/trayMenu";
import { cfg } from "./config";

app.on("ready", () => {
  const iconPath = cfg.MenuIcon;

  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray,
    browserWindow: {
      width: 450,
      height: 660,
      webPreferences: {
        partition: cfg.Partition,
      },
    },
    preloadWindow: true,
    icon: iconPath,
  });

  mb.app.commandLine.appendSwitch(cfg.Switches);

  mb.on("ready", () => {
    console.log(cfg.ReadyMessage);

    mb.window.loadURL(cfg.SiteUrl);

    globalShortcut.register("CommandOrControl+X", () => {
      if (process.platform !== "darwin") app.quit();
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
