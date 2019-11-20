const express = require("express");
const db = require('./db');
const multer = require('multer')
const bodyParser = require('body-parser')

// Set up the express app
const app = express();
app.use(bodyParser.json())

const newLocal = '/api/v1/login';
// get all todos
app.get(newLocal, (req, res) => {
  res.status(200).send({
    logInData: db
  })
});


const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.')
})

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
})

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});