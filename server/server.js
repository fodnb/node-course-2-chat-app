const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const {generateMessage, generateLocationMessage} = require('./utils/message');
	

var server = http.createServer(app);

const port = process.env.PORT || 3000;
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, "../public");
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{


	socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined'));

	socket.on('createMessage', (message, callback)=>{
		console.log('create message', message);
		io.emit('newMessage', generateMessage(message.from, message.text));	
		callback('this is from the server');	
	});


	socket.on('createLocationMessage', (coords)=>{

		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lon));

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