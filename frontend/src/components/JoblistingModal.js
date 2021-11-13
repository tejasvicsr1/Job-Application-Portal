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
import { addJoblistings } from "../actions/jobListingActions";
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
class JoblistingModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      title: "",
      postedby: "",
      // applicantsnumber: req.body.applicantsnumber,
      maxpositions: "",
      rating: "",
      deadline: "",
      skillset: [],
      inputValue: "",
      jobtype: "",
      salary: "",
      duration: "",
      firstCheck: 0,
      selectedOptions: [],
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleChange = async (selectedOptions) => {
    await this.setState({ skillset: selectedOptions });
    console.log(selectedOptions);
  }

  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, skillset } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        console.group("Value Added");
        console.log(skillset);
        console.groupEnd();
        this.setState({
          inputValue: "",
          skillset: [...skillset, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if(parseInt(this.state.maxpositions) <=0) {
      window.alert("Maximun positions have to be greater than 0.");
      return;
    }

    if(parseInt(this.state.rating) <1 || parseInt(this.state.rating) >5) {
      window.alert("Rating has to be between 1 and 5");
      return;
    }

    if(parseInt(this.state.salary) <=0) {
      window.alert("Salary has to be greater than 0.");
      return;
    }

    if(parseInt(this.state.duration) < 1 || parseInt(this.state.duration) > 6) {
      window.alert("Duration has to be between 1 and 6 months");
      return;
    }

    const newJoblisting = {
      title: this.state.title,
      postedby: this.state.postedby,
      maxpositions: this.state.maxpositions,
      rating: this.state.rating,
      deadline: this.state.deadline,
      skillset: this.state.skillset,
      jobtype: this.state.jobtype,
      salary: this.state.salary,
      duration: this.state.duration,
    };

    this.props.addJoblistings(newJoblisting);
    this.toggle();
  };

  render() {
    const { user } = this.props.auth;
    console.log(user);
    if (this.state.firstCheck == 0) {
      this.setState({
        firstCheck: 1,
        postedby: user.email,
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/applicantdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Add a Job below</b>
              </h4>
              <p className="grey-text text-darken-1">
                Want to see your jobs?{" "}
                <Link to="/applicantdashboard">See Jobs</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  id="title"
                  type="text"
                />
                <label htmlFor="name">Title</label>
              </div>
              <div className="input-field col s12">
                <div className="row" style={{ paddingLeft: "11.250px" }}>
                  <p>
                    <b>Posted By</b>
                  </p>
                </div>
                <input value={this.state.postedby} id="postedby" type="text" />
                {/* <label htmlFor="name">Posted By</label> */}
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  // value={this.state.maxpositions}
                  id="maxpositions"
                  type="number"
                  min="1"
                />
                <label htmlFor="name">Maximum Number of Positions</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.rating}
                  id="rating"
                  type="number"
                  min="1"
                />
                <label htmlFor="name">Rating</label>
              </div>
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
                {/* <input
                  onChange={this.onChange}
                  value={this.state.skillset}
                  id="skillset"
                  type="text"
                /> */}
                <CreatableSelect
                  components={components}
                  inputValue={this.state.inputValue}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  onChange={this.handleChange}
                  onInputChange={this.handleInputChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="Skillset"
                  value={this.state.skillset}
                />
                {/* <label htmlFor="email">Skillset</label> */}
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.jobtype}
                  id="jobtype"
                  type="text"
                />
                <label htmlFor="password">Job Type</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.salary}
                  id="salary"
                  type="number"
                  min="1"
                />
                <label htmlFor="password2">Salary</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.duration}
                  id="duration"
                  type="number"
                  min="0"
                  max="6"
                />
                <label htmlFor="password2">duration</label>
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
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
JoblistingModal.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  joblisting: state.joblisting,
});

export default connect(mapStateToProps, { addJoblistings })(JoblistingModal);
