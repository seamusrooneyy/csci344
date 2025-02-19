let canvasWidth = document.documentElement.clientWidth - 10;
let canvasHeight = document.documentElement.clientHeight - 10;

// in p5.js, the function runs on page load:
function setup() {
    rectMode(CENTER);
    createCanvas(canvasWidth, canvasHeight);
}

// in p5.js, special event handler that listens for click events:
function mouseClicked() {
    // in p5.js, mouseX and mouseY are
    // built-in global variabls that track the
    // current position of your mouse.
    // let r = Math.random();
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 100);
    // if(r>=.5){
    //     circle(mouseX, mouseY, 100);  
    // }
    // if(r>=.5){
    //     rect(mouseX, mouseY, 100, 100)
    // }
    // circle(mouseX, mouseY, 500);
    // circle(mouseX, mouseY, 400);
 bullseye();
}

// in p5.js, special event handler that listens for drag events:
function mouseDragged() {
    // let r = Math.random();
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // if(r>=.5){
    //     circle(mouseX, mouseY, r*100);  
    // }
    // if(r<.5){
    //     rect(mouseX, mouseY, r*100, r*100)
    // }
    bullseye();
}

/**
 * Challenges:
 * 1. As you click / drag, can the circles have different colors and sizes? 
 *      * Try using the Math.random() function
 * 2. Can you make the click / drag sometimes make circles and sometimes make rectangles
 *      * Sample rectangle function invocation: rect(mouseX, mouseY, 100, 100);
 * 3. Can you make each click create a bulleye of different colors?
 *      * Hint: make sure you draw the bigger circles before you draw the smaller circles.
 */

function bullseye(){
    let i = 300
    while(i>0){
        fill(255*Math.random(),255*Math.random(),255*Math.random());
        circle(mouseX,mouseY, i)
        i = i-10
    }
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 300);
    // fill(55*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 250);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 200);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 150);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 100);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 50);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 25);
    // fill(255*Math.random(),255*Math.random(),255*Math.random());
    // circle(mouseX, mouseY, 10);
}