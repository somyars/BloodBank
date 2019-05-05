const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});

var User = mongoose.model('User', {
  guid: { type: String },
  isActive: { type: Boolean },
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: {type: String},
  gender: { type: String },
  age: { type: Number },
  type: { type: String },
  bloodgroup: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  registered: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  geometry: GeoSchema
});

module.exports = { User };
