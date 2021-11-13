import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dateFormat from "dateformat";
import {
  getJoblistings,
  deleteJoblisting,
  addJoblistings,
  getMyJoblistings,
} from "../../actions/jobListingActions";
import JoblistingModal from "../JoblistingModal";

class ApplicantDashboard extends Component {
  componentDidMount() {
    this.props.getJoblistings();
    this.props.getMyJoblistings({ email: this.props.auth.user.email });
  }

  onDeleteClick = (id) => {
    this.props.deleteJoblisting(id);
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };


  deleteJob = (id) => {
    axios.post("/api/joblistings/delete", {id: id})
    .then(console.log("success"))
  }
  render() {
    const { user } = this.props.auth;
    const { joblistings } = this.props.joblistings;
    const { myjoblistings } = this.props.joblistings;
    // console.log(this.props)
    // console.log(joblistings)
    return (
      <Container>
        <div style={{ height: "50vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  marginRight: "5rem",
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable red accent-3"
              >
                Logout
              </button>
              <Link to="/addjob">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    marginRight: "5rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Add Job
                </button>
              </Link>
              <Link to="/applicantprofile">
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable green accent-3"
                >
                  Profile
                </button>
              </Link>
              <div className="row center-align">
                <Link to="/show">
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem",
                      marginBottom: "5rem",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable yellow accent-3"
                  >
                    Employees
                  </button>
                </Link>
              </div>
            </div>
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are logged into{" "}
                  <span style={{ fontFamily: "monospace" }}>
                    Sasta LinkedIn
                  </span>{" "}
                  as an employer.
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
              <th>View Applicants</th>
              <th>Edit JobListing</th>
              <th>Delete Job</th>
            </tr>
          </thead>
          <tbody>
            {myjoblistings.map(
              ({
                _id,
                title,
                postedby,
                postingdate,
                maxpositions,
                rating,
                deadline,
                skillset,
                jobtype,
                salary,
                duration,
              }) => (
                <tr>
                  <td>{title}</td>
                  <td>{postedby}</td>
                  <td>{dateFormat(postingdate, "dddd, mmmm dS, yyyy")}</td>
                  <td>{maxpositions}</td>
                  <td>You need to fix this</td>
                  <td>{rating}</td>
                  <td>{dateFormat(deadline, "dddd, mmmm dS, yyyy h:MM TT")}</td>
                  <td>
                    {skillset.map((skill) => (
                      <div>{skill.label},</div>
                    ))}
                  </td>
                  <td>{jobtype}</td>
                  <td>{salary}</td>
                  <td>{duration}</td>
                  <td>
                    <Link to={"/viewjobs/" + _id}>View Applicants</Link>
                  </td>
                  <td>
                    <Link to={"/editjobs/" + _id}>Edit</Link>
                  </td>
                  <td>
                    <span class="material-icons"
                    onClick={() => this.deleteJob(_id)}>cancel</span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}
ApplicantDashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getJoblistings: PropTypes.func.isRequired,
  joblistings: PropTypes.object.isRequired,
  myjoblistings: PropTypes.object.isRequired,
  getMyJoblistings: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  joblistings: state.joblistings,
  myjoblistings: state.myjoblistings,
});
export default connect(mapStateToProps, {
  logoutUser,
  getJoblistings,
  deleteJoblisting,
  getMyJoblistings,
})(ApplicantDashboard);
