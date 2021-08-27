const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Student = new Schema({
  name: { type: String },
  regNo: { type: String },
  address: { type: String },
});

module.exports = mongoose.model("Student", Student);
