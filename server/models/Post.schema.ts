// @ts-ignore
const mongoose = require("mongoose");
// @ts-ignore
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Post", PostSchema);
