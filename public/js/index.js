
var socket = io();

socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});


socket.on('newMessage', function(message){
	var li = $('<li></li>');

	li.text(`${message.from}: ${message.text}`);

	$("#messages").append(li);


	console.log('new message', message);
});


		
$("#message-form").on('submit', function(e){
	e.preventDefault();
	var myInput = $('[name=message]').val();

		socket.emit('createMessage', {
		from: "user",
		text: myInput
	}, function(){

// need to add callback function
});

$("#message").val("");


});
