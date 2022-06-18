
// Gets the Hertz value of a note (integer) we use, tuning around B
function note(n) {
    return 493.88 * math.pow(2, n/12) * 0.5;
}