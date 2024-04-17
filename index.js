const express = require('express');
const WebSocket = require('ws');

const app = express();
const { sendFile } = require('express/lib/response');


let Script = []
let Check = []
let Send = []
app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.post('/Execute', function (req, res) {
  let IP = req.ip.replace("::ffff:","");
  Script[IP] = req.body.Script
  Check[IP] = req.body.Check
  try {
    // Send[IP].send('loadstring(game:HttpGet("https://raw.githubusercontent.com/Tamim468/Valyseonly/main/synsupport.lua"))()\n'+ req.body.Script)
    Send[IP].send(req.body.Script)
  } catch (error) {
    // console.log("ERR",error)
  }
  res.send("OK")
})
app.get("/",function (req, res) {
  res.sendFile('Editor.html', { root: '.' })
})
app.get("/getscript",function (req, res) {
  let IP = req.ip.replace("::ffff:","");
  res.send(Script[IP] || "-- Made By Besty | discord.gg/paHTqEMjSy")
})
app.get("/getscript1",function (req, res) {
  let IP = req.ip.replace("::ffff:","");
  res.send(Check[IP] || "NoCheck")
})
app.get("/ace/mode-lua.js",function (req, res) {
  res.sendFile('/ace/mode-lua.js', { root: '.' })
})
app.get("/ace/ext-language_tools.js",function (req, res) {
  res.sendFile('/ace/ext-language_tools.js', { root: '.' })
})
app.get("/ace/ace.js",function (req, res) {
  res.sendFile('/ace/ace.js', { root: '.' })
})
app.get("/ace/theme-tomorrow_night_eighties.js",function (req, res) {
  res.sendFile('/ace/theme-tomorrow_night_eighties.js', { root: '.' })
})
app.get("/ace/worker-lua.js",function (req, res) {
  res.sendFile('/ace/worker-lua.js', { root: '.' })
})

const wsServer = new WebSocket.Server({ noServer: true });

wsServer.on('connection', function connection(ws, req) {
  let IP = req.connection.remoteAddress.replace("::ffff:","")
  Send[IP] = ws
  // Send[IP].send(IP)
  console.log('New WebSocket connection established.',IP);
  ws.on('close', function close() {
    console.log('WebSocket connection closed.');
  });
});

const port = 30;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});
