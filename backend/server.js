const express = require('express')
const app = express()
const cors=require('cors')
const port = 7500


app.use(cors())

app.get('/', (req, res) => {
  console.log('calling');
  
  return res.status(200).json({
    message:"hello"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})