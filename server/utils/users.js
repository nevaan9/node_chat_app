// A class to denote users in a chat room
class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        const aUser = {id, name, room};
        this.users.push(aUser);
        return aUser;
    }

    // Get user list according to room
    getUserList (room) {
        // Get users in a particular room
        const users = this.users.filter((aUser) => aUser.room === room);
        // Cconvert above array of objects to array of strings
        return users.map((aUserObj) => aUserObj.name);

    }

    getUser (id) {
        return this.users.filter((aUser) => aUser.id === id)[0];
    }

    removeUser (id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((aUser) => aUser.id !== id);
        }
        return user;
    }
}

module.exports = {Users};
