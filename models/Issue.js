const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueSchema = new Schema({

    userId:{
        type: String, 
    },
   
    clubId:{
        type: String, 
    },
    clubName:{
        type: String, 
    },
    isIssue:{
        type:Boolean,
        default:false
    },
   stuDetail:{}



}, { timestamps: true });

module.exports = mongoose.model("Issue", IssueSchema);

