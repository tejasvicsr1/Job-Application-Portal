import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from "axios";
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
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

// earlier it was just a state without it being in a constructor
class EmployerEditProfile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      resume: "",
      profilePic: "",
      inputValue: "",
      skills: [],
      selectedoptions: [],
      // education: [],
      startYear: "",
      endYear: "",
      name: "",
    };
  }

  handleChange = async (selectedOptions) => {
    await this.setState({ skills: selectedOptions });
    console.log(selectedOptions);
  };

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, skills } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.log(skills);
        console.groupEnd();
        this.setState({
          inputValue: "",
          skills: [...skills, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newEmpoyerProfile = {
      email: this.state.email,
      resume: this.state.resume,
      profilePic: this.state.profilePic,
      userid: this.props.auth.user.id,
      skills: this.state.skills,
      // education: this.state.education,
      name: this.state.name,
      endYear: this.state.endYear,
      startYear: this.state.startYear,
      
    };

    // this.props.addJoblistings(newJoblisting);
    axios
      .post("/api/profiles/editapplicantprofile/others", newEmpoyerProfile)
      .then(console.log("Updated."));
    axios
      .post("/api/profiles/editapplicantprofile/education", 
      {userid: this.props.auth.user.id, startYear: this.state.startYear, endYear: this.state.endYear, name: this.state.name})
      .then(console.log('Yeh hi chahiye'));
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/employerprofile" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Profile
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Edit your profile</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see your profile?{" "}
                <Link to="/employerprofile">See Profile</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">New Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.resume}
                  id="resume"
                  type="text"
                />
                <label htmlFor="Resume">New Resume</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.profilePic}
                  id="profilePic"
                  type="text"
                />
                <label htmlFor="ProfilePic">New Profile Pic</label>
              </div>
              <div
                className="input-field col s12"
                style={{ paddingLeft: "11.250px" }}
              >
                <CreatableSelect
                  components={components}
                  inputValue={this.state.inputValue}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Skills"
                  value={this.state.skills}
                />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.startYear}
                  id="startYear"
                  type="text"
                />
                <label htmlFor="ProfilePic">New Start Year</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.endYear}
                  id="endYear"
                  type="text"
                />
                <label htmlFor="ProfilePic">New End Year</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  id="name"
                  type="text"
                />
                <label htmlFor="ProfilePic">New Education Name</label>
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
                  UPDATE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
EmployerEditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(EmployerEditProfile);
