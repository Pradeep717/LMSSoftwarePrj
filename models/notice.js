const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;
const noticeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   
    content:{
        type:String,
        required:true
    },
    data_pub : { type : Date, default: Date.now }
},
{
  timestamps: true,
})

module.exports = mongoose.model("Notice",noticeSchema)