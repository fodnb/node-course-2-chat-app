var socket = io();

socket.on('connect', function(){
	console.log('connected to server');
	socket.emit('createMessage', {
		from: 'Dan',
		text: 'index.js - text new message'
	});
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});


socket.on('newMessage', function(message){
	console.log('new message', message);
})