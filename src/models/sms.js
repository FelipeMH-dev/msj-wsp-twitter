const { model, Schema} = require('mongoose');

const newSchema = new Schema({
  Body: {
    type: String,
    
  },
  From: {
    type: String
  },
  Media:{
    type: String
  },
  Hashmedia:{
    type:String
  },
}, {
  timestamps: true
});

module.exports = model('sms', newSchema);