// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let Calendar = require('@painatalman/eventcalendarjs');
const fs = require('fs');

const EVENTS_FILE = './_data/events.json';

// TEST
let eventSettingObjects = require(EVENTS_FILE);

if (!(eventSettingObjects instanceof Array)) {
  eventSettingObjects = [];
}

let calendar = new Calendar("#app", {pictureUrl: 'https://lh3.googleusercontent.com/A798ePpnjRpz5TUnrmxMYOddTo9p172jh1S03cwaEWwV3QSz-rNveC-D2G4qlGhKFXTP2_sTdWdlWkc7CdvAWFHnPAkyJUcdJ9bQvYzsxkGym3VPMiEpaH4jPVsQDzsRHsPESW8bD6-0SVExtl2TfKtekE789WELSdD31XrNgYX4p-jrft4RIkrx-zeUHogDFKb3OYOXEUxWb8rAUmU6u4mNi5JV1Te9_muN2p-LcNmnO1LH7Anr_vYcjuyr8KKPeEaNvik7MQthIPhy7idj0iXA4y4AATLSToZvCztuMedFmoui5HyTL141SvqLWA5cw9i8v74t5oYPQNCgcNNVpmNQ-4mS0gzGnm0-3sn6SkmW2_tT-QSbv5gK7S9iv9GWfh0UKquymwrQYmxeQwf4_J-aTtaItYyqcvZpBr5xQ1vM2HyLFFEmgeJVJZn3RjAWqhiCeVo8zyUEBFt2cO_B7hUouPnSWJN2Qfvgmi8Idh50-odWXaUdiHkWaU9T49BP1Jnm-zRbUZVtLij4ZnXYijYW3bdRZi5BI7TZOR88vZt0nPMUnVXV19YEu3XCAmI9hbZt=w1010-h606-no', eventSettingObjects: eventSettingObjects});

let {ipcRenderer} = require('electron');

ipcRenderer.on('add-event', (event, data) => {
  // console.log('trying to create new event instance with ', data);
  // console.log('if successful, it must be added to the json file, too', data);
  calendar.createAndAddEvent(data,{
    success: () => {
      fs.writeFile(EVENTS_FILE, JSON.stringify(calendar.getEvents(true)) , 'utf-8');
    }
  });
  // ipcRenderer.send('save-event', data);

});
