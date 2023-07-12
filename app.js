const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 5000
const {MONGO_URI} = require('./keys')
app.use(express.json())
const BASE_URL=process.env.BASE_URL;  

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));


app.get('/', (req,res)=>res.send('Hello world'));



require('./models/user')
require('./models/post')
require('./models/student_new')
require('./models/teacher')
require('./models/notice')
require('./models/Report')
require('./models/club')
require('./models/Issue')
require('./models/Subject')


app.use(cors())
// app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/student'))
app.use(require("./routes/teacher"))
app.use(require('./routes/notice'))
app.use(require('./routes/report'))

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} `)
})