const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

const port = 3000;
app.listen(port, function() {
    console.log(`Application running at http://localhost:${port}/`);
});