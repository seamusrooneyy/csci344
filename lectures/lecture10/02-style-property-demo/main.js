const changeColor = (selector, color) =>{
    const el = document.querySelector(selector);
    if(el.style.backgroundColor === color){
        el.style.backgroundColor = "white";
    }
    else{
        el.style.backgroundColor = color;
    }
}
function reset(){
    document.querySelector("#section1").style.backgroundColor = "white";
    document.querySelector("#section2").style.backgroundColor = "white";
    document.querySelector("#section3").style.backgroundColor = "white";
    document.querySelector("#section4").style.backgroundColor = "white";
}



// const makeRed = () => {
//     // your code here...
//     console.log('Change background to red');
//     document.querySelector('#section1').style.backgroundColor = 'red';
// };

// const makeBlue = () => {
//     // your code here...
//     console.log('Change background to blue');
//     document.querySelector('#section2').style.backgroundColor = 'blue';
// };

// const makePink = () => {
//     // your code here...
//     console.log('Change background to pink');
//     document.querySelector('#section3').style.backgroundColor = 'pink';
// };

// const makeOrange = () => {
//     // your code here...
//     console.log('Change background to orange');
//     document.querySelector('#section4').style.backgroundColor = 'orange';
// };

