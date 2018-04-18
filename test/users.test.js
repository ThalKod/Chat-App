const expect = require("expect");
const {Users} = require("../utils/users");



describe("Users", ()=>{
    var users;

    beforeEach(()=>{
        users = new Users();
        users.usersArray = [{
            id: 1,
            name: "lolo",
            room: "nana"
        },{
            id: 2,
            name: "Mike",
            room: "Nodejs"
        },{
            id: 3,
            name: "Fanl",
            room: "java"
        }]
    });

    it("should add new user", ()=>{
        var users = new Users();
        var user = {
            id: "232",
            name: "lol",
            room: "Milo"
        };
        var resUser = users.addUser(user.id,user.name,user.room);

        expect(users.usersArray).toEqual([user]);
    });

    it("should return names for coresponding room", ()=>{
        var userList =  users.getUserList("java");

        expect(userList).toEqual(["Fanl"]);
    });

    it("should get a user by an ID", ()=>{
        var id = 2;
        var resUser = users.getUser(id);

        expect(resUser).toEqual({id: 2,name: "Mike",room: "Nodejs"});
    });

    it("should remove a user by his ID", ()=>{
        var id =2;
        var resUser = users.removeUser(id);

        expect(resUser).toEqual({id: 2,name: "Mike",room: "Nodejs"});
        expect(users.usersArray.length).toBe(2);
    });
    
});