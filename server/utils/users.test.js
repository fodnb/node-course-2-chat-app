const expect = require('expect');
const {Users} = require('./users');


describe("Users", ()=>{
	var users;

	beforeEach(()=>{
		users = new Users();
		users.users = [{id: '1', name: "mike", room: 'Node'},{id: '2', name: "Dan", room: 'React'},{id: '3', name: "Una", room: 'Node'}]
	});

	it('should create new User', ()=> {
		var users = new Users();
		var user = {
			id: 123,
			name: "Dan",
			room: "Room A"
		}

		var resUser = users.addUser(user.id, user.name, user.room);
		expect(users.users).toEqual([user]);
	});
	it('should get a list of users in a room', ()=>{
		var resUsers = users.getUserList("Node");

		expect(resUsers).toEqual(["mike", "Una"]);



	});

	it('should remove a user', ()=>{
		var userId = "1";
		var user = users.removeUser(userId);
		

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', ()=>{
		var userId = '99';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', ()=>{
		var userId = "2";
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
					

	});

	it('should not find a user', ()=>{
		var userId = '99';
		var user = users.getUser(userId);

		expect(user).toNotExist();

	});

});



