const express = require("express");
const router = express.Router();
const JobApplication = require("../../models/JobApplication");
const JobListing = require("../../models/Joblisting");
const ApplicantProfile = require("../../models/ApplicantProfile");
const User = require("../../models/User");

// @route POST api/jobapplications/
// @desc Create a POST
// @access Public 
router.post('/', async (req, res) => {

    user = await ApplicantProfile.findOne({userid: req.body.userid});
    console.log(user);
    var check = false
    var len = user.currApplications.length;

    for(var i=0; i<len; i++) {

        if(req.body.jobid == user.currApplications[i]) {
            check = true;
            break;
        }
    }

    if (check == true || len >= 10) {
        console.log("You cannot apply for this job.");
        return res.status(400).json({"appErr": "You cannot apply for this job"})
    }

    else {
        user.currApplications.push(req.body.jobid);
        user.save()

        const newJobApplication = JobApplication({
            jobid: req.body.jobid,
            userid: req.body.userid,
            status: req.body.status,
            sop: req.body.sop,    
        });
        newJobApplication.save().then(jobapplication => res.json(jobapplication));
        console.log("This works as well.")
    }

    
});

// @route POST api/jobapplications/get
// @desc Create a POST
// @access Public 
router.post('/get', async (req, res) => {
    applications = await JobApplication.find({jobid: req.body.jobid, status: {$lt: 3}});
    console.log("I came here.");
    var data = {
        applications: []
    };

    var len = applications.length;

    for(var i = 0; i<len; i++){
        var temp_data = {};
        temp_data['application'] = applications[i];
        temp_data['applicant'] =  await User.findOne({_id: applications[i].userid});
        temp_data['applicantDets'] =  await ApplicantProfile.findOne({userid : applications[i].userid});
        data['applications'].push(temp_data);
    }
    console.log(data);
    console.log(req.body);
    res.json(data);
});

// @route POST api/jobapplications/getall
// @desc Create a POST
// @access Public 
router.post('/getall', async (req, res) => {
    applications = await JobApplication.find({userid: req.body.userid});
    
    var len = applications.length;
    // console.log(applications);

    const details = [];

    for(var i = 0; i < len; i++) {
        const tempjoblsiting = await JobListing.findById(applications[i].jobid)
        var tempdetails = {};
        tempdetails['getalldetails']= tempjoblsiting
        tempdetails['application'] = applications[i]
        tempdetails['getmoredetails']= await User.findOne({email: tempjoblsiting.postedby})    
        details.push(tempdetails);
    }
    res.json(details);
});

// @route POST api/jobapplications/viewemployees
// @desc Create a POST
// @access Public 
router.post('/viewemployees', async (req, res) => {
    listings = await JobListing.find({postedby: req.body.email});
    // console.log(req.body);
    // console.log(listings);
    var len = listings.length;
    // console.log(applications);

    const details = [];

    for(var i = 0; i < len; i++) {
        var tempdetails = {};
        const jobapplications = await JobApplication.find({jobid: listings[i]._id, status: 4})
        console.log(jobapplications)
        tempdetails['listing']= listings[i]
        var newlen = jobapplications.length;

        var tempuserdetails = [];

        for(var j = 0; j< newlen; j++) {
            const userdetails = await User.findById(jobapplications[j].userid);
            tempuserdetails.push(userdetails);
        }
        tempdetails["userdetails"] = tempuserdetails
        // tempdetails['getmoredetails']= await User.findOne({email: tempjoblsiting.postedby})    
        details.push(tempdetails);
    }
    res.json(details);
});

module.exports = router;
