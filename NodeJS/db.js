const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sshjuser:SSHJ678!@cluster0-s1qny.mongodb.net/test?retryWrites=true', (err) => {
  if(!err){
    console.log('MongoDB connection succeeded.');
  }
  else {
    console.log('Error in DB connection:' + JSON.stringify(err, undefined, 2));
  }
});

module.exports = mongoose;
