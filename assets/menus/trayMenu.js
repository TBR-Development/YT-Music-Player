import { app, Tray, Menu } from "electron";
import { menuIcon } from '../configs/cfg';

export const tray = new Tray(menuIcon);
export const contextMenu = Menu.buildFromTemplate([
  { label: "Open", type: "normal", click: () => app.show() },
  { label: "Quit", type: "normal", click: () => app.quit() },
]);
