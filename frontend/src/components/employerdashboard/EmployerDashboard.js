import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dateFormat from "dateformat";
import SearchField from "react-search-field";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  getJoblistings,
  deleteJoblisting,
  addJoblistings,
} from "../../actions/jobListingActions";
import JoblistingModal from "../JoblistingModal";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

class EmployerDashboard extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
      filter: {
        choice: "salary",
        sort: "1",
        slider: [0, 999999],
        duration: [0, 7],
      },
      search: "",
    };
  }

  searchChange = (e, value) => {
    this.setState({ search: value });
    // console.log(value)
    console.log(this.state.search, "this is the value of search");
  };
  // call router
  componentDidMount() {
    this.props.getJoblistings({ id: this.props.auth.user.id });
  }

  onDeleteClick = (id) => {
    this.props.deleteJoblisting(id);
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    const random = require("random");
    const { joblistings } = this.props.joblistings;
    console.log(joblistings);
    return (
      <Container>
        <div style={{ height: "50vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <div class="row">
                <div class="col">
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginRight: "10rem",
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable red accent-3"
                  >
                    Logout
                  </button>
                </div>
                <div class="col">
                  <Link to="/employerprofile">
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                        marginRight: "10rem",
                        marginBottom: "1rem",
                      }}
                      className="btn btn-large waves-effect waves-light hoverable green accent-3"
                    >
                      Profile
                    </button>
                  </Link>
                </div>
                <div class="col">
                  <Link to="/viewallapplications">
                    <button
                      style={{
                        width: "170px",
                        borderRadius: "3px",
                        letterSpacing: "1px",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                      className="btn btn-large waves-effect waves-light hoverable violet accent-3"
                    >
                      Applications
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col center-align">
              <Link to="/searchjobs">
                <button
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1px",
                    marginTop: "1rem",
                    marginLeft: "22rem",
                    marginBottom: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                >
                  Search
                </button>
              </Link>
            </div>
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into{" "}
                  <span style={{ fontFamily: "monospace" }}>
                    Sasta LinkedIn
                  </span>{" "}
                  as an applicant.
                </p>
              </h4>
            </div>
          </div>
        </div>
        <div className="row center-align">
          <h4>
            <b>List of Jobs</b>
          </h4>
        </div>
        <div className="row">
          <div className="col">
            <FormControl>
              <Select
                value={this.state.filter.choice}
                onChange={(e) => {
                  this.setState((prevState) => ({
                    ...prevState,
                    filter: { ...prevState.filter, choice: e.target.value },
                  }));
                  // this.setState({filter: {choice: e.target.value}})
                  console.log(e.target.value);
                  console.log(this.state.filter);
                }}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col">
            <FormControl>
              <Select
                value={this.state.filter.sort}
                onChange={(e) => {
                  this.setState((prevState) => ({
                    ...prevState,
                    filter: { ...prevState.filter, sort: e.target.value },
                  }));
                  console.log(e.target.value);
                  console.log(this.state.filter);
                }}
              >
                <MenuItem value="1">Ascending</MenuItem>
                <MenuItem value="-1">Descending</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div>
          <Typography id="range-slider" gutterBottom>
            <b>Salary Range</b>
          </Typography>
          <span>{this.state.filter.slider[0]}</span>
          <span>&nbsp;to&nbsp;</span>
          <span>{this.state.filter.slider[1]}</span>
          <Slider
            value={this.state.filter.slider}
            onChange={(e, newValue) => {
              this.setState((prevState) => ({
                ...prevState,
                filter: { ...prevState.filter, slider: newValue },
              }));
            }}
            max="999999"
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
        <div>
          <Typography id="range-slider" gutterBottom>
            <b>Duration Range</b>
          </Typography>
          <span>{this.state.filter.duration[0]}</span>
          <span>&nbsp;to&nbsp;</span>
          <span>{this.state.filter.duration[1]}</span>
          <Slider
            value={this.state.filter.duration}
            onChange={(e, newValue) => {
              this.setState((prevState) => ({
                ...prevState,
                filter: { ...prevState.filter, duration: newValue },
              }));
            }}
            max="7"
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
        <Table responsive hover bordered striped dark>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Posted By</th>
              <th>Posting Date</th>
              <th>Maximum Positions</th>
              <th>Applicant Numbers</th>
              <th>Rating</th>
              <th>Deadline</th>
              <th>Skillset</th>
              <th>JobType</th>
              <th>Salary</th>
              <th>Duration</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {joblistings
              .filter((job) => {
                console.log(this.state.filter.slider);
                console.log(job.job.salary);
                // return
                return (
                  parseInt(job.job.salary) >= this.state.filter.slider[0] &&
                  parseInt(job.job.salary) <= this.state.filter.slider[1] &&
                  parseInt(job.job.duration) >= this.state.filter.duration[0] &&
                  parseInt(job.job.duration) <= this.state.filter.duration[1]
                );
              })
              .sort((applicant1, applicant2) => {
                console.log("aaja");
                console.log(this.state.filter.choice);
                if (this.state.filter.choice == "salary") {
                  console.log("yahaan");
                  console.log(applicant1.job.salary);
                  return (
                    (applicant1.job.salary - applicant2.job.salary) *
                    parseInt(this.state.filter.sort)
                  );
                } else if (this.state.filter.choice == "duration") {
                  console.log("lkfad;klsd");
                  return (
                    (applicant1.job.duration - applicant2.job.duration) *
                    parseInt(this.state.filter.sort)
                  );
                } else if (this.state.filter.choice == "rating") {
                  return (
                    (applicant1.job.rating - applicant2.job.rating) *
                    parseInt(this.state.filter.sort)
                  );
                }
              })
              .map((item) => (
                <tr>
                  <td>{item.job.title}</td>
                  <td>{item.job.postedby}</td>
                  <td>
                    {dateFormat(item.job.postingdate, "dddd, mmmm dS, yyyy")}
                  </td>
                  <td>{item.job.maxpositions}</td>
                  <td>{random.int(10, 25)}</td>
                  <td>{item.job.rating}</td>
                  <td>
                    {dateFormat(
                      item.job.deadline,
                      "dddd, mmmm dS, yyyy h:MM TT"
                    )}
                  </td>
                  <td>
                    {item.job.skillset.map((skill) => (
                      <div>{skill.label},</div>
                    ))}
                  </td>
                  <td>{item.job.jobtype}</td>
                  <td>{item.job.salary}</td>
                  <td>{item.job.duration}</td>
                  <td>
                    {item.hasApplied ? (
                      "Applied"
                    ) : (
                      <Link to={"/employer/apply/" + item.job._id}>Apply</Link>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}
EmployerDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getJoblistings: PropTypes.func.isRequired,
  joblistings: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  joblistings: state.joblistings,
});
export default connect(mapStateToProps, {
  logoutUser,
  getJoblistings,
  deleteJoblisting,
})(EmployerDashboard);
