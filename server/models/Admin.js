const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  department: {
    type: String,
  },
  joiningYear: {
    type: String,
  },
  avatar: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("admin", adminSchema);
