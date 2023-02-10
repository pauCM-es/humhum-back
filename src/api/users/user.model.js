const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Password is required"]      
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "userName is required"] 
    },
    favourites: Array,
    platforms: Array
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("users", userSchema);
module.exports = User