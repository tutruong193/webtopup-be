const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require("multer");
dotenv.config()

const app = express()
const port = process.env.PORT
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
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    await PdfSchema.create({ title: title, pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(port, () => {
    console.log('connecting with port ' + port)
})
