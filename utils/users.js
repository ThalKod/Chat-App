
class Users {
    constructor(){
        this.usersArray = [];
    }

    addUser(id, name, room){
        var user = {
            id,
            name,
            room
        }
        this.usersArray.push(user);
        return user;
    }

    removeUser(id){
        var user = this.getUser(id);
        
        if(user){
            this.usersArray = this.usersArray.filter((user)=>{
                return user.id !== id;
            });
        }

        return user; 
    }

    getUser(id){
        for(var i = 0; i < this.usersArray.length; i++){
            if(this.usersArray[i].id === id){
                return this.usersArray[i];
            }
        }
    }

    getUserList(room){
        // var users = this.usersArray.filter((user) =>{
        //     return user.room === room;
        // });

        var users = this.usersArray.filter((user) => user.room === room);
        var nameArrays = users.map((user) => user.name);
        return nameArrays;
    }
}

module.exports = {Users}