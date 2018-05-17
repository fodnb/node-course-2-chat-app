const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const {generateMessage} = require('./utils/message');


var server = http.createServer(app);

const port = process.env.PORT || 3000;
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, "../public");
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{


	socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

	socket.on('createMessage', (message)=>{
		console.log('create message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
	});

	socket.emit('newMessage', {
		from: "una",
		text: "love you",
		createdAt: 123123
	});

	socket.on('disconnect', ()=>{
		console.log('disconnected client');
	});

});


server.listen(port, () => {
	console.log("App listening on port " + port);
});