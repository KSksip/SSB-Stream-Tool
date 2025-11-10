import { app, BrowserWindow } from 'electron/main'
/* const path = require('node:path')
 */
import * as path from 'path'
import { fileURLToPath } from 'url';
import * as child_process from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

/* const subprocess = child_process.spawn('node', ['./.output/server/index.mjs']);*/

 const subprocess = child_process.spawn('npm', ['run', 'dev']);

console.log(subprocess)
var scriptOutput = "";
subprocess.stdout.setEncoding('utf8');
subprocess.stdout.on('data', function(data) {
    //Here is where the output goes

    console.log('stdout: ' + data);

    data=data.toString();
    scriptOutput+=data;
});

subprocess.stderr.setEncoding('utf8');
subprocess.stderr.on('data', function(data) {
    //Here is where the error output goes

    console.log('stderr: ' + data);

    data=data.toString();
    scriptOutput+=data;
});

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    /* webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    } */
  })

  win.loadURL('http://localhost:3000/')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    subprocess.kill()
    app.quit()
  }
})