const express = require('express');
const router = express.Router();
const {getPdfData} = require('../controllers/pdfController');



router.post('/get-pdf-data',getPdfData)  

module.exports = router;