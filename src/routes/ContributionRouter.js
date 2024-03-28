const express = require('express');
const router = express.Router();
const ContributionController = require('../controllers/ContributionController');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post('/create', upload.single("file"), ContributionController.createContribution)
router.get('/detail/:id', ContributionController.getDetailContribution);
router.get('/contributionsubmited/:id', ContributionController.getContributionSubmited);
router.delete('/delete/:id', ContributionController.deleteContribution)
router.put('/update/:id', ContributionController.updateContribution);
//lay list cho marketing
router.get('/list/eid=:eventId&fid=:facultyId', ContributionController.getContributionsByEventAndFaculty);
module.exports = router
