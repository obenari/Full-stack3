class User {
    constructor(email, name, password, lists) {
        this.email = email
        this.name = name;
        this.password = password;
        this.lists = lists;
    }

    // get email() {
    //     return this._email;
    // }
    // set email(x) {
    //     this._email = x;
    // }
    // get name() {
    //     return this._name;
    // }
    // set name(x) {
    //     this._name = x;
    // }
    // get password() {
    //     return this._password;
    // }
    // set password(x) {
    //     this._password = x;
    // }
    // get lists() {
    //     return this._lists;
    // }
    // set lists(x) {
    //     this._lists = x;
    // }
    addList(list) {
        this.lists.push(list)

    }
    deleteList(name) {
        let list = this.lists.filter(x => x.name === name)[0];
        let index = this.lists.indexOf(list);
        if (index > -1) { // only splice array when item is found
            this.lists.splice(index, 1); // 2nd parameter means remove one item only


        }
    }

}