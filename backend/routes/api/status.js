const express = require("express");
const router = express.Router();
const ApplicantProfile = require("../../models/ApplicantProfile");
const JobApplication = require("../../models/JobApplication");
const nodemailer = require("nodemailer");
const User = require("../../models/User");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


// @route POST api/editstatus
// @desc Create a POST
// @access Public
router.post("/", async (req, res) => {
  // console.log(req.body);
  const joblisting = await JobApplication.findById(req.body.jobid);
  const user = await ApplicantProfile.findOne({ userid: joblisting.userid });
  const date = new Date();
  const useremail = await User.findById(user.userid);
  console.log("This came.");
  console.log(joblisting);
  console.log(user);
  if (req.body.message == "shortlist") {
    console.log("This came herrre.");

    await JobApplication.updateOne(
      { _id: req.body.jobid },
      { $set: { status: "2" } }
    )
      .then((jobs) => {
        res.json(jobs);
        console.log("This came here.");
      })
      .catch((err) => console.log(err));
  }

  if (req.body.message == "accept") {
    console.log("This came herrre.");

    // const application = await Application.findById(req.body.id);
    const applications = await JobApplication.find({
      userid: joblisting.userid,
    });
    // const curr_job = await Job.findById(application["jobId"]);

    var len = applications.length;
    for (var i = 0; i < len; i++) {
    //   const job = await Job.findById(applications[i].jobId);
      const application = await JobApplication.findById(applications[i]["_id"]);
      if (application["status"] == 4) {
        return res
          .status(400)
          .json({ application: "Already accepted somewhere else." });
      }
      if (application["status"] < 3) {
        // await Job.updateOne(
        //   { _id: applications[i].jobId },
        //   { $inc: { currApplications: -1 } }
        // );
        await JobApplication.updateOne(
          { _id: applications[i]["_id"] },
          { $set: { status: 3, updateat: date } }
        );
      }
    }
    await JobApplication.updateOne(
      { _id: req.body.jobid },
      { $set: { status: 4, updateat: date } }
    ).then(console.log("Yeh hua hai"));

    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ssadtejasvi@gmail.com',
        pass: 'thisisforssad'
      }
    })

    // send email
    const email = {
      from: 'ssadtejasvi@gmail.com',
      to: useremail.email,
      subject: 'Your Job Application is Accepted',
      html: `<h1>Your job application for a Job has been accepted. Login to see more.</h1>`
    }

    await transport.sendMail(email, async (err) => {
      if(err)
        return res.status(400).json({ err })
      else
        return res.json()
    })


  }

  if (req.body.message == "reject") {
    await JobApplication.updateOne(
      { _id: req.body.jobid },
      { $set: { status: "3" } }
    )
      .then((jobs) => res.json(jobs))
      .catch((err) => console.log(err));
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '../frontend/public/profilepics');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
}

let upload = multer({ storage, fileFilter });

router.route('/uploadPhoto').post(upload.single('photo'), (req, res) => {
  console.log("FILE", req.file);
  ApplicantProfile.updateOne({userid: req.body.id}, {$set: {profilePic: req.file.filename}})
         .then(() => res.json('User Added'))
         .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
