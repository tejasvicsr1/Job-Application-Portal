const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const joblistings = require("./routes/api/joblistings");
const profiles = require("./routes/api/profiles");
const jobapplications = require("./routes/api/jobapplications");
const status = require("./routes/api/status");

const app = express();
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
app.use(bodyParser.json());



const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use('/api/joblistings', joblistings);
app.use("/api/profiles", profiles);
app.use("/api/jobapplications", jobapplications);
app.use("/api/editstatus", status);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));