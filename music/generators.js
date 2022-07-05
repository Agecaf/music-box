/*

Many simple and core generators will be here.
These tools will then be used together with
the main melody.js to make complex melody generators,
the ones here are good enough for arpeggios, 
running down scales, making chord progressions, etc...

*/


// A generator that just repeats an array eternally. 
// [1, 2, 3] -> 1, 2, 3, 1, 2, 3, 1, 2, 3...
function* repeat(arr) {
    let idx = 0;
    while (true) {
        yield arr[idx % arr.length];
        idx++; 
    }
}


// A generator that repeats a pattern along a range 
// (which may allow negative numbers in the pattern)
// [1,1,2]; [0,5] -> 0, 0, 5, 0, 0, 5, 0, 0, 5...
function* repeatPattern(pattern, range) {
    let idx = 0;
    while (true) {
        yield range[pattern[idx % pattern.length]];
        idx++; 
    }
}


// Take n elements of an iterator, put it into a nice array.
function take(n, iterator) {
    let out = []

    // Keep adding elements until there's no more, or we have as many as we wanted.
    while (n > 0) {
        let nxt = iterator.next();
        out.push(nxt.value);
        if(nxt.done) { 
            break; 
        }
        n--;
    }

    return out;
}



// Choose a random element of an array, uniformly distributed
function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Choose a random element of an array, with the first elements being much more likely
function weighted(arr) {
    return arr[Math.floor(Math.random() * Math.random() * arr.length)];
}



// Choose a default value for a set of input data 
function defaults(data, param, value) {
    if (!(param in data)) {
        data[param] = value;
    }
}

function mustHave(data, param){
    if (!(param in data)) {
        throw new Error('Must have parameter in data: ', param, data);
    }
}