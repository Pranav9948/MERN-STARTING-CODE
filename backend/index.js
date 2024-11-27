

const express = require('express');
const generalRoutes = require('./routes/generalRoutes');
const authRoutes = require('./routes/authRoutes');
const inVoiceRoutes = require('./routes/invoiceRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');
const cors=require('cors')



const path = require('path');

const app = express();


app.use(bodyParser.raw({ type: 'application/xml', limit: '10mb' }));

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/general', generalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/invoice', inVoiceRoutes);
app.use('/api/pdf', pdfRoutes);




  const port = 7000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);  
});