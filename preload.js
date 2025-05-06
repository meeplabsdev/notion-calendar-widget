/**
 * The preload script runs before `index.html` is loaded
 * in the renderer. It has access to web APIs as well as
 * Electron's renderer process modules and some polyfilled
 * Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

const os = require("os");
const fs = require("fs");
const path = require("path");

function refreshTheme(style) {
  var css = `
#main > div > div:nth-child(2),
#main > div > div > div > div > div:nth-child(2) > div,
#main > div > div > div > div > div > div > button {
  display: none;
}

#main > div > div > div > div:nth-child(2) {
  margin-top: -32px;
}

#main > div > div > div > div > div:nth-child(2) {
  height: fit-content;
}


#main > div > div:nth-child(1) {
  right: 0px;
}`;

  var cpath = path.resolve(os.homedir(), '.cache/wal/colors.css');
  if (fs.existsSync(cpath)) {
    let colours = fs.readFileSync(cpath);
    css = colours + "\n\n" + css + "\n\n" + fs.readFileSync(path.join(__dirname, "style.css"));
  }

  style.textContent = css;
}

window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement("style");
  document.head.appendChild(style);

  // Poll for theme updates
  setInterval(() => { refreshTheme(style); }, 1000);
  refreshTheme(style);
})
