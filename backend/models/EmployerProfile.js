const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployerProfileSchema = new Schema ({
    phone: {
        type: String,
        // required: true,
        default: "",
    },
    bio: {
        type: String,
        // required: true,
        default:"",
    },
    userid: {
        type: Schema.Types.ObjectId, 
		ref: 'User'  
    },
});

module.exports = EmployerProfile = mongoose.model('employerprofile', EmployerProfileSchema);