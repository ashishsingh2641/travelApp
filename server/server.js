const express = require("express");
const db = require('./db');
// Set up the express app
const app = express();
const newLocal = '/api/v1/login';
// get all todos
app.get(newLocal, (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'retrieved successfully',
    logInData: db
  })
});
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});