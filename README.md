# Usage

## Prequisites
- node 12.19.0 installed
- git set up locally
- GitHub account set up

## Set Up
- Clone the repo to your machine
- Cd into the main repo directory
- Run `npm install` to install the node dependancies

## Running locally
- Run `node ./localServer.js`
- Visit `http://localhost:8081/` in a browser
- Enjoy!

## Memory Tracking
Start Chrome with --enable-precise-memory-info
### Mac
From the terminal run: 
`open /Applications/Google\ Chrome.app --args --enable-precise-memory-info`
Otherwise the results from performance.memory are bucketed and less useful

### Useful vid about three.js performance
https://threejs-journey.com/lessons/performance-tips#

### Problems
- Even without any HTML / DOM updating the three.js framerate is very low 40-45 but is steady (should be 60fps easy, whilst chrome is limiting the frame rate)
- With the HTML / DOM updating the three.js framerate starts of at a similar rate and steadily decreases (however the memory seems steady)

### Investigations
- Three.js the render has various stats that can be monitored (see the end of the video above)
- Perhaps node can output the CPU usage (e.g. https://www.geeksforgeeks.org/node-js-process-cpuusage-method/) to see if this is the cause of the slowdown
- Might be worth a monitor of the number of DOM elements (am I continuosly adding them somewhere)

The second issue needs resolving first
THen perhaps the first can be investigated