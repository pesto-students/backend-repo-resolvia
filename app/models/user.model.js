const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNum: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://i.pinimg.com/originals/07/66/d1/0766d183119ff92920403eb7ae566a85.png',
    },
    firstname: {
      type: String,
      default: '',
    },
    lastname: {
      type: String,
      default: '',
    },
    age: {
      type: Number,
      default: 14,
    },
    gender: {
      type: String,
      default: '',
    },
    education: {
      type: String,
      default: '',
    },
    profession: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    category: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', userSchema);
