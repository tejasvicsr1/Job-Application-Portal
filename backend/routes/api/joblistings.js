const express = require("express");
const JobApplication = require("../../models/JobApplication");
const Joblisting = require("../../models/Joblisting");
const router = express.Router();

const JobListing = require("../../models/Joblisting");

// @route GET api/joblistings
// @desc Get All Items
// @access Public
router.post("/", async (req, res) => {
  jobs = await JobListing.find().sort({ postingdate: -1 });
  console.log(jobs, "this is weird")
  const len = jobs.length;

  var array = [];

  for (var i = 0; i < len; i++) {
    var temp_arr = {};
    temp_arr["job"] = jobs[i];
    const app = await JobApplication.find({ userid: req.body.id ,jobid: jobs[i].id});
    console.log(app, "appp")
    if (app.length > 0) {
      console.log("main yahaan jaa raha hoon", app.length)
      temp_arr["hasApplied"] = true;
    } else {
      temp_arr["hasApplied"] = false;
    }
    console.log(temp_arr);
    array.push(temp_arr);
  }
  return res.json(array);

});

// @route POST api/Myjoblistings
// @desc Get MyJoblistings
// @access Public
router.post("/MyJobListings", (req, res) => {
  JobListing.find({ postedby: req.body.email })
    .sort({ postingdate: -1 })
    .then((joblistings) => res.json(joblistings));
});

// @route POST api/joblistings/add
// @desc Create a POST
// @access Public
router.post("/add", (req, res) => {
  const newJobListing = JobListing({
    title: req.body.title,
    postedby: req.body.postedby,
    // applicantsnumber: req.body.applicantsnumber,
    maxpositions: req.body.maxpositions,
    rating: req.body.rating,
    deadline: req.body.deadline,
    skillset: req.body.skillset,
    jobtype: req.body.jobtype,
    salary: req.body.salary,
    duration: req.body.duration,
  });
  newJobListing.save().then((joblisting) => res.json(joblisting));
});

// @route POST api/joblistings/edit
// @desc Create a POST
// @access Public
router.post("/edit", (req, res) => {
  JobListing.updateOne(
    { _id: req.body.id },
    {
      $set: {
        deadline: req.body.deadline,
        maxpositions: req.body.maxpositions,
      },
    }
  )
    .then((joblisting) => {
      res.json(joblisting);
      console.log(req.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
});

// @route POST api/joblistings/search
// @desc Create a POST
// @access Public
router.post("/search", (req, res) => {
  const pipeline = [
    {
      $match: {
        $or: [
          {
            title: {
              $regex: req.body.query,
              $options: "i",
            },
          },
        ],
      },
    },
  ];

  JobListing.aggregate(pipeline).then((jobs) => res.json(jobs));
});

// @route POST api/joblistings/delete
// @desc Create a POST
// @access Public
router.post("/delete", (req, res) => {
  Joblisting.deleteOne({_id: req.body.id}).catch(err => console.log(err))
  const applications = JobApplication.updateMany({jobid: req.body.id}, {$set: {status: 3}}).catch(err => console.log(err))

});

module.exports = router;
