const mongoose = require('mongoose');
const validator = require('validator');

const formSchema = new mongoose.Schema({
  yourName: {
    type: String,
    required: true
  },
  yourEmail: {
    type: String,
    required: [true, 'A tour must have a email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  subject: String,
  message: String
});

const Info = mongoose.model('Info', formSchema);

module.exports = Info;
