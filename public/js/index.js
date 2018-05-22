var socket = io();

function scrollToBottom () {
	//Selectors
	var messages = $("#messages");
	var newMessage = messages.children('li:last-child');

	//Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
		console.log('should scroll');
	}
};


socket.on('connect', function(){
	console.log('connected to server');
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});


socket.on('newMessage', function(message){
	var template = $('#message-template').html();
	var html = 	Mustache.render(template, {
		text: message.text,
		createdAt: moment(message.createdAt).format('h:mm a'),
		from: message.from
	});
	$("#messages").append(html)
	scrollToBottom();
	// console.log('new message', message);
});


socket.on('newLocationMessage', function(message){
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime,
		url: message.url
	});

	$("#messages").append(html);
	scrollToBottom();
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

