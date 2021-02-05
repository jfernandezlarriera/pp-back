const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, `Format error`],
    validate: {
      validator: function() {
        return new Promise((res, rej) =>{
          User.findOne({email: this.email, _id: {$ne: this._id}})
              .then(data => {
                  if(data) {
                      res(false)
                  } else {
                      res(true)
                  }
              })
              .catch(err => {
                  res(false)
              })
        })
      }, message: 'Email already taken'
    }
  },
  phone:  {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  age: {
    type: Number,
    trim: true,
    required: true
  },
  sex: {
    type: String,
    trim: true,
    required: true
  },
  hobby: String,
  date: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
