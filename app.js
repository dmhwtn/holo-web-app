// Express

let express = require('express');
let fileUpload = require('express-fileupload');

let app = express();
let port = process.env.PORT || 3000;

const http = require('http').Server(app).listen(80);
console.log("Server started...");

// Path
const path = require('path');

// Store static files in public directory
app.use(express.static(__dirname + '/public'));

app.use(fileUpload());

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Test download geometry
app.get('/download', (req, res) => {
  let file = __dirname + '/test-geometry/box.obj';
  res.download(file);
});

// File Upload
app.post('/', (req, res) => {
  if(!req.files)
    return res.status(400).send('No files were uploaded.');

    let sampleFile = req.files.model;
    let fileName = req.files.model.name;

  sampleFile.mv('uploads/' + fileName, (error) => {
    if (error) {
      return res.status(500).send(error);

      res.send('File uploaded!');
      }
    })
  });


app.listen(port);
