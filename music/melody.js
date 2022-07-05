
// Gets the Hertz value of a note (integer) we use, tuning around B
function note(n) {
    return 493.88 * math.pow(2, n/12) * 0.5;
}


//
// Melody Code parsers
//

// Find the next note based on like a character command
function successor (n, command, hc) {
    switch(command) {
        case `1`: return nearestInTune(n, [hc.root]);
        case `2`: return nearestInTune(n, [hc._2nd]);
        case `3`: return nearestInTune(n, [hc._3rd]);
        case `4`: return nearestInTune(n, [hc._4th]);
        case `5`: return nearestInTune(n, [hc._5th]);
        case `6`: return nearestInTune(n, [hc._6th]);
        case `7`: return nearestInTune(n, [hc._7th]);

        case `z`: return nextInScale(n+1, hc.scale, false);
        case `a`: return nextInScale(n+0, hc.scale, false);
        case `b`: return nextInScale(n-1, hc.scale, false);
        case `c`: return nextInScale(n-2, hc.scale, false);
        case `d`: return nextInScale(n-4, hc.scale, false);
        case `e`: return nextInScale(n-6, hc.scale, false);
        case `f`: return nextInScale(n-7, hc.scale, false);
        case `g`: return nextInScale(n-9, hc.scale, false);
        case `h`: return nextInScale(n-11, hc.scale, false);

        case `Z`: return nextInScale(n-1, hc.scale, true);
        case `A`: return nextInScale(n-0, hc.scale, true);
        case `B`: return nextInScale(n+1, hc.scale, true);
        case `C`: return nextInScale(n+2, hc.scale, true);
        case `D`: return nextInScale(n+4, hc.scale, true);
        case `E`: return nextInScale(n+6, hc.scale, true);
        case `F`: return nextInScale(n+7, hc.scale, true);
        case `G`: return nextInScale(n+9, hc.scale, true);
        case `H`: return nextInScale(n+11, hc.scale, true);

        case `i`: return nextInScale(n, [hc.root], false);
        case `j`: return nextInScale(n, hc.primary, false);
        case `k`: return nextInScale(n, hc.triad, false);
        case `l`: return nextInScale(n, hc.color, false);
        case `m`: return nextInScale(n, hc.pentatonic, false);
        case `I`: return nextInScale(n, [hc.root], true);
        case `J`: return nextInScale(n, hc.primary, true);
        case `K`: return nextInScale(n, hc.triad, true);
        case `L`: return nextInScale(n, hc.color, true);
        case `M`: return nextInScale(n, hc.pentatonic, true);

        case `N`: return choose(take(3, goUpScale(n, hc.scale)));
        case `n`: return choose(take(3, goDownScale(n, hc.scale)));
        case `O`: return choose(take(4, goUpScale(n, hc.scale)));
        case `o`: return choose(take(4, goDownScale(n, hc.scale)));
        case `P`: return choose(take(5, goUpScale(n+2, hc.scale)));
        case `p`: return choose(take(5, goDownScale(n-2, hc.scale)));
        case `Q`: return choose(take(5, goUpScale(n+6, hc.scale)));
        case `q`: return choose(take(5, goDownScale(n-6, hc.scale)));

        case `r`: return choose(take(2, zigZagScale(n,hc.triad)));
        case `R`: return choose(take(4, zigZagScale(n,hc.triad)));
        case `s`: return choose(take(3, goDownScale(n, hc.triad)));
        case `S`: return choose(take(3, goUpScale(n, hc.triad)));
        case `t`: return choose(take(2, zigZagScale(n,hc.color)));
        case `T`: return choose(take(4, zigZagScae(n,hc.color)));
        case `u`: return choose(take(3, goDownScale(n, hc.color)));
        case `U`: return choose(take(3, goUpScale(n, hc.color)));

        case `v`: return choose([nextInScale(n+0, hc.scale, false), nextInScale(n-0, hc.scale, true)]);
        case `V`: return choose([nextInScale(n+2, hc.scale, false), nextInScale(n-2, hc.scale, true)]);
        case `w`: return choose([nextInScale(n+4, hc.scale, false), nextInScale(n-4, hc.scale, true)]);
        case `W`: return choose([nextInScale(n+6, hc.scale, false), nextInScale(n-6, hc.scale, true)]);

        default: 
            return n;
    }
    // Note: @ is "repeat previous command"
}



// Melody chain note parser
function parseNotes(str, firstNote, harmonyFunc) {

    // Harmonic contexts...
    let words = str.replace(/[\[\]]/i, '').split(' ');
    let hcs = []

    // Essentially each charater a-zA-Z@ must be given a harmonic context,
    // Based only on the rhythmic information of which bar it is on;
    // thus it is enough to consider splitting by spaces, and 
    // Ignore all other rhythmic information.
    for (let idx = 0; idx < words.length; idx++) {
        for (let jdx = 0; jdx < words[idx].length; jdx++) {
            if(words[idx][jdx].match(/[a-z0-9A-Z@]/i)) {
                hcs.push(harmonyFunc(idx));
            }
        }
    }

    // Information on the swap
    let swap = swapBrackets(str);

    // Get the letters, use the swap data to swap order based on the brackets.
    let letters = str.match(/[a-z0-9A-Z@]/g);
    let commands = [];
    let hcsSwapped = [];
    for (let idx = 0; idx < letters.length; idx++) {
        commands[idx] = letters[swap[idx]];
        hcsSwapped[idx] = hcs[swap[idx]];
    }

    // Execute the commands!
    let swappedNotes = []
    let prevCommand = "Z";
    let prevNote = firstNote;
    for(let idx = 0; idx < commands.length; idx++) {
        // Previous note
        if (idx == 0){
            prevNote = firstNote;
        } 
        // Unswapped notes want to be successors of the last note in bracket, 
        // first when swapped
        else if (swap[idx] > swap[idx-1]) {
            prevNote = swappedNotes[swap[idx-1]];
        }

        // Repeat last command
        let command = commands[idx];
        if (command == "@") { command = prevCommand; }

        // Find next note 
        let nextNote = successor(prevNote, command, hcsSwapped[idx]);
        swappedNotes.push( nextNote );


        // Prepare for next step
        prevNote = nextNote;
        prevCommand = command;
    }


    // Output, will be a list of notes, just need to swap one last time!
    let out = [];
    for (let idx = 0; idx < letters.length; idx++) {
        out[idx] = swappedNotes[swap[idx]];
    }




    return out;
}


// 
function swapBrackets (str) {
    let lettersAndBrackets = str.match(/[a-z0-9A-Z@\[\]]/g);

    // Change each letter for a number, to remember the original order, keep the brackets,
    let numbersAndBrackets = [];
    let jdx = 0;
    for(let idx = 0; idx < lettersAndBrackets.length; idx++) {
        if (["[","]"].includes(lettersAndBrackets[idx])){ 
            numbersAndBrackets.push(lettersAndBrackets[idx]);
        }
        else {
            numbersAndBrackets.push(jdx);
            jdx++;
        }
    }

    // Output, internal iterating index.
    let out = [];
    let idx = 0;
    let swap = [];
    let inBracket = false;

    // Consume
    while (numbersAndBrackets.length > 0){
        let next = numbersAndBrackets.shift();

        if (next == "[") {
            while(numbersAndBrackets.length > 0) {
                let next = numbersAndBrackets.shift();
                if( next == "]") {
                    break;
                }

                swap.unshift(next);
            }

            out.push(...swap);
            swap = [];
        }

        else {
            out.push(next);
        }
    }


    return out;
}


// Analyze Rhythm
function parseRhythm(str) {
    // Each measure is split by a space
    let words = str.split(" ");

    // Output is an array of [note start time, note duration] information.
    let out = [];

    let measure = 0;
    // Iterate over measures
    for(let word of words){

        // Split the Rhythmic information
        let rhythmEx = /([a-z0-9A-Z@]|\([a-z0-9A-Z@]+\)|<[a-z0-9A-Z@]+>)(['.\-=,]*)/g
        let match = rhythmEx.exec(word);

        let t = 0;
        let temp = [];
        

        while (match != null) {
            let thisT = t;
            let dur = 1;
            let active = 1;
            

            // See what modifiers there's at the end
            for(char of match[2]) {
                switch(char) {
                    case ",": active *= 0.9; break; 
                    case "^": active *= 0.5; break;
                    case ".": dur *= 1.5; break; 
                    case "-": dur += 1; break; 
                    case "=": dur += 2; break; 
                    case "'": dur *= 0.5; break; 
                    case "\"": dur *= 0.25; break;
                    case "*": dur *= 1/8; break;
                    case "_": t += 1; break;
                    case "|": t += 0.5; break;
                    case "/": t += 0.25; break;
                }
            }
            t += dur;

            // Only one note
            if (match[1].length == 1) {
                temp.push([thisT, dur, active]);
            }

            // Stacked notes
            else if (match[1][0] == "<") {
                for (idx = 0; idx < match[1].length - 2; idx++){
                    temp.push([thisT, dur, active]);

                }
            }

            // Consecutive notes.
            else {
                let N = match[1].length - 2;
                for (idx = 0; idx < N; idx++){
                    temp.push([(thisT + idx * dur / N), 
                    dur / N, active / N]);
                }
            }




            // Continue to the next part
            
            match = rhythmEx.exec(word);
        }

        for ([dt, dur, act] of temp) {
            out.push([dt / t + measure, dur / t, act / t]);
        }



        // Next measure / word
        measure++;
    }
    return out;
}



// Parse a melody string into a synth
function parseMelody(str, harmonyFunc, firstNote = 12, synth, delay = 0) {

    // Parse
    let notes = parseNotes(str, firstNote, harmonyFunc);
    let rhythm = parseRhythm(str);

    // Coefficient
    const T = Tone.Time("1m").toSeconds();

    // Render all notes on the synth!
    for(idx = 0; idx < notes.length && idx < rhythm.length; idx++) {
        synth.triggerAttackRelease(note(notes[idx]), 
            rhythm[idx][2] * T, rhythm[idx][0] * T + delay )
    }
}




//
// Arpeggiator
//
function arpeggiatePattern(data) {
/*

arpeggiatePattern({
    synth: !!!
    pattern: [0],
    // rhythm: "@@@@",
    harmony: (n) => { return diatonic(0); },
    subset: "color", // primary, color, triad, scale, pentatonic
    start: 0,
    nearestRoot: true,
    repeat: 4,
    delay: 0,
})


*/

    // Default values
    mustHave(data, "synth")
    defaults(data, "pattern", [0])
    defaults(data, "rhythm", "@".repeat(data.pattern.length))
    defaults(data, "harmony", (n) => { return diatonic(0); })
    defaults(data, "subset", "color")
    defaults(data, "start", 0)
    defaults(data, "nearestRoot", true)
    defaults(data, "repeat", 4)
    defaults(data, "delay", 0)

    // Rhythm
    const rhythmStr = (data.rhythm + " ").repeat(data.repeat).trim();
    const rhythm = parseRhythm(rhythmStr);
    const notesPerMeasure = rhythm.length / data.repeat; 

    // Coefficient
    const T = Tone.Time("1m").toSeconds();
    
    // Notes
    let notes = []
    for(let idx = 0; idx < data.repeat; idx++) {

        // Choose the range we want to do out pattern in
        let range = harmonyIndex(
            data.nearestRoot ? 
                nearestInTune(data.start, [data.harmony(idx).root]) 
                : data.start, 
            data.harmony(idx)[data.subset]
        )

        // Add as many notes as in the rhythm.
        notes = notes.concat(
            take(notesPerMeasure, repeatPattern(data.pattern, range))
        )

    }

    // Render all notes on the synth!
    for(let idx = 0; idx < notes.length && idx < rhythm.length; idx++) {
        data.synth.triggerAttackRelease(note(notes[idx]), 
            rhythm[idx][2] * T, rhythm[idx][0] * T + data.delay )
    }
    

}



