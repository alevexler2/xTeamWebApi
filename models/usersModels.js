const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  banned: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  
});
module.exports = model("Users", userSchema);
