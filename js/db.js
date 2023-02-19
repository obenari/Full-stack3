class db {
    static AddUser(key, user) {
        let curentItem = window.localStorage.getItem(key);
        if (curentItem) {
            return false;
        }
        window.localStorage.setItem(key, user);
        return true;
    }
    static getUser(key) {
        return window.localStorage.getItem(key);

    }
    static deleteUser(key) {
        let curentItem = window.localStorage.getItem(key);
        if (curentItem) {
            window.localStorage.removeItem(key);
            return true;
        }
        return false;

    }
    static updateUser(key, user) {

        window.localStorage.setItem(key, user);
    }

    static GetAllUser() {
        let allUser = [];
        for (const key in localStorage) {
            if (key != "currentUser") {
                allUser.push(window.localStorage.getItem(key));
            }
        }
        return allUser;
    }


}