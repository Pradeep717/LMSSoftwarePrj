const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema;
const noticeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  target: {
    type: String,
    enum: ['batch', 'module', 'teachers'],
    required: true
  },
  batch: {
    type: Number,
    required: function () { return this.target === 'batch' }
  },
  module: {
    type: String,
    required: function () { return this.target === 'module' }
  },
  date: {
    type: Date,
    required: true
  },
  data_pub: { type: Date, default: Date.now }
},
  {
    timestamps: true,
  })

module.exports = mongoose.model("Notice", noticeSchema)

// const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema.Types
// const Schema = mongoose.Schema;
// const noticeSchema = new Schema({
//     title:{
//         type:String,
//         required:true
//     },
   
//     content:{
//         type:String,
//         required:true
//     },
//     data_pub : { type : Date, default: Date.now }
// },
// {
//   timestamps: true,
// })

// module.exports = mongoose.model("Notice",noticeSchema)