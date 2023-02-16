var loginTemplate = document.getElementById("log-in-template");
var clon = loginTemplate.content.cloneNode(true);
document.body.appendChild(clon);

function switchTemplate(oldNode1, newNode1) {
    var oldNode = document.getElementById(oldNode1);
    document.body.removeChild(oldNode)

    var newNode = document.getElementById(newNode1);
    var clon = newNode.content.cloneNode(true);
    document.body.appendChild(clon);
    history.replaceState({}, oldNode1, '#'+oldNode1);
    history.pushState({}, newNode1, `#${newNode1}`);

}

function poppin(ev){
    console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#' ,'');
    hash = hash.replace('page' ,'template');
    
    var oldNode=document.querySelector('.page')//.classList.remove('active');
    document.body.removeChild(oldNode)

    var newNode=document.getElementById(hash)//.classList.add('active');
    var clon = newNode.content.cloneNode(true);
    document.body.appendChild(clon);

}

window.addEventListener('popstate', poppin);
