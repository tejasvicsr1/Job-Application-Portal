import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import dateFormat from "dateformat";
import {
  Button,
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
import axios from "axios";
import { connect } from "react-redux";
// import { applyForJob } from "../../actions/applications";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

// earlier it was just a state without it being in a constructor
class SearchJobs extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
    //   status: "1",
    //   sop: "",
      query: "",
      joblistings: [],
    };
  }

  componentDidMount = () => {
    console.log("Iamhere");
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // if condition window.alert()
    // return ;
    console.log(this.state.query);
    axios.post("/api/joblistings/search", {query: this.state.query})
        .then(async (res) => {
            // console.log(res.data)
            await this.setState({joblistings: res.data});
            console.log(this.state.joblistings, "this is here")
        });
    // const newJobApplication = {
    //   jobid: this.props.match.params.id,
    //   userid: this.props.auth.user.id,
    //   status: "1",
    //   sop: this.state.sop,
    // };

    // this.props.applyForJob(newJobApplication);
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/employerdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Search for Jobs</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see all jobs?{" "}
                <Link to="/employerdashboard">See Jobs</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.query}
                  id="query"
                  type="text"
                />
                <label htmlFor="sop">Search for Job</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Search
                </button>
              </div>
            </form>
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
                </tr>
              </thead>
              <tbody>
                {this.state.joblistings.map((item) => (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.postedby}</td>
                    <td>
                      {dateFormat(item.postingdate, "dddd, mmmm dS, yyyy")}
                    </td>
                    <td>{item.maxpositions}</td>
                    <td>You need to fix this</td>
                    <td>{item.rating}</td>
                    <td>
                      {dateFormat(
                        item.deadline,
                        "dddd, mmmm dS, yyyy h:MM TT"
                      )}
                    </td>
                    <td>
                      {item.skillset.map((skill) => (
                        <div>{skill.label},</div>
                      ))}
                    </td>
                    <td>{item.jobtype}</td>
                    <td>{item.salary}</td>
                    <td>{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
SearchJobs.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   applyForJob: PropTypes.func.isRequired,
  //   jobapplication: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  //   jobapplication: state.jobapplication,
});

export default connect(mapStateToProps, {})(SearchJobs);
