const { error } = require('console');
const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron');
var fs = require('fs');

const os = require("os");
const userHomeDir = os.homedir();
const file_path = userHomeDir + "/Desktop/score.json"
var area = ["North East", "Bihar ", "Punjab & Haryana", "Rajasthan", "Ambala & Panipat", "Delhi", "North Bengal ", "South Bengal ", "Odisha ", "DT Kolkata ", "Ranchi ", "Indore ", "Jabalpur ", "North hills", "Western UP", "Central UP", "Eastern UP", "Ahmedabad", "Surat", "Ambala & Patiala", "Vijayawada", "Tirupathi", "Hyderabad ", "North Karnataka", "BANGALORE", "SOUTH KARNATAKA", "Kerala", "Mumbai 1", "Mumbai 2", "Kolhapur", "Nagpur", "Pune", "Aurangabad", "Madurai", "Trichy", "Chennai", "Coimbatore", "POC West", "POC South", "POC North", "POC East"];


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false,
      enableRemoteModule:true,
    }
  })

  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=>{
    createWindow();

    if(!fs.existsSync(file_path))
    {
        console.log("file does not exist . creating new one");

        var scores = {};
        for(var i=0;i<area.length;i++)
        {
           scores[area[i]] = 0;
        }

        write_file(JSON.stringify(scores));
        console.log(JSON.stringify(scores));
        
    }else{

    }
})

ipcMain.on('update_score',(event,arg)=>{

    fs.readFile(file_path, 'utf-8', (err, data) => {
        if(err){
          console.log(file_path)
            console.log("An error ocurred reading the file :" + err.message);
            return;
        }

        // Change how to handle the file content
      
        var scores = JSON.parse(data);
        scores[arg.area] = scores[arg.area] + arg.point;
        write_file(JSON.stringify(scores));
        console.log(JSON.stringify(scores));
        event.sender.send('on_score_update', JSON.stringify(scores));
  });

});


function write_file(data)
{
    fs.writeFile(file_path,data,(err)=>{
        if(err)
           throw error("error while writing file");
        else
           console.log("file written succussfuly");
    })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})