
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


socket.on('newLocationMessage', function(message){

	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location.<a/>')
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$("#messages").append(li);

});
		
$("#message-form").on('submit', function(e){
	e.preventDefault();
	var messageTextBox = $('[name=message]');

		socket.emit('createMessage', {
		from: "user",
		text: messageTextBox.val()
	}, function(){
		messageTextBox.val('');
});




});

var locationButton = $("#send-location");

locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert("Geolocation not supported by your browser.");
	}

	locationButton.attr('disabled', 'disabled').text('Sending location...');	

	navigator.geolocation.getCurrentPosition(function(position){

		console.log("geopostions", position);

		socket.emit('createLocationMessage', {
			lat: position.coords.latitude,
			lon: position.coords.longitude
		});

		locationButton.removeAttr('disabled').text("Send location");

	}, function(){
		locationButton.removeAttr('disabled');	
		alert('unable to fetch location');
	});

});

