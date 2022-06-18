/*

Template Sketch

*/



//
// SETUP 
// 

// Constants
let W = 100; let H = 100; // Canvas dimensions

// Flags
let playing = false;

// from p5js, called once on load
function setup() {

    // Canvas 
    createCanvas(displayWidth, displayHeight);
    W = width; H = height;
    background(240);

    // Cursor
    cursor('default');

}



//
// LOOP 
// 

// from p5js, called once per frame on loop...
function draw() {

    // Instructions on pause
    if (!playing) {
        // Text
        fill(0)
        stroke(255);
        strokeWeight(3);
        textAlign(CENTER);
        textSize(42);
        textFont('Mono');
        text("Press space to play/pause!", W/2, H/3);

        return;
    }

    // Background
    background(240); 
    
    // Mouse
    ellipse(mouseX, mouseY, 10, 10);

    
}



//
// EVENTS 
// 

// from p5js, listens to keyboard presses
function keyPressed() {

    // Play / Pause
    if(key == " ") {
        pauseUnpause()
    }
    else { console.log(key); }
}

// Changes the playing flag and all else that needs done.
function pauseUnpause() {
    
    // Pause
    if(playing) {

        // Mouse
        cursor('default');
    } 
    
    // Unpause
    else {

        // Mouse
        cursor('crosshair');
        // noCursor(); 
    }

    // Swap the flag!
    playing = !playing;
}