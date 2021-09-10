
const express = require("express");
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
const port = 5500;
const io = new Server(server);
const  bodyParser  = require("body-parser");
const  chatRouter  = require("./chatRoute");

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);


var __dirname = "C:/Users/Fadi/Desktop/Education/MEAN Stack/Chat Portal";
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const connection = require("./dbConnection");
const Message = require("./messageSchema");


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("disconnect", () => {
        console.log("Disconnected")
    });

    socket.on("chat message", function (msg) {
        console.log("message: " + msg);
        //broadcast message to everyone in port:5000 except yourself.
        socket.broadcast.emit("received", { message: msg});

        connection.then(db => {
            console.log("connected to db successfully :)");
    
            let message = new Message({ message: msg, sender: "Anonymous" });
            message.save();
        })

    });



});



server.listen(port, () => {
    console.log("connected to port: " + port)
});