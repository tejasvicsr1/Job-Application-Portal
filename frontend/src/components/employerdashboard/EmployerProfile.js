import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button, Table } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../profilecss/applicantprofile.css";

class EmployerProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      resume: "",
      photo: "",
    };
  }

  handleResume = (e) => {
    this.setState({ resume: e.target.files[0] });
  };

  submitResume = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", this.props.auth.user.id);
    formData.append("resume", this.state.resume);

    axios.post("/api/profiles/uploadResume", formData);
  };

  handlePhoto = (e) => {
    this.setState({ photo: e.target.files[0] });
  };

  submitPhoto = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", this.props.auth.user.id);
    formData.append("photo", this.state.photo);

    axios.post("/api/editstatus/uploadphoto", formData);
  };
  componentDidMount() {
    const userid = this.props.auth.user.id;

    axios
      .post("/api/profiles/getapplicantprofile", { userid: userid })
      .then(async (res) => {
        // console.log(res.data);

        await this.setState({ profile: res.data });
        console.log(this.state.profile, "Profile");
      });
  }

  render() {
    const { user } = this.props.auth;
    // console.log(user);
    return (
      <div class="page-content page-container" id="page-content">
        <Link to="/employerdashboard" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
          Applicant Dashboard
        </Link>
        <div class="col center-align">
          <Link to="/editemployerprofile">
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
                          src={"profilepics/" + this.state.profile.profilePic}
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
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Qualifications
                      </h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Education</p>
                          {/* <h6 class="text-muted f-w-400">Some Stuff</h6> */}
                          <Table responsive hover bordered striped dark>
                            <thead>
                              <tr>
                                <th>Insitute Name</th>
                                <th>Start Year</th>
                                <th>End Year</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.profile.education &&
                                this.state.profile.education.map((item) => (
                                  <tr>
                                    <td>{item.name}</td>
                                    <td>{item.startYear}</td>
                                    <td>{item.endYear}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>
                        <div class="col-sm-6">
                          <Table responsive hover bordered striped dark>
                            <thead>
                              <tr>
                                <th>Skills</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.profile.skills &&
                                this.state.profile.skills.map((item) => (
                                  <tr>
                                    <td>{item.label},</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={this.handleResume}
                    className="m-1 form-control bg-white w-100 d-inline-block"
                    id="text"
                    placeholder="End year (YYYY)"
                  />
                  <button onClick={this.submitResume}>Submit Resume</button>
                </div>
                <div>
                  <input
                    type="file"
                    accept=".jpg, .png"
                    onChange={this.handlePhoto}
                    className="m-1 form-control bg-white w-100 d-inline-block"
                    id="text"
                    placeholder="End year (YYYY)"
                  />
                  <button onClick={this.submitPhoto}>Submit Profile Pic</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmployerProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(EmployerProfile);
