const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicantProfileSchema = new Schema ({
    userid: { 
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	skills: [
        {
            label: String,
            value: String,
        }
    ],
	resume: String,
	education: [
		{
			name: String,
			startYear: String,
			endYear: String
		}
	],
	profilePic: String,
	currApplications: [String],
	rating: Number,
	ratedBy: Number
});

module.exports = ApplicantProfile = mongoose.model('applicantprofile', ApplicantProfileSchema);