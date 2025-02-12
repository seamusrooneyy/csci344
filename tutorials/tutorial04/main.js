let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
    createCanvas(canvasWidth, canvasHeight);


    drawNShapesDirectionFlexible(30, 30, 335, 0, "square", "column");
    drawNShapesDirectionFlexible(4, 100, 120, 200, "circle", "row");
    drawNShapesDirectionFlexible(8, 50, 725, 425, "circle", "row");
    // drawNShapesFlexible(30, 30, 335, 0, "square");
    // drawNShapesFlexible(4, 100, 120, 200, "circle");
    // drawNShapesFlexible(8, 50, 725, 25, "square");
    // drawNCirclesFlexible(30, 25, 400, 0);
    // drawNCirclesFlexible(4, 100, 100, 200);
    // drawNCirclesFlexible(8, 50, 700, 100);
    // invoke any drawing functions inside of setup.
    // functions should all go between "createCanvas()" and "drawGrid()"
    // draw5CirclesWhile();
    // draw5CirclesFor();
    // drawNCircles(10);
    // draw5RedSquares();
    drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5CirclesWhile() {
    noFill();
    // fill('red');
    let x = 200;
    let y = 200;
    let d = 50;
    let i = 0;
    while(i<5){
        circle(x, y + 50*i, d+25*i); // centerX, centerY, radius    
        // circle(500,y+50*i,d+5*i)
        i++;
    }

    // circle(100, 250, 50);
    // circle(100, 300, 50);
    // circle(100, 350, 50);
    // circle(100, 400, 50);
}

function drawNCirclesFlexible(n, size, x, y){
    noFill();
    for(let i =0; i < n; i++){
        circle(x, y+(size*i), size);
    }
}

function drawNShapesFlexible(n, size, x, y, shape){
    fill("orange");
    if(shape.toLowerCase() == "circle"){
        for(let i =0; i < n; i++){
            circle(x, y+(size*i), size);
        }
    }
    else{
        for(let i =0; i < n; i++){
            square(x, y+(size*i), size);
        }
    }
}

function drawNShapesDirectionFlexible(n, size, x, y, shape, direction){
    fill("orange");
    if(shape.toLowerCase() == "circle"){
        if(direction.toLowerCase() == "row"){
            for(let i =0; i < n; i++){
                circle(x+(size*i), y, size);
            }
        }
        else for(let i =0; i < n; i++){
            circle(x, y+(size*i), size);
        }
    }
    else{
        if(direction.toLowerCase() == "row"){
            for(let i =0; i < n; i++){
                square(x+(size*i), y, size);
            }
        }
        for(let i =0; i < n; i++){
            square(x, y+(size*i), size);
        }
    }
}


function draw5CirclesFor(){
    noFill()
    let x = 200;
    let y = 200;
    let d = 50;
    let i = 0;
    for(let i = 0; i < 5; i++){
        circle(x, y, d)
        y += 50;
        d += 25;
    }
}

function drawNCircles(n){
        noFill()
        let x = 200;
        let y = 200;
        let d = 50;
        let i = 0;
        for(let i = 0; i < n; i++){
            circle(x, y, d)
            y += 20;
            d += 25;
        }

}


function draw5RedSquares() {
    fill("red");
    square(320, 200, 50); // topLeftX, topLeftY, width
    square(320, 250, 50);
    square(320, 300, 50);
    square(320, 350, 50);
    square(320, 400, 50);
}
