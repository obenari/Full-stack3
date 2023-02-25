let currentList = new ShoppingList('list1');
let currentUser = new User("heroot12@gmail.com", "herout", "12345", []);
window.localStorage.clear();


window.onbeforeunload = function () {
    if (currentUser instanceof User) {
        let xhttp = new FXMLHttpRequest();
        xhttp.Open('PUT', 'updateUser.json');
        xhttp.send(JSON.stringify(currentUser));
    }

}


document.querySelector('#push').onclick = function () {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert("Please Enter a Task")
    } else {
        let productNameInput = document.querySelector('.new-task-input');
        let name = productNameInput.value;
        productNameInput.value = '';
        let count = document.querySelector('.new-task-count').value;

        let res = currentList.products.filter(p => p.name === name);
        if (res.length > 0) {
            name += count;
        }
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span class="item-name">
                    ${name}
                </span>
                <span class="item-count">
                    ${count}
                </span>
                <button class="delete" id="${name}">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;


        let newProduct = new Product(name, count);
        currentList.AddProduct(newProduct);

        var current_tasks = document.querySelectorAll(".delete");
        for (var i = 0; i < current_tasks.length; i++) {
            current_tasks[i].onclick = function () {
                currentList.deleteProduct(this.id);
                this.parentNode.remove();
            }
        }
    }
}
function onlyForDebug() {
    let xhttp = new FXMLHttpRequest();
    xhttp.Open('GET', `getUser/heroot12@gmail.com.json`);
    function loginValidation() {
        let userJson = xhttp.responseText;
        if(userJson){
            let user = JSON.parse(userJson);
            loadListPage(user);
        }
        
    }
    xhttp.OnLoad(loginValidation);
    xhttp.send();
}
onlyForDebug();
function loadListPage(user) {
    currentUser = new User();
    currentUser = Object.assign(currentUser, user);
    currentUser.lists = [];
    for (let l of user.lists) {
        let newList = new ShoppingList();
        newList = Object.assign(newList, l);
        currentUser.addList(newList);
        newList.products = [];
        for (let p of l.products) {
            let newProduct = new Product();
            newProduct = Object.assign(newProduct, p);
            newList.AddProduct(newProduct);
        }
    }
    if (currentUser.lists.length > 0) {
        selectList(currentUser.lists[0].name);
    }
    for (let l of currentUser.lists) {
        let li = document.createElement('li');
        li.addEventListener("click", function () { selectList(l.name); });
        li.innerHTML = l.name + `<i class="fa-solid fa-x" onclick="deleteList('${l.name}')"></i>`;
        document.getElementById("list-name-bar").appendChild(li);
    }
    //currentList = currentUser.lists[0];


}
function addNewList() {
    document.querySelector(".container").classList.remove('hide');
    let newList = new ShoppingList();
    newList.name = new Date().toLocaleString();
    currentList = newList;
    currentUser.addList(newList);
    document.getElementById('tasks').innerHTML = '';
    document.getElementById('list-name').value = newList.name;
    let li = document.createElement('li');
    li.addEventListener("click", function () { selectList(newList.name); });
    li.innerHTML = newList.name + `<i class="fa-solid fa-x" onclick="deleteList('${newList.name}')"></i>`;
    let a=document.querySelectorAll("list-name-bar");
    
    
    document.getElementById("list-name-bar").appendChild(li);

}
function deleteList(name) {
    currentUser.deleteList(name);
    let nameList = document.getElementById('list-name-bar').querySelectorAll("li");
    for (let i = 0; i < nameList.length; i++) {
        if (nameList[i].textContent === name) {
            document.getElementById('list-name-bar').removeChild(nameList[i]);
            break;
        }
    }
    if (currentList.name === name) {
        if (currentUser.lists.length === 0) {
            document.querySelector(".container").classList.add('hide');
        } else {
            selectList(currentUser.lists[0].name);
        }
    }

}

function changeListName() {

    let listNameBar = document.getElementById("list-name-bar");
    let newName = document.getElementById('list-name').value;

    for (let li of listNameBar.childNodes) {
        if (li.textContent === currentList.name)
            li.innerHTML = newName + `<i class="fa-solid fa-x" onclick="deleteList('${newName}')"></i>`;
    }
    currentList.name = newName;
    console.log(newName);
}

function selectList(name) {
    document.querySelector(".container").classList.remove('hide');
    document.querySelector('#tasks').innerHTML = '';//remove the previous products
    currentList = currentUser.lists.find(x => x.name === name);
    document.getElementById("list-name").value = name;
    
    let listNameBar = document.getElementById("list-name-bar");
    

    
    for (let p of currentList.products) {
        addProductToWindow(p.name, p.count);
    }
    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
        current_tasks[i].onclick = function () {
            currentList.deleteProduct(this.id);
            this.parentNode.remove();
        }
    }
}
function addProductToWindow(name, count) {
    document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span class="item-name">${name}</span>
                <span class="item-count"> ${count} </span>
                <button class="delete" id="${name}">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;
}
