const express = require('express');
// const path = require('path');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Initialize the app and create a port
const app = express();

// using the process.env.PORT to allow Heroku to set the port
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);