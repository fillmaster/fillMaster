# Introduction
This project has been created to inspire ideas for drummers by enforcing rules to use whilst practicing the improvisation of drum beats, particularly fills. It can help beginner improvisers practice playing fills on time and can help any level of player get out of their comfort zone by playing things outside their usual style.

The project is Open Source under GNU GENERAL PUBLIC LICENSE Version 3.

## Getting started

Clone the repo and run `npm i`

The code is best edited in VS Code with the `Prettier - Code Formatter` extension installed to ensure linting/code styling is displayed correctly. Prettier has been set to fix any of the formatting errors on save.

## Available Scripts


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

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

## About the project:

Small, single-function components (e.g. a custom button) live in the 'elements' folder.
All other components including those you may class as a container live in the 'components' folder.

This project uses the react-pro-metronome (RPM) library. It has been imported into the source as the npm version is no longer maintained and has missing audio files. The audio files would have been replaced regardless, as a special tone is used for the fill start. RPM works perfectly as it uses howler.js (which implements the Web Audio API) for a stable tempo. RPM is also easy to interact with, using strings to abstract interaction with the metronome pulses. Metronome.tsx handles interaction with RPM.

RPM is written in javascript and at some point in the future we may update this to typescript and strip out any unused code, but its not a priority as it works perfectly right now. It should remain isolated at least until we have plenty of UI tests in place. This will allow us to focus on implementing new features to FillMaster.
