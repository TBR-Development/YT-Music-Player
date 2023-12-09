import { app, Tray, Menu } from "electron";

const iconPath = "../images/MenuIcon.png";

export const tray = new Tray(iconPath);
export const contextMenu = Menu.buildFromTemplate([
  { label: "Open", type: "normal", click: () => app.show() },
  { label: "Quit", type: "normal", click: () => app.quit() },
]);
