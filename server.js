// Imports
const express = require('express');
const routes =  require('./routes.js');

// Express app
const app = express();
app.set('port', 3377);
app.use(express.static('web-root'));

app.use('/rest', routes);

// Server startup
const handleServerReady = () => {
   const url = 'http://localhost:' + server.address().port;
   console.log('In your web browser, go to:');
   console.log(url);
   console.log('\n--- Server listening (hit CTRL-C to stop server) ---');
   };
const server = app.listen(app.get('port'), handleServerReady);
