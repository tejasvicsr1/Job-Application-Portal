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
class ApplicantEditProfile extends Component {
  constructor() {
    super();
    this.state = {
    email: "",
    phone: "",
    bio: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const checker = this.state.bio.split(" ").length;
    if(checker > 250) {
      window.alert("You can't cross 250 words")
      return;
    }

    const newEmpoyerProfile = {
      email: this.state.email,
      bio: this.state.bio,
      phone: this.state.phone,
      userid: this.props.auth.user.id,
    };

    // this.props.addJoblistings(newJoblisting);
    axios.post("/api/profiles/editemployerprofile", newEmpoyerProfile).then(console.log("Updated."))
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/applicantprofile" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Profile
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Edit your profile</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see your profile?{" "}
                <Link to="/applicantprofile">See Profile</Link>
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
                  value={this.state.phone}
                  id="phone"
                  type="text"
                />
                <label htmlFor="email">New Phone</label>
              </div><div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.bio}
                  id="bio"
                  type="text"
                />
                <label htmlFor="email">New Bio</label>
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
ApplicantEditProfile.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
//   joblisting: state.joblisting,
});

export default connect(mapStateToProps, {})(ApplicantEditProfile);
