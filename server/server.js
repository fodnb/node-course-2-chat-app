const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var server = http.createServer(app);

const port = process.env.PORT || 3000;
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, "../public");
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

	io.on('connection', (socket)=>{

	socket.on('join', (params, callback) => {

		if( !isRealString(params.name) || !isRealString(params.room) ){
			return callback("Name and room name are required");
		} 

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		
		io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
		// io.to(params.room).emit()
		//socket.leave(params.room);
		//io.emit  -> io.to("the room").emit
		//socket.broadcast.emit -> socket.broadcast.to("the room").emit
		//socket.emit -> nothing to change here

		socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));



		callback();
	});

	socket.on('createMessage', (message, callback)=>{
		var user = users.getUser(socket.id);

		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));		
		}

		callback();	
	});


	socket.on('createLocationMessage', (coords)=>{
		var user = users.getUser(socket.id);

		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lon));
		}
	});


	socket.on('disconnect', ()=>{
		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit("updateUsersList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage('Admin', `${user.name} has left.`) );
		}

		console.log('disconnected client');
	});


});


server.listen(port, () => {
	console.log("App listening on port " + port);
});