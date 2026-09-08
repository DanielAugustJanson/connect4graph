# Connect 4 Web App with AI opponents

### By Daniel Janson 

This project was created for university course of Intelligent Algorythms at Tallinn Unviersity. 

Features a popular remake of game "Connect 4" with integration of Graph Based AI algorythms for playing against AI.

## Screenshots

![Setup sceen](readme/start.png)

![Gameplay](readme/gameplay.png)

![Endscree](/readme/end.png)

## Configuration of AI

For changing the complexity of AI algorythm change this parameter 
`let bestColumn = findBestMove(boardState,6,true)` in file ' `/src/comp/connectAI.js`'

Sweetspot for complexity & speed is `5`. 

Going below `4` makes AI quite simple to beat
Going above `6` makes AI unbeatable _for me_, yet **significantly** slower to calculate. 

Increasing board size or compexity increases calculations in N<sup>2</sup>. 

### Update 2026

Please note that this repository is unmaintained, and is probably **very** outdated. Not recommended to use on any live server. Feel free to patch it for modern standards or use for your own project template. 

I suck at CSS :3


## Basic usage

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
