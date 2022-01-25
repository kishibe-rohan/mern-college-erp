const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  totalLectures: {
    type: Number,
    default: 0,
  },
  lecturesAttended: {
    type: Number,
    default: 0,
  },
});

module.exports =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);
