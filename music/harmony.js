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

