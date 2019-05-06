/*const mongoose = require('mongoose');

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
  saltSecret: { type: String }
});

module.exports = { User }*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
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
    saltSecret: { type: String }
});

userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);