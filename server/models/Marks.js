const mongoose = require("mongoose");
const { Schema } = mongoose;

const markSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  exam: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  semester: {
    type: Number,
  },
  section: {
    type: String,
  },
  marks: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
});

module.exports = mongoose.models.mark || mongoose.model("mark", markSchema);
