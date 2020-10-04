const { model, Schema} = require('mongoose');

const newSchema = new Schema({
  Body: {
    type: String,
    
  },
  User: {
    type: String
  },
  Url:{
    type:String
  },
  DisplayUrl:{
    type:String
  },
  ExpandedUrl:{
    type:String
  },
  Userimagen:{
    type:String
  },
  IDmensaje:{
    type:String
  }
 
}, {
  timestamps: true
});

module.exports = model('twitter', newSchema);