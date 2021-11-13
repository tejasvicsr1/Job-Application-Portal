const express = require('express');
const EmployerProfile = require('../../models/EmployerProfile');
const ApplicantProfile = require('../../models/ApplicantProfile');
const User = require("../../models/User");
const JobListing = require('../../models/Joblisting');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

// @route POST api/profiles/employer
// @desc Create a POST
// @access Public 
router.post('/employer', (req, res) => {
    const newEmployerProfile = EmployerProfile({
        phone: req.body.phone,
        bio: req.body.bio,
        email: req.body.email,
    });
    newEmployerProfile.save().then(employerprofile => res.json(employerprofile));
});

// @route POST api/profiles/editemployerprofile
// @desc Create a POST
// @access Public 
router.post('/editemployerprofile', async (req, res) => {
    // console.log(req.body);
    const user = await User.findById(req.body.userid);
    const previousemail = user.email
    await JobListing.updateMany({postedby: previousemail}, {$set: {postedby: req.body.email}})
    await User.updateOne({_id: req.body.userid}, {$set: {email: req.body.email}}).then(console.log("email updated"))
    await EmployerProfile.updateOne({userid: req.body.userid}, {$set: {bio: req.body.bio, phone: req.body.phone}})
    .then(employee => res.json(employee))    
    .catch(err => console.log(err))
});

// @route POST api/profiles/editapplicantprofile/others
// @desc Create a POST
// @access Public 
router.post('/editapplicantprofile/others', async (req, res) => {
    // console.log(req.body);
    const user = await User.findById(req.body.userid);
    // const previousemail = user.email
    // await JobListing.updateMany({postedby: previousemail}, {$set: {postedby: req.body.email}})
    await User.updateOne({_id: req.body.userid}, {$set: {email: req.body.email}}).then(console.log("email updated"))
    await ApplicantProfile.updateOne({userid: req.body.userid}, {$set: {skills: req.body.skills, resume: req.body.resume, profilePic: req.body.profilePic}})
    .then(employee => res.json(employee))    
    .catch(err => console.log(err))
});

// @route POST api/profiles/editapplicantprofile/education
// @desc Create a POST
// @access Public 
router.post('/editapplicantprofile/education', async (req, res) => {
    // console.log(req.body);
    const user = await ApplicantProfile.findOne({userid: req.body.userid});
    // const previousemail = user.email
    // console.log(User);
    console.log(user, "Education");
    // await JobListing.updateMany({postedby: previousemail}, {$set: {postedby: req.body.email}})
    if (user) {user.education.unshift({
            startYear: req.body.startYear,
            name: req.body.name,
            endYear: req.body.endYear,
        })
        user
          .save()
          .then(job => res.json(job))
          .catch(err => console.log(err));
}
});

// @route POST api/profiles/getemployerprofile
// @desc Create a POST
// @access Public 

router.post('/getemployerprofile', (req, res) => {
    console.log(req.body);
    EmployerProfile.findOne({'userid': req.body.id})
        .then(employerprofiles => {console.log(employerprofiles); res.json(employerprofiles)})
        .catch(err => console.log(err));
});

// @route POST api/profiles/getapplicantprofile
// @desc Create a POST
// @access Public 

router.post('/getapplicantprofile', (req, res) => {
    console.log(req.body);
    ApplicantProfile.findOne({'userid': req.body.userid})
        .then(employerprofiles => {console.log(employerprofiles); res.json(employerprofiles)})
        .catch(err => console.log(err));
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/public/resume');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
}

let upload = multer({ storage, fileFilter });

router.route('/uploadResume').post(upload.single('resume'), (req, res) => {
    console.log("FILE", req.file);
    ApplicantProfile.updateOne({userid: req.body.id}, {$set: {resume: req.file.filename}})
           .then(() => res.json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;