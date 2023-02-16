class db {
    static AddUser(user, key) {
        curentItem = window.localStorage.getItem(key);
        if (curentItem) {
            return false;
        }
        window.localStorage.setItem(key, users);
        return true;
    }
    static getUser(key) {
        return window.localStorage.getItem(key);

    }
    static deleteUser(key) {
        curentItem = window.localStorage.getItem(key);
        if (curentItem) {
            window.localStorage.removeItem('users');
            return true;
        }
        return false;

    }
    static updateUser(key, user) {

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