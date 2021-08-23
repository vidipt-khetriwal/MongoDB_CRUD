const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const student = new Schema({
    name: {type:String},
    RegNo: {type:String},
    Address: {type:String}
});

const MyModel = mongoose.model("Student", student);

module.exports = MyModel;

