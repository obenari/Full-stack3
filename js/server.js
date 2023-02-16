class server {
    static AddUser(userJson) {
        let curentItem = JSON.parse(userJson);

        succ = db.AddUser(curentItem.email, userJson)
        return succ;
    }
    static getUser(key) {
       
        return db.getUser(key);

    }
    static deleteUser(key) {
        let succ = db.deleteUser(key);
        return succ;

    }
    static updateUser(userJson) {

        window.localStorage.setItem(key, user);
    }

    static GetAllUser() {
        allUser = [];
        for (const key in localStorage) {
            if (key != "currentUser") {
                allUser.push(window.localStorage.getItem(key));
            }
        }
        return allUser;
    }




}
