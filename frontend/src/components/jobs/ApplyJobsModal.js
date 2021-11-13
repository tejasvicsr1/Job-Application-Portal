import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
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
} from "reactstrap";

import { connect } from "react-redux";
import { applyForJob } from "../../actions/applications";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

// earlier it was just a state without it being in a constructor
class ApplyJobsModal extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
      status: "1",
      sop: "",
    };
  }

  componentDidMount = () => {
    console.log("Iamhere")
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // if condition window.alert()
    // return ;
    const checker = this.state.sop.split(" ").length;
    if(checker > 250) {
      window.alert("You can't cross 250 words")
      return;
    }

    const newJobApplication = {
        jobid: this.props.match.params.id,
        userid: this.props.auth.user.id,
        status: "1",
        sop: this.state.sop,
    };

    this.props.applyForJob(newJobApplication);
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
                <b>Apply for the jobs</b>
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
                  value={this.state.sop}
                  id="sop"
                  type="text"
                />
                <label htmlFor="sop">Statement of Purpose</label>
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
                  APPLY Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
ApplyJobsModal.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
//   applyForJob: PropTypes.func.isRequired,
//   jobapplication: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  jobapplication: state.jobapplication,
});

export default connect(mapStateToProps, { applyForJob })(ApplyJobsModal);
