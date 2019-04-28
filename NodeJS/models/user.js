const mongoose = require('mongoose');

var User = mongoose.model('User', {
  guid: { type: String },
  isActive: { type: Boolean },
  name: { type: String },
  gender: { type: String },
  age: { type: Number },
  type: { type: String },
  bloodgroup: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  registered: { type: String },
  latitude: { type: Number },
  longitude: { type: Number }
});

module.exports = { User };
