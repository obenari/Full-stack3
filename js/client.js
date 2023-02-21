let currentList=new ShoppingList('list1');
let curretUser=new User("heroot12@gmail.com","herout","12345",[]);

window.onbeforeunload = function () {
    if (curretUser instanceof User) {
        let xhttp= new FXMLHttpRequest();
        xhttp.Open('PUT', 'updateUser.json');
        xhttp.send(JSON.stringify(curretUser));
    }
}


document.querySelector('#push').onclick = function () {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert("Please Enter a Task")
    }
    else {
        let name = document.querySelector('.new-task-input').value;
        let count = document.querySelector('.new-task-count').value;
        let res=currentList.products.filter(p=>p.name===name);
        if(res.length>0){
            name+=count;
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
        // function removeProduct(e) {
        //     e.target.parentNode.remove();
        //     currentList.deleteProduct(name);
        // }

        //document.querySelectorAll('.delete:nth-last-of-type(1)')[0].addEventListener("click", removeProduct);

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                currentList.deleteProduct(this.id);
                this.parentNode.remove();

            }
        }




    }
}

// function removeProduct(name, node) {
//     this.parentNode.remove();
//     currentList.deleteProduct(name);
// }

function loadListPage(user) {
    let currentUser = new User();
    currentUser = Object.assign(currentUser, user);
    if (currentUser.lists.length > 0)
        currentList = currentUser.lists[0];


}
function addNewList() {

    let newList = new ShoppingList();
    newList.name = new Date().toLocaleString();
    currentList = newList;
    curretUser.addList(newList);
    document.getElementById('tasks').innerHTML = '';
    document.getElementById('list-name').value = newList.name;
    let li = document.createElement('li');
    li.innerHTML = newList.name+`<i class="fa-solid fa-x" onclick="deleteList('${newList.name}')"></i>`;
    document.getElementById("list-name-bar").appendChild(li);

}
function deleteList(name){
    curretUser.deleteList(name);
   let nameList= document.getElementById('list-name-bar').querySelectorAll("li");
   for(let i=0;i<nameList.length;i++ ){
    if(nameList[i].textContent===name){
        document.getElementById('list-name-bar').removeChild(nameList[i]);
        
    }
   }
   
   
}

function changeListName() {

    let listNameBar = document.getElementById("list-name-bar");
    let newName = document.getElementById('list-name').value;

    for (let li of listNameBar.childNodes) {
        if (li.textContent === currentList.name)
            li.innerHTML = newName;
    }
    currentList.name = newName;
    console.log(newName);
}