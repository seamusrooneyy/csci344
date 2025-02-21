// Your code here.
function toggleMenu(){
    console.log("menu toggled");
    const button = document.querySelector("button");
    const list = document.querySelector("ul");
    button.classList.toggle("active");
    list.classList.toggle("active");
}