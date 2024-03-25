const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require("multer");
const EventService = require('./services/EventService')
const FacultyService = require('./services/FacultyService')
const UserService = require('./services/UserService')
const fs = require('fs');
dotenv.config()

const app = express()
const port = process.env.PORT || 3001
app.use(bodyParser.json());
app.use(cors());
routes(app);
mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log('connect DB success')
  })
  .catch((e) => {
    console.log(e)
  })
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {

    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/upload-files", upload.single("file"), async (req, res) => {
  try {
    const fileWord = req.file.filename;
    process.env.FILENAME = fileWord;
    res.send({ status: "OK" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(port, () => {
  console.log('connecting with port ' + port)
})
