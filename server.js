const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

// Initialize the app and create a port
const app = express();
const PORT = process.env.port || 3001;



// // GET Route for homepage
// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/assets/index.html'))
// );

// // GET Route for diagnostics page
// app.get('/diagnostics', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/assets/diagnostics.html'))
// );

// app.get('*', (req, res)=>{
//   res.sendFile(path.join(__dirname, '/public/assets/404.html'))
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);