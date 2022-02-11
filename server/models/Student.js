const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  fatherName: {
    type: String,
  },

  registrationNumber: {
    type: String,
  },
  department: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },

  studentMobileNumber: {
    type: Number,
  },
  fatherMobileNumber: {
    type: Number,
  },
  fatherName: {
    type: String,
  },
  otp: {
    type: String,
  },
});

module.exports =
  mongoose.models.student || mongoose.model("student", studentSchema);
