class User {
    constructor(email, name,password,lists) {
        this._email = email
        this._name=name;
        this._password=password;
        this._lists=lists;
    }
    get email() {
        return this._email;
    }
    set email(x) {
        this._email = x;
    }
    get name() {
        return this._name;
    }
    set name(x) {
        this._name = x;
    }
    get password() {
        return this._password;
    }
    set password(x) {
        this._password = x;
    }
    get lists() {
        return this._lists;
    }
    set lists(x) {
        this._lists = x;
    }
    addList(list,name){
        this.lists.push()

    }
}