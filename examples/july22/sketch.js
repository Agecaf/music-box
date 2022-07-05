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
let meloSynth;


// Flags
let playing = false;
let beforeStart = true;

// Custom globals
let custom = {};
custom.last = 12 + 3 - 1/7 -1/14;
custom.pattern = [0,1,2]
custom.A = []
custom.B = []
custom.C = []
custom.D = []
custom.saved = []
custom.n = 0;
custom.chorus = false;
custom.chor = false;
custom.ballTime = false;
custom.hue = 120;


// Music, called on first unpause
function setupMusic() {
    /* Anything music related has to be setup after the first event, 
    like a mouse click or in our case, the first time unpausing.*/

    // Reverb
    const reverb = new Tone.Reverb({
        wet: 0.4,
        decay: 0.5,
        preDeley: 0.01
    }).toDestination();


    // Melody
    meloSynth = new Tone.Synth({
        oscillator: {
            type: "triangle3",
        },
        envelope: {
            attack: 0.01,
            decay: 0.8,
            sustain: 0.05,
            release: 0.4
        },
        // portamento: 0.05,
        volume: -5,
    }).connect(reverb);

    bassSynth = new Tone.Synth({
        oscillator: {
            type: "triangle9",
        },
        envelope: {
            attack: 0.01,
            decay: 0.6,
            sustain: 0.0,
            release: 1.5,
        },
        volume: -10,
        // portamento: 0.05
    }).connect(reverb);

    // Music loop
    Tone.Transport.tempo = 180;
    let loop = new Tone.Loop(musicLoop, "4m").start(0);
    let coolLoop = new Tone.Loop(signalLoop, Tone.Time("1m").toSeconds() / 6).start(0);

    // First few melodies!
    let a1 = newA();
    let a2 = newA();
    let a3 = newA();
    let b1 = newB();
    let b2 = newB();
    let c1 = newC();
    let c2 = newC();
    let d1 = newD();
    let d2 = newD();
    custom.A.push(a1);
    custom.A.push(a2);
    custom.A.push(a3);
    custom.B.push(a3);
    custom.B.push(b1);
    custom.B.push(b2);
    custom.C.push(c1);
    custom.C.push(c2);
    custom.D.push(d1);
    custom.D.push(d2);

  
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


// Loop for drawing!
function signalLoop(time) {
    custom.ballTime = true;
}


//
// LOOP 
// 


function musicLoop (time) {

    //
    // Walking Harmony
    //
    if (custom.chorus) {
        let n = Math.round(custom.last);
        let ha = [lyd7(n), choose([phr7(n-1), mix7(n+2)]), 
            aeo7(n+4), choose([phr7(n-1), mix7(n+2), ion7(n+7), ion7(n+7)])];
    
        hf = (k) => { return ha[Math.floor(k) % ha.length]}


    } else {
        let next = custom.last;
        let ha = [];
        for(let idx = 0; idx < 4; idx++) {
            next += choose([0.5, -0.5, 3.5, -3.5, 7, -7, 3.5, -3.5])
            ha.push(next)
        }
        custom.last = next
    
        hf = (n) => { return diatonic(ha[Math.floor(n) % ha.length])}
    
    }
    
    //
    // Melody
    //

    // New phrase
    let words = [choose(custom.A), choose(custom.B), choose(custom.C), choose(custom.D)]
    let str = words.join(" ");

    // Play favorite pharse
    if (Math.random() < (custom.chorus ? 0.8 : 0.2) && custom.saved.length > 0) {
        str = choose(custom.saved)

        // Or save a phrase to favorites
    } else if (Math.random() < 0.2) {
        custom.saved.push(str);

        if(Math.random() < 0.5 && custom.saved.length > 2) {
            custom.saved.pop();
        }
    }

    // Play phrase
    parseMelody(str, hf, 10, meloSynth, time)
    
    // New melodies
    if (Math.random() < 0.05) {custom.A.push(newA())}
    if (Math.random() < 0.05) {custom.B.push(newB())}
    if (Math.random() < 0.05) {custom.C.push(newC())}
    if (Math.random() < 0.05) {custom.D.push(newD())}


    //
    // Bass 
    //

    // Change patterns..
    if (Math.random()< 0.1) {
        custom.pattern = choose([[0,1,3], [0,1,2], [0,2,3], [0,2,1]])
    }
    arpeggiatePattern({
        synth: bassSynth,
        pattern: custom.chorus ? [0,2,2] : custom.pattern,
        rhythm: custom.chorus ? "@@@@@@": "@@@@@@",
        harmony: hf,
        subset: "color", // primary, color, triad, scale, pentatonic
        start: -18,
        nearestRoot: true,
        repeat: 4,
        delay: time,
    })


    //
    // Time
    //
    custom.n++;
    custom.chor = custom.chorus;
    if(custom.n % 4 == 0 && !custom.chorus) {
        custom.chorus = true;

        if(math.mod(custom.last,1) < 0.5) {
            custom.last += 7;
        } else {
            custom.last += 1.5;
        }

    } 
    else if (custom.n % 2 == 0 && custom.chorus) {
        custom.chorus = false;
    }

    custom.hue += Math.random * 360;
    custom.hue %= 360;

}


function newA() {
    let c = choose;

    let word = c([
        `${c("111553r")}${c("aaaAAAbbBBcC")}`,
        `${c("111553r")}(${c("aaaAAAbbBBcC")}${c("aaAAbBcC@@")}${c("aaAAbB")})`,
        `${c("111553r")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaAAbBcC@@__--")}${c("aaAAbB___---")}`,
        `_${c("111553r")}${c("aaaAAAbbBBcC")}${c("aaaAAAbbBBcC")}${c("aaAAbBcC@@")}${c("aaAAbB")}`,
    ])

    return word;
}

function newB() {
    let c = choose;

    let word = c([
        `${c("1153aaaAAAbbBBcC")}(${c("aaaAAAbbBBcC")}${c("aaAAbBcC@@")}${c("aaAAbB")})`,
        `${c("1153aaaAAAbbBBcC")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaAAbBcC@@__--")}${c("aaAAbB___---")}`,
    ])
    
    return word;
}

function newC() {
    let c = choose;

    let word = c([
        `(${c("1153aaaAAAbbBBcC")}${c("aaAAbB")}${c("aaAAbB")})[${c("aaaAbbBc")}`,
        `${c("1153aaaAAAbbBBcC")}[(${c(["aaa", "aab", "aaA","abA"])})`,
        `${c("1153aaaAAAbbBBcC")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}[${c(["aaa", "aab", "aaA","abA"])}`,
    ])
    
    return word;
}

function newD() {
    let c = choose;

    let word = c([
        `${c("111553r")}]${c("aaaAAAbbBBcC")}`,
        `${c("111553r")}]_`,
        `${c("111553r")}](${c("aaaAAAbbBBcC")}${c("aaAAbBcC@@")}${c("aaAAbB")})`,
        `${c("111553r")}]${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}${c("aaAAbBcC@@__--")}${c("aaAAbB___---")}`,
        `${c("111553r")}]${c("aaaAAAbbBBcC__--")}${c("aaaAAAbbBBcC__--")}___`,
    ])

    return word;
}

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
    // background(240); 
    translate(100);
    
    // Mouse
    if(custom.ballTime) {

        let col = meloSynth.frequency.value / 5;
        let radius = 250 - bassSynth.frequency.value;
        fill(custom.chor ? col : col, custom.chor ? 30 + col/2 : col, custom.chor? 150 : 30 + col);
        noStroke();
        ellipse(mouseX, mouseY, radius, radius);
        custom.ballTime = false;
    }

    
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
        background(240)
        cursor('crosshair');
        // noCursor(); 

    }

    // Swap the flag!
    playing = !playing;

    // Toggle the music.
    Tone.Transport.toggle();
    
}



// 
// Random 
//

hf = (n) => {return diatonic(n * 2 * (12/7))}
