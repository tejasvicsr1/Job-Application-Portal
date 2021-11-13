const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobApplicationSchema = new Schema({
  jobid: {
    type: String,
  },
  userid: String,
  status: String,
  sop: String,
  updateat: { type: Date, default: Date.now() },
  createdat: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = JobApplications = mongoose.model(
  "jobapplications",
  JobApplicationSchema
);
