const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;

const studentSchema = new Schema({
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    clsName:{
        type:Number,
        required:true
    },
    
    mobile:{
        type:Number,
        
    },
    Roll_No:{
        type:String,
        required:true
    },
    isAdmin:{
       type:Boolean,
       default:false
    },
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"https://res.cloudinary.com/dj76d2css/image/upload/v1687283881/profile2_fkomhx.png"
    }
},
{
  timestamps: true,
})


module.exports = mongoose.model("Students",studentSchema)