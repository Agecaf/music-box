# Summary

- A main page will lead to multiple examples, 
these will be added as both simpe demos, experiments and compositions.

- We will be using Timbre.js for the sound creation!

- A lot of it involves convoluted and even conspiratorial theories, 
this isn't representative of all music, 
and will give a very specific type of music, 
which will hopefully be pleasant and new to the listener.

- The goal is to make a music box that just... 
improvises and keeps going. 
This improvisation will be guided, 
which makes each example unique in its own way.

- We use Bmin, Dmaj as our "default root" for this study.

- The goal is not for the computer to "play like a human", 
but to play like a computer in a way that is pleasant to the
human ear.


# Musical Notes

- We will use numbers to denote each note. This can be absolute, like Timbre.js uses, or relative, as will be used the most by us.

- Here's an example of the intervals associated to each number.

| Number | Negative |  Interval |  Bmin  |  Dmaj  |
| ------ | -------- | --------- | ------ | ------ |
|      0 |        0 | root      | **B**  | **D**  |
|      1 |      -11 | semitone  |   C    |   D#   |
|      2 |      -10 | tone      | **C#** | **E**  |
|      3 |       -9 | minor 3rd | **D**  |   F    |
|      4 |       -8 | major 3rd |   D#   | **F#** |
|      5 |       -7 | 4th       | **E**  | **G**  |
|      6 |       -6 | tritone   |   F    |   G#   |
|      7 |       -5 | 5th       | **F#** | **A**  |
|      8 |       -4 | minor 6th | **G**  |   A#   |
|      9 |       -3 | major 6th |   G#   | **B**  |
|     10 |       -2 | minor 7th | **A**  |   C    |
|     11 |       -1 | major 7th |   A#   | **C#** |

- Harmonically, we are effectively modulo 12, so for example +9 and -3 both are the same. We're like in a loop.

- Melodically, +9 and -3 will reach the same type of note, but an 8th apart, one going up, one going down.

- Going from relative to absulute is a matter of just adding up. 
For example if we're in the key of B (absolute X), 
but in the chord of G (relative -4), 
and in the 5th note in that scale (relative +7),
then we're at `X-4+7`.








# Harmonic Context

A harmonic context is a collection of note tones and 
information on them which allows one to decide which notes
to play for a specific purpose.

- Root, 5th, 3rd, 7th, 4th, 2nd, 6th, Grace notes..

- Primary (Root, Fifth)
- Secondary (3rd, 7th)
- Tertiary (4th, 2nd, 6th)
- Grace
- Color (Prim + sec)
- Scale (Primary Secondary Tertiary)
- Full (Primary Secondary Tertiary Grace)

A Harmonic context is built out of an array of arrays with the following information:
```
[[root, 2nd, 3rd, 4th, 5th, 6th, 7th],
[Primary],
[Secondary],
[Tertiary],
[Grace]]
```

It is then endowed with methods that allow one to find the things above...







# Harmony


## *Our* music theory

*Disclaimer: This is prescriptive music theory; 
it tells the computer what to play, 
and does not really describe the music humanity makes. 
A lot of this is mad conspiracy.*

- At each point in a composition we're in a harmonic context.
- This always has a root.
- The harmonic context is the notes that accompany this root,
in the various other parts of the composition, or sometimes implied.

### Scales
- **Diatonic** `[0,2,3,5,7,8,10]` Everyone's favorite 7 note scale, 
in the West at least. This is Aeolian mode, my favorite. 
Inversions include the Lydian, Ionian, Mixolydian, 
Dorian, Aeolian, Phrygian, Locrian modes.
- **Pentatonic** `[0,3,5,7,10]` Everyone's favorite 5 note scale 
in a lot of the world. 
A subset of the Diatonic scale but fundamentally different. 
This is Minor Pentatonic mode. 
Inversions include Blues Minor, Minor Pentatonic, 
Suspended Pentatonic, Blues Major, Major Pentatonic
- **Harmonic** `[0,2,3,5,7,8,11]`

### Neutral Contexts

- **Root** (rt1), just one note `[0]`.
- **Power Chords** (pow2), the root and the 5th, `[0,7]`
- **Suspended TriaD** (sus2/sus4), 
it's either `[0,2,7]` by suspending the 2nd
or `[0,5,7]` by suspending the 4th. 
These two are inversions of each other.
- **Stacked 4ths** (stack4), `[0,5,10]`, 
the last inversion of the Suspended Triad. 
More open, and skips the 5th.

- **Suspended Pentatonic** (sus5), `[0,2,5,7,10]`, 
inversion of the pentatinic scale.




### Minor Contexts
- **Minor Triad** (min3) `[0,3,7]`, core to the minor sound.

- **Minor 7th** (min7) `[0,3,7,10]`, 
the natural extension to the minor triad.

- **Diminished 7th** (dim7) `[0,3,6,10]`, 
Spicy minor, lowered 5th from minor 7th,
lower the root to get to major 7th.


- **Minor Sharp 7th** (mis7) `[0,3,7,11]`,
rise the 7th from minor 7th. Rise the 3rd to get to major 7th.


- **Minor Pentatonic** (min5) `[0,3,5,7,10]`,
inversion of the Pentatonic scale with a minor sound.
Lower the 3rd to get the suspended pentatonic, 
rise the 5th to get the blues minor.


- **Blues Minor** (bin5) `[0,3,5,8,10]`,
rises the 5th of the pentatonic minor to get
a more Phrygian-leaning sound. Rise the root to get the
major pentatonic.

- **Aeolian** (aeo7) `[0,2,3,5,7,8,10]`, 
default minor sound.

- **Dorian** (dor7) `[0,2,3,5,7,9,10]`, 
rise the 6th from the Aeolian. Rise the 4th to get Mixolydian.

- **Phrygian** (phr7) `[0,1,3,5,7,8,10]`,
lower the 2nd from Aeolian. Lower the 5th to get Locrian.

- **Locrian** (loc7) `[0,1,3,5,6,8,10]`,
lower the 5th from Phrygian. Lower the root to get Lydian.

### Major Contexts

- **Major Triad** (min3) `[0,4,7]`, core to the major sound.

- **Major 7th** (min7) `[0,4,7,11]`, 
the natural extension to the major triad.

- **Dominant 7th** (dom7) `[0,4,7,10]`, 
Spicy major, lower the 7th from major 7th. Lower the 3rd to get Minor 7th

- **Augmented 7th** (aug7) `[0,4,8,11]`,
Rise the 5th from major 7th. Rise the root to get to minor 7th.


- **Major Pentatonic** (maj5) `[0,2,4,7,9]`,
Nice pentatonic major sound.

- **Blues Major** (baj5) `[0,2,5,7,9]`,
Rise the third from the major pentatonic. 
Ambiguous Aeolian-Dorian sound,major leaning,
Rise the 7th to get to the suspended.

- **Ionian** (ion7) `[0,2,4,5,7,9,11]`,
de facto major sound.

- **Lydian** (lyd7) `[0,2,4,6,7,9,11]`,
Major sound, spicy if enphasis on tritone,
rises the 4th from Ionian.
Rise the root to get Locrian.

- **Mixolydian** (mix7) `[0,2,4,5,7,9,10]`,
Lower the 7th from ioanian, dominant sound.
Lower the 3rd to get Dorian.

### Unstable Contexts
- **Diminished** (dim3) `[0,3,6]`, a minor triad with a lowered 5th.
- **Augmented** (aug) `[0,4,8]`, a major triad with a raised 5th. Self-inversion.

- **Full Diminished** (dim4) `[0,3,6,9]`. Self-inversion.




## Tracks

### 7th

Diminished 7th (.75) -> Minor 7th (.00) -> 
Dominant 7th (.25) -> Major 7th (.50)

Up a 3rd: +3.5; Up a 5th +7; Dom to Major +5.25; Dom to Minor +4.75

### Reversed 7th

### Pentatonic (Reversed)

Major Pentatonic (0.4/0.6) -> Blues Major (0.6/0.4) -> 
Suspended (0.8/0.2) -> Minor Pentatonic (0.0) -> Blues Minor (0.2/0.8)

### Diatonic
Locrian (.71) -> Phrygian (.86) -> Aeolian (.00) -> Dorian (.14) -> Mixolydian (.29) -> Ionian (.43) -> Lydian (.57)

Up a 2nd: +1.71; Up a 3rd: +3.43; Up a 4th: +5.14; Up a 5th: +6.86;



# Melody

- `Zz` Stay or up/down (Scale)
- `Aa` Least up/down
- `Bb` Tone up/down
- `Cc` Third up/down
- `Dd` 4th up/down
- `Ee` 5th up/down
- `Ff` 6th up/down
- `Gg` 7th up/down
- `Hh` 8ve up/down

- `@` Repeat Last command!

- `Yy` Repeat 2ce prev or up/down. (Scale)
- `Xx` 2ce prev least up/down.

- `Ii` Root up/down 
- `Jj` Power up/down  // Primary?
- `Kk` Triad up/down  // Color instead?
- `Ll` Quad up/down
- `Mm` Pent up/down

- `Nn` Random least/3rd up.(down) // Scale
- `Oo` Random least/5th up.(down)
- `Pp` Random 3rd/7th up.(down)
- `Qq` Random 5rd/9th up.(down)

- `Rr` Triad Random close/near  //  Color 
- `Ss`Triad Random Up/down (3)
- `Tt` Quad Random close/near // 
- `Uu` Quad Random Up/down (3)


- `v` Random up/down; least
- `V` Random up/down; third
- `w` Random up/down; 4th
- `W` Random up/down; 5th

- `1` Root nearest
- `2` 2nd nearest
- `3` 3rd nearest
- `4` 4th nearest
- `5` 5th nearest
- `6` 6th nearest
- `7` 7th nearest

- Primary, Secondary, Tertiary, Color, Scale nearest; up/down; random.
- Up down etc relative to the note to follow!!!

## Rhythm

- `/` approach from below
- `\` approach from above
- `|` apprach from prev
- `~` Tremolo Approach


- `.` Silence
- `-` continue
- `,` small pause between note
- `^` Pizzicato
- Tremolo
- Double up
- many increasing
- Ghost echo



#
