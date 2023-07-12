const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;
const clubSchema = new Schema({
    name:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
       
    },
   
    members:[],
    date : { type : Date, default: Date.now }
},
{
  timestamps: true,
})

// mongoose.model("Club",clubSchema)

module.exports = mongoose.model('Club', clubSchema);
