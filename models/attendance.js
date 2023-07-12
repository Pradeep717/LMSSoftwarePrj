const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
   
    photo:{
        type:String
      
    },
    votes:[{type:ObjectId,ref:"User"}],
    postedBy:{
       type:String
    }
},
  {
    timestamps: true,
  })

module.exports = mongoose.model("Post",postSchema)