const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobListingSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    postedby: {
        type: String,
        required: true
    },
    postingdate: {
        type: Date,
        required: true,
        default: Date.now
    },
    // applicantsnumber: {
    //     type: Number,
    //     required: true,
    //     // min: 0
    // },
    maxpositions: {
        type: Number,
        required: true,
        // min: 0
    },
    rating: {
        type: Number,
        required: true,
        // min: 1
        // max: 5
    },
    deadline: {
        type: Date,
        required: true
    },
    skillset: [
        {
            label: String,
            value: String,
        }
    ],
    jobtype: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        // min: 0
    },
    duration: {
        type: String,
        required: true
    },
});

module.exports = JobListing = mongoose.model('joblisting', JobListingSchema);