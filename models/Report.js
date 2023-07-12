const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;
const reportSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   
    body:{
        type:String,
        required:true
    },
   
    postedBy:{
      
    }
},{ timestamps: true })

module.exports = mongoose.model("Report",reportSchema)