const WebSocket = require('ws');
const express = require('express');
const { sendFile } = require('express/lib/response');
const app = express()
let Script = []
let Send = []
app.use(express.json());
app.post('/Execute', function (req, res) {
  let IP = req.ip.replace("::ffff:","");
  Script[IP] =   req.body.Script
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
const wss = new WebSocket.Server({ port: 123 });

wss.on('connection', function connection(ws, req) {
  let IP = req.connection.remoteAddress.replace("::ffff:","")
  Send[IP] = ws
  // Send[IP].send(IP)
  console.log('New WebSocket connection established.',IP);
  ws.on('close', function close() {
    console.log('WebSocket connection closed.');
  });
});

app.listen(4444)