const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Check if we have port somwhere allready if not use port 3000

// Middlewares
app.use(bodyParser.json());

// Start server
app.listen(port, function(){
    console.log('Server is running on port: ' + port);

    console.log('Initializing youtube api');
    const youtubeRouter = require('./routes/youtubeAPI');

    console.log('Initializing facebook api ');
    const facebookRouter = require('./routes/facebookAPI');
});

// Routes



