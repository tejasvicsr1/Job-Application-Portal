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
class EditJobListing extends Component {
  constructor() {
    super();
    this.state = {
      deadline: "",
      maxpositions: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(parseInt(this.state.maxpositions) <=0) {
      window.alert("Maximun positions have to be greater than 0.");
      return;
    }
    
    console.log(this.state.deadline);
    console.log(this.props.match.params.id);
    console.log(this.state.maxpositions);
    axios
      .post("/api/joblistings/edit", {id: this.props.match.params.id, deadline: this.state.deadline, maxpositions: this.state.maxpositions})
      .then((res) => {
        console.log("Updated.")
        console.log(res.data);
    });
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/applicantdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Joblistings
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Edit your Joblisting</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see your joblistings?{" "}
                <Link to="/applicantdashboard">See joblistings</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <div className="row" style={{ paddingLeft: "11.250px" }}>
                  <p>
                    <b>Deadline</b>
                  </p>
                </div>
                <div className="row" style={{ paddingLeft: "11.250px" }}>
                  <input
                    onChange={this.onChange}
                    value={this.state.deadline}
                    id="deadline"
                    type="datetime-local"
                  />
                </div>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.maxpositions}
                  id="maxpositions"
                  type="number"
                />
                <label htmlFor="maxpositions">
                  Maximum Number of Positions
                </label>
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
EditJobListing.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  //   joblisting: state.joblisting,
});

export default connect(mapStateToProps, {})(EditJobListing);
