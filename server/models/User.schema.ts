//@ts-ignore
const mongoose = require("mongoose");
//@ts-ignore
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
