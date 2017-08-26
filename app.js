// Express

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const THREE = require('three');

let downloadFileName = '';
let modelInfo = [];

let app = express();
let port = process.env.PORT || 3000;

const http = require('http').Server(app).listen(80);
console.log("Server started...");

// Store static files in public directory
app.use(express.static(__dirname + '/public'));
app.use(fileUpload()); // Use fileuploder defaults

// Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Test download geometry
app.get('/downloadmesh', (req, res) => {
  let file = __dirname + downloadFileName;
  res.download(file);
});

// Test download geometry
app.get('/downloadinfo', (req, res) => {
  res.send(modelInfo);
});

// File Upload
app.post('/', (req, res) => {
  if(!req.files)
    return res.status(400).send('No files were uploaded.');

  // Get model mesh
    let modelMesh = req.files.file;
    let meshName = req.files.file.name;

  modelMesh.mv('uploads/' + meshName, (error) => {
    if (error) {
      return res.status(500).send(error);

      res.send('File uploaded!');
      }
    });


    // Get model information

    // Model name
    let modelName = req.body.modelName;
    // Model date
    let modelDate = req.body.modelDate;
    // Model author
    let modelAuthor = req.body.modelAuthor;
    // Model comments
    let modelComments = req.body.modelComments;
    // Model information array
    modelInfo = [modelName, modelDate, modelAuthor, modelComments]

    downloadFileName = meshName;
    res.sendFile(__dirname + '/index.html');
  });


app.listen(port);
