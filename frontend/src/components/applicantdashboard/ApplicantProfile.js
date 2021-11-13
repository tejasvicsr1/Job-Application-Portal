import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../profilecss/applicantprofile.css";
import { getEmployerProfile } from "../../actions/profiles";

class ApplicantProfile extends Component {

  componentDidMount() {
    // axios.post("api/profiles/getemployerprofile", this.props.auth.user.id).then(console.log("axios is working."));
    console.log(this.props.auth.user.id);
    this.props.getEmployerProfile({id: this.props.auth.user.id});
  }

  render() {
    const { user } = this.props.auth;
    const { employerprofile } = this.props.employerprofile;
    console.log(user);
    return (
      <div class="page-content page-container" id="page-content">
        <div class="row">
          <div class="col">
            <Link to="/applicantdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Employer Dashboard
            </Link>
          </div>
        </div>
        <div class="col center-align">
          <Link to="/editapplicantprofile">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginBottom: "10rem",
                marginLeft: "10rem",
                marginRight: "10rem",
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Edit
            </button>
          </Link>
        </div>
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        {" "}
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          class="img-radius"
                          alt="User-Profile-Image"
                        ></img>{" "}
                      </div>
                      <h6 class="f-w-600">{user.name}</h6>
                      <p>Applicant</p>{" "}
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Information
                      </h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Phone</p>
                          <h6 class="text-muted f-w-400">{employerprofile.phone}</h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Bio</p>
                          <h6 class="text-muted f-w-400">
                            {employerprofile.bio}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApplicantProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getEmployerProfile: PropTypes.func.isRequired,
  employerprofile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  employerprofile: state.employerprofile,
});

export default connect(mapStateToProps, { getEmployerProfile })(ApplicantProfile);
