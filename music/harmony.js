/*

All things harmony go here!

*/


//
// Harmonic Context
//

// Makes an array of data into a harmonic context
function harmonicContext(data) {

    // Output
    let hc = {}

    // Validate data
    console.assert(Array.isArray(data), `${data} is not an array.`);
    console.assert(data.length == 5, `${data} should be made of 5 arrays.`);
    console.assert(data[0].length == 7, `${data} should have 7 numbers.`);
    console.assert(    
        [].concat(data[1], data[2], data[3], data[4]).sort().toString()
        == '0,1,10,11,2,3,4,5,6,7,8,9',
        `${data[1]}; ${data[2]}; ${data[3]}; ${data[4]}` +
        " is not a partition of {0, ..., 11}.");
    
    /* Example, for a minor harmonic context on 0;
    [
        [0, 2, 3, 5, 7, 8, 10], // root, 2nd, etc... 
                                // Can be repeated (eg pentatonic)
        [0, 7],    // Primary notes, the root and usually the 5th
        [3, 10],   // Secondary notes, denoting the color
        [5, 2, 8], // Tertiary notes, completing the scale 
        [9, 11, 1, 6, 4] // Grace notes (the order matters; 
                         // if we have to go out of the scale, 
                         // which notes should we prefer?)
    ]
    */
    
    // Notes
    hc.root =  data[0][0];
    hc._2nd =  data[0][1];
    hc._3rd =  data[0][2];
    hc._4th =  data[0][3];
    hc._5th =  data[0][4];
    hc._6th =  data[0][5];
    hc._7th =  data[0][6];


    // Subsets
    hc.primary      = data[1];
    hc.secondary    = data[2];
    hc.tertiary     = data[3];
    hc.grace        = data[4];
    hc.color        = [].concat(data[1], data[2]);
    hc.scale        = [].concat(data[1], data[2], data[3]);


    // Return
    return hc;

}


// Based on a real value calculates a diatonic-like harmonic context. 
/*
    .57 Lydian 
    .43 Ionian
    .29 Mixolydian
    .14 Dorian
    .00 Aeolian
    .86 Phrygian
    .71 Locrian
    .64 Semitone cutoff
*/
function diatonic(x) {

    // "Round" a note, take mod 12 so that it's good.
    // The note change happens between Lydian 0.57, which rounds to 0
    // and Locrian 0.71, which rounds to 1.
    let r = (y) => { return math.mod(math.floor(y + 2.5/7), 12); };

    // Closeness to scale (for sorting grace notes)
    // We rescale to so that 1 tone = 1, 
    // then compare a value with its rounded (closest true note). 
    let offDistCompare = (n, m) => {
        return  ( math.abs(math.round((n-x) / T) - (n-x) / T)
                - math.abs(math.round((m-x) / T) - (m-x) / T) );
    }

    // The step between tones is given by considering e.g. going from
    // B Aeolian 0.00 to C# Locrian 1.71
    const T = 12/7;

    // root, 2nd, 3rd, etc...
    let scale = [r(x), r(x+T), r(x+2*T), r(x+3*T), 
        r(x+4*T), r(x+5*T), r(x+6*T)];
    
    let grace = [0,1,2,3,4,5,6,7,8,9,10,11]
        .filter((n) => !scale.includes(n))
        .sort(offDistCompare);
    
    // Output
    data = [
        scale,
        [scale[0], scale[4]],
        [scale[2], scale[6]], 
        [scale[3], scale[1], scale[5]],
        grace
    ]

    return harmonicContext(data);
}

// Diatonic modes
let lyd7 = (n) => diatonic(n + 4/7);
let ion7 = (n) => diatonic(n + 3/7);
let mix7 = (n) => diatonic(n + 2/7);
let dor7 = (n) => diatonic(n + 1/7);
let aeo7 = (n) => diatonic(n);
let phr7 = (n) => diatonic(n - 1/7);
let loc7 = (n) => diatonic(n - 2/7);
