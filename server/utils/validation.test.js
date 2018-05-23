const expect = require('expect');

const {isRealString} = require('./validation.js');
// import isRealString

//should reject nonstring values
//should reject strings with only spaces
//should allow strings with non space charachters


describe('isRealString', ()=>{ 

	it('should reject nonstring values', ()=> {
		var res = isRealString(98)
		expect(res).toBe(false);
	});


	it('should reject strings with only spaces', ()=> {
		var res = isRealString("   ");
		expect(res).toBe(false);
	});

	it('allow strings with non space charachters', ()=> {
		var res = isRealString(" ddd  ");
		expect(res).toBe(true);
	});


});