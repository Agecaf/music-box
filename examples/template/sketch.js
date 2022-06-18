/*

Template Sketch

*/



//
// SETUP 
// 

p5.disableFriendlyErrors = true; // Uncomment for performance.


// Constants
let [W, H] = [100, 100]; // Canvas dimensions


// Synths
let bassSynth;


// Flags
let playing = false;
let beforeStart = true;


// Music, called on first unpause
function setupMusic() {
    /* Anything music related has to be setup after the first event, 
    like a mouse click or in our case, the first time unpausing.*/

    // Synths
    bassSynth = new Tone.Synth().toMaster();

    // Music loop
    let loop = new Tone.Loop((time) => {console.log(time)}, "16n").start(0);
    Tone.Transport.tempo = 120;
  
}


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
        push();
        fill(0)
        stroke(255);
        strokeWeight(3);
        textAlign(CENTER);
        textSize(42);
        textFont('Mono');
        text("Press space to play/pause!", W/2, H/3);
        pop();

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
        pauseUnpause();
    }

}

// Changes the playing flag and all else that needs done. Called on Space bar.
function pauseUnpause() {
    
    // Pause
    if(playing) {

        // Mouse
        cursor('default');
    } 
    
    // Unpause
    else {

        // First time unpausing
        if(beforeStart) {
            setupMusic()
            beforeStart = false;
        }

        // Mouse
        cursor('crosshair');
        // noCursor(); 

        bassSynth.triggerAttackRelease(83, '16n');
    }

    // Swap the flag!
    playing = !playing;

    // Toggle the music.
    Tone.Transport.toggle();
    
}