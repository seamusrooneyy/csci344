// your function here
let container = document.querySelector('body');
function addDark(){
    if(container.className == "dark-mode"){
        container.className = "";
    }
    else{
        container.className = "dark-mode";
    }
}