import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import dateFormat from "dateformat";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Table,
} from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class ViewJobs extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
      applications: [],
      filter: {
        choice: "name",
        sort: "1",
      },
    };
  }

  onShortlist(id) {
    axios
      .post("/api/editstatus", { jobid: id, message: "shortlist" })
      .then(console.log("success"));
  }

  onAccept(id) {
    console.log(id);
    axios.post("/api/editstatus", { jobid: id, message: "accept" });
  }

  onReject(id) {
    axios
      .post("/api/editstatus", { jobid: id, message: "reject" })
      .then(console.log("success"));
  }

  componentDidMount(applications) {
    const jobid = this.props.match.params.id;
    console.log(jobid, "This is what printed.");
    console.log("kuch to print ho");
    const newapplications = this.state.applications;
    console.log(this.state.applications, "This is what printed.");
    axios.post("/api/jobapplications/get", { jobid: jobid }).then((res) => {
      // this.setState({applications: res.data});
      console.log(res.data);
      this.setState({ applications: res.data["applications"] });
    });
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/applicantdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              all Jobs
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>List of Applicants</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see all jobs?{" "}
                <Link to="/applicantdashboard">See Jobs</Link>
              </p>
            </div>
          </div>
        </div>
        <div class="row">
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
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="createdat">Applicaton Date</MenuItem>
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

        <Table className="responsive hover bordered striped dark">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Skills</th>
              <th>Applicant SOP</th>
              <th>Applicant Education</th>
              <th>Applicant Rating</th>
              <th>Application Date</th>
              <th>Download Resume</th>
              <th>Shortlist/Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {this.state.applications
              .sort((applicant1, applicant2) => {
                if (this.state.filter.choice == "createdat") {
                  return (
                    (new Date(applicant1.application.createdat) -
                      new Date(applicant2.application.createdat)) *
                    parseInt(this.state.filter.sort)
                  );
                } else if (this.state.filter.choice == "name") {
                  console.log("lkfad;klsd");
                  return (
                    applicant1.applicant.name
                      .split(" ")[0]
                      .localeCompare(applicant2.applicant.name.split(" ")[0]) *
                    parseInt(this.state.filter.sort)
                  );
                } else if (this.state.filter.choice == "rating") {
                  console.log("lkfad;klsd");
                  return (
                    (parseInt(applicant1.applicantDets.rating) -
                      parseInt(applicant2.applicantDets.rating)) *
                    parseInt(this.state.filter.sort)
                  );
                }
              })
              .map((item) => (
                <tr>
                  <td>{item.applicant.name}</td>
                  <td>
                    {item.applicantDets.skills.map((sitem) => (
                      <div>{sitem.label},</div>
                    ))}
                  </td>
                  <td>{item.application.sop}</td>
                  <td>
                    {item.applicantDets.education.map((sitem) => (
                      <div>{sitem.name},</div>
                    ))}
                  </td>
                  <td>3</td>
                  <td>
                    {dateFormat(
                      item.application.createdat,
                      "dddd, mmmm dS, yyyy"
                    )}
                  </td>
                  <td>
                    <a href={"../resume/"+ item.applicantDets.resume}>
                    <span class="material-icons">download</span>
                    {/* {item.applicantDets.resume} */}
                    </a>
                  </td>
                  <td>
                    {item.application.status == 1 ? (
                      <div class="row center-align">
                        <button
                          style={{
                            width: "50px",
                            borderRadius: "3px",
                            letterSpacing: "0.5px",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                          }}
                          className="btn waves-effect waves-light hoverable green accent-3"
                          onClick={() => this.onShortlist(item.application._id)}
                        >
                          S
                        </button>
                      </div>
                    ) : (
                      <button
                        style={{
                          width: "50px",
                          borderRadius: "3px",
                          letterSpacing: "0.5px",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                        className="btn waves-effect waves-light hoverable green accent-3"
                        onClick={() => this.onAccept(item.application._id)}
                      >
                        A
                      </button>
                    )}
                  </td>
                  <td>
                    <div class="row center-align">
                      <button
                        style={{
                          width: "50px",
                          borderRadius: "3px",
                          letterSpacing: "0.5px",
                          marginTop: "10rem",
                          marginBottom: "10rem",
                          marginLeft: "3rem",
                        }}
                        className="btn waves-effect waves-light hoverable red accent-3"
                        onClick={() => this.onReject(item.application._id)}
                      >
                        R
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

ViewJobs.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   applyForJob: PropTypes.func.isRequired,
  //   jobapplication: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  // jobapplication: state.jobapplication,
});

export default connect(mapStateToProps, {})(ViewJobs);
