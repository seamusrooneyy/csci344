// initializing variables that establish the position of the carousel
// the gap between photos, and the width of the carousel
let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

//creating a function that is called in the html that moves the carousel
function moveCarousel(direction) {
    //initializing the variable 'items' to contain the class item from html
    const items = document.querySelectorAll(".carousel-item");
    // conditionls to decide what to do based on user input
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        //if carousel is already at the length of the array, returns false because there are no more images to show
        if (currentPosition >= items.length - 2) {
            return false;
        }
        //if there are more images to show, the carousel is moved foward
        currentPosition++;
    } else {
        //if the current position is all the way to the left, returns false because there are no earlier photos to show
        if (currentPosition == 0) {
            return false;
        }
        //if the current position is greater than 0, it is decremented to show earlier photos
        currentPosition--;
    }
    //computation in order to offset the carousel by the correct amount of pixels
    const offset = (slideWidth + gap) * currentPosition;

    //for of loop that iterates through the carousel and offsets the photos based off of the amount of pixels determined by the above code
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
