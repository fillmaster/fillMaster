# Introduction

This project has been created to inspire ideas for drummers by enforcing rules to use whilst practicing the improvisation of drum beats, particularly fills. It can help beginner improvisers practice playing fills on time and can help any level of player get out of their comfort zone by playing things outside their usual style.

The project is Open Source under GNU GENERAL PUBLIC LICENSE Version 3.

## Getting started

Clone the repo and run `npm i`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Open http://yourip:3000 on your mobile to view on mobile.

The page will reload if you make edits.

### `npm test`

Runs the tests. Code must be compiled first using `npm run compile`.

### `npm run compile`

If you need to compile the code to JavaScript. The files will be in the `dist` folder.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run serve`

Builds the app and runs the server so that you can then go to: http://yourip:3000 on your mobile to view the built app (i.e. not the slower, dev environment app).

## About the project:

Small, single-function components (e.g. a custom button) live in the 'elements' folder.
All other components including those you may class as a container live in the 'components' folder.

This project uses the react-pro-metronome (RPM) library. It has been imported into the source as the npm version is no longer maintained and has missing audio files. The audio files would have been replaced regardless, as a special tone is used for the fill start. RPM works perfectly as it uses howler.js (which implements the Web Audio API) for a stable tempo. RPM is also easy to interact with, using strings to abstract interaction with the metronome pulses. Metronome.tsx handles interaction with RPM.

RPM is written in javascript and at some point in the future we may update this to typescript and strip out any unused code, but its not a priority as it works perfectly right now. It should remain isolated at least until we have plenty of UI tests in place. This will allow us to focus on implementing new features to FillMaster. The test file in the RPM directory 'tests/index.js' should be named 'tests/index.test.js'; this was changed as there was conflicts with Jest when ts-jest was added so it was renamed so that the test skips. Before any changes to RPM happen, this test must be reinstated and compatibility issues fixed.

## Music Counting Basics 
### (and the Metronome Interface)

_This will hopefully help non-musicians working on the project or musicians who don't know much theory. It's also a guide for how we communicate with the metronome part of the app._

Musicians often count music to help them keep in time. 4/4 is the most common time signature used in music. See glossary (below) for an explanation of time signatures.

* If you decide to play quarter notes (beats) in 4/4. You may count 1, 2, 3, 4, 1, 2, 3, 4.

* If you decide to play eighth notes (two notes per beat) in 4/4. You may count 1 and 2 and 3 and 4 and. This can be called the first subdivision.

* If you decide to play sixteenth notes (four notes per beat) in 4/4. You may count 1 e & a 2 e & a 3 e & a 4 e & a. This can be called the second subdivision.

If all of these are played at 100 bpm (beats per minute). The numbers would fall in the same place and the subdivisions would fall in between. 

If we were to play in 4/8. It would sound identical to 4/4 (its just a naming convention). The first subdivision will now be called 16th notes (as you now are using 8ths as your beat) and the second subdivision will be called 32nd notes.

When making music you can go between beats and subdivisions as much as you want, otherwise the song would be pretty boring. But for the purpose of a metronome we tend to stick to one division at a time.

### Exercise:
This is of course completely optional, but if you really want to understand why we count in music. Do the following.
* Count out loud 1, 2, 3, 4 (and repeat)
* Maintain the same speed but add `and` in between each number. 1 and 2 and 3 and 4 and.
* Now add `e` (pronounced ee) and `a` (pronounced ah) on either side of the and. 1 e & a 2 e & a 3 e & a 4 e & a
* Now clap your hands on only the beats (the numbers) whilst continuing to count the subdivisions.
* Now ALSO clap on the `and` of 3.
* Now ALSO clap on the `e` and `and` and `a` of 4.

You should now be counting like this (with the claps highlighted) `1` e & a `2` e & a `3` e `&` a `4` `e` `&` `a`.

This is why musicians count. To learn rhythms and to communicate rhythms. `Where is that note you are playing?` - `It's on the 'a' of 3`.

### How does this translate to the metronome in the app?

The metronome in the app takes a string of numbers.
* 0 = No sound
* 1 = Accented click sound to emphasise beginning of the bar.
* 2 = Regular click sound.
* 3 = Helper sound. This is what makes Fill Master unique. We can place a helper sound on any sub beat to help the user pick out a certain part of the bar.

In 4/4 timing:

| Count: | 1 | e | & | a | 2 | e | & | a | 3 | e | & | a | 4 | e | & | a |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
| **Quarter Notes**: _default_ | 1 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 2 | 0 | 0 | 0 |
| **Eighth Notes**: _first subdivision_ | 1 | 0 | 2 | 0 | 2 | 0 | 2 | 0 | 2 | 0 | 2 | 0 | 2 | 0 | 2 | 0 |
| **16th Notes**:  _second subdivision_ | 1 | 2 | 2 | 2 | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |

_Note: The above diagram is based on the metronome subdivision setting of 4. i.e. There are 4 notes per beat. We actually default to 8 which allows for a third subdivision. The result is essentially the same but with extra 0s between each beat. If you look at the 'pattern' folder in 'tests' this may help you break down what's happening inside our interface with the metronome._

# GLOSSARY

## Time signature: 
Examples: 4/4 , 7/8 , 9/16

* The first number is the number of beats per bar (a section of music).
* The second number is the beat value.

4/4 = 4 beats per bar. Each beat is worth a quarter note.

7/8 = 7 beats per bar. Each beat is worth an 8th note.

9/16 = 9 beats per bar. Each beat is worth a 16th note.

_Note: 4/4, 4/8 and 4/16 all sound identical. Whoever transcribes the music may favour one over the other for legibility._

## bpm
Beats Per Minute.

Whether you are in 4/4 or 5/8 at 100bpm, you are playing 100 beats per minute. If you are simply playing a click track, they would sound identical. Musically though they would differ as you would (for example) put an accent on (i.e. hit a bit harder) the first beat of each bar, so every 4 notes or every 5 notes respectively would have an emphasis. You would also perhaps have a guitar riff that loops every 4 notes or every 5 notes. These will sound pretty different.

Of course 50bpm would be half the speed and 200bpm twice the speed. But it is also possible to stay at 100bpm but just play twice as many notes in the same space and it will sound twice as fast.

For example. If you count the beats in 4/4 as 1, 2, 3, 4. If you then put an AND between them and count the numbers at the same bpm. 1 AND 2 AND 3 AND 4 AND, your music will now sound twice as fast but you have not changed the BPM because the beats are only where you count the numbers. This is called subdivision.

## Subdivision
See BPM explanation above.
