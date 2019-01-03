// See all format ways here: https://momentjs.com/
const moment = require('moment');

let date = moment();

// Getting a UNIX timestamp
let timeStamp = moment().valueOf();
console.log(timeStamp);
// Convert it back (using on of all below methods)
console.log(moment(timeStamp).format('L'));

console.log(date.format('MMM-YYYY')); // Jan-2019
console.log(moment().format('MMMM Do YYYY, h:mm:ss a')); // January 3rd 2019, 10:04:24 am
console.log(moment().format('dddd'));                    // Thursday
console.log(moment().format("MMM Do YY"));               // Jan 3rd 19
console.log(moment().format('YYYY [escaped] YYYY'));     // 2019 escaped 2019
console.log(moment().format());                          // 2019-01-03T10:04:24-05:00
console.log(moment().format('L'));

// Manipulating Dates
moment("20111031", "YYYYMMDD").fromNow(); // 7 years ago
moment("20120620", "YYYYMMDD").fromNow(); // 7 years ago
moment().startOf('day').fromNow();        // 10 hours ago
moment().endOf('day').fromNow();          // in 14 hours
moment().startOf('hour').fromNow();
