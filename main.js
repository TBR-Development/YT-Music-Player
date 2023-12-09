import { app, globalShortcut } from "electron";
import { menubar } from "menubar";

import { tray, contextMenu } from "./assets/menus/trayMenu";
import { siteUrl, menuIcon, persistPartition, commandSwitches, readyMessege } from "./assets/configs/cfg";

app.on("ready", () => {

  tray.setContextMenu(contextMenu);

  const mb = menubar({
    tray,
    browserWindow: {
      width: 450,
      height: 660,
      webPreferences: {
        partition: persistPartition,
      },
    },
    preloadWindow: true,
    icon: menuIcon,
  });

  mb.app.commandLine.appendSwitch(commandSwitches);

  mb.on("ready", () => {
    console.log(readyMessege);

    mb.window.loadURL(siteUrl);

    globalShortcut.register("CommandOrControl+X", () => {
      if (process.platform !== "darwin") app.quit();
    });
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
