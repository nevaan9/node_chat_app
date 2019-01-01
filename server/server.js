// use path so we cab refer to paths outside our directory easier (or we have to out and in)
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

// Configure express static middleware, to serve up the public folder
// https://expressjs.com/en/starter/static-files.html
// entry point is index.html, so it goes automatically there.
app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
