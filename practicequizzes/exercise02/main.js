const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight; 
    
function setup() {
    createCanvas(canvasWidth, canvasHeight);

    // function invocations goes here:
    drawMonster(100, 100, 150, '#0bc9cd', false);
    drawMonster(300, 200, 75, '#8093f1', true);
    drawMonster(100, 325, 100, '#8093f1', false);
    drawMonster(250, 375, 125, '#7fb285', true);
    drawMonster(550, 200, 250, '#7fb285', false);
    drawGrid(canvasWidth, canvasHeight);
}


// function definition goes here:

function drawMonster(x,y,size,color,isSuprised){
    rectMode(CENTER);
    fill(color);
    rect(x,y,size,size);
    fill('white');
    rect(x-size/5,y-size/5,size/4,size/4);
    rect(x+size/5,y-size/5,size/4,size/4);
    fill('black')
    rect(x-size/5,y-size/7,size/8,size/8);
    rect(x+size/5,y-size/7,size/8,size/8);
    
    if(isSuprised == true){
        rect(x,y+size/5,size/5,size/6)
    }
    else{
        rect(x,y+size/5,size*.6,size/6)
    }
}
