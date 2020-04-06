"use strict";

const { BrowserWindow } = require("electron");

// default window settings
const defaultProps = {
  width: 500,
  height: 800,
  show: false,
  webPreferences: {
    nodeIntegration: true,
  },
};

class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }) {
    // call new browser window with thse props
    super({ ...defaultProps, ...windowSettings });

    // load html and open dev tools
    this.loadFile(file);
    this.webContents.openDevTools();

    // show window when ready, to prevent flickering
    this.once("ready-to-show", () => {
      this.show();
    });
  }
}

module.exports = Window;
