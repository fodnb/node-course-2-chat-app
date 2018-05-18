var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
	it('should generate correct message object', ()=>{

		var from = "Dan";
		var text = "Hi";
		var message = generateMessage(from, text);
			expect(message.createdAt).toBeA('number');
			expect(message).toInclude({from, text});
	
	});
});

describe('generateLocationMessage', ()=>{

	it('should generate correct location object', ()=>{

	var from = "Dan";
	var lat = 35;
	var lon = 35;
	var url = 'https://www.google.com/maps?q=35,35'

	var locationMessage = generateLocationMessage(from, lat, lon);

	expect(locationMessage.createdAt).toBeA('number');
	expect(locationMessage).toInclude({from, url});
	// expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
	expect(locationMessage.from).toBe(from);

	});

});