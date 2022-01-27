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
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  contactNumber: {
    type: Number,
  },
});

module.exports = mongoose.models.admin || mongoose.model("admin", adminSchema);
