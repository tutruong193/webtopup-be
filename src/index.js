const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require("multer");
dotenv.config()
const path = require('path');
const app = express()
const port = process.env.PORT || 3001
app.use(bodyParser.json());
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'files')));
app.get("/getfiles/:id", async (req, res) => {
  try {
    const fileWord = req.params.id;
    const link = path.join(__dirname, 'files', fileWord);
    console.log(link)
    res.send({ 
      status: "OK",
      link: link
    });
    console.log(fileWord);
  } catch (error) {
    res.json({ status: error });
  }
});
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
