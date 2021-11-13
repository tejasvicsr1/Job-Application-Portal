import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
class ShowEmployees extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
      //   status: "1",
      //   sop: "",
      filter: {
        choice: "title",
        sort: "1",
      },
      details: [],
    };
  }

  componentDidMount = () => {
    axios
      .post("/api/jobapplications/viewemployees", {
        email: this.props.auth.user.email,
      })
      .then(async (res) => {
        console.log(res.data, "THIS IS THE RES");
        await this.setState({ details: res.data });
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/applicantdashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <h1>All Employees</h1>
            <div className="row">
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
                    {/* <MenuItem value="name">Name</MenuItem> */}
                    <MenuItem value="title">Job Title</MenuItem>
                    <MenuItem value="deadline">Date of Joining</MenuItem>
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
            <Table responsive hover bordered striped dark>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Joining</th>
                  <th>Job Type</th>
                  <th>Job Title</th>
                </tr>
              </thead>
              <tbody>
                {this.state.details
                  .sort((applicant1, applicant2) => {
                    if (this.state.filter.choice == "deadline") {
                      return (
                        (new Date(applicant1.listing.deadline) -
                          new Date(applicant2.listing.deadline)) *
                        parseInt(this.state.filter.sort)
                      );
                      // } else if (this.state.filter.choice == "name") {
                      //   console.log("lkfad;klsd");
                      //   return (
                      //     applicant1.userdetails.name.length =="0"
                      //       .split(" ")[0]
                      //       .localeCompare(applicant2.userdetails.name.split(" ")[0]) *
                      //     parseInt(this.state.filter.sort)
                      //   );
                    } else if (this.state.filter.choice == "title") {
                      console.log("lkfad;klsd");
                      return (
                        applicant1.listing.title
                          .split(" ")[0]
                          .localeCompare(
                            applicant2.listing.title.split(" ")[0]
                          ) * parseInt(this.state.filter.sort)
                      );
                    }
                  })
                  .map((item) => (
                    <tr>
                      {item.userdetails.length == "0" ? (
                        <td>NA</td>
                      ) : (
                        item.userdetails.map((sitem) => <td>{sitem.name}</td>)
                      )}
                      {/* {item.userdetails ?
                    {item.userdetails.map((sitem) => (
                      <td>{sitem.name}</td>
                    ))}{" "}
                    : <td>NA</td>} */}
                      <td>
                        {dateFormat(
                          item.listing.deadline,
                          "dddd, mmmm dS, yyyy h:MM TT"
                        )}
                      </td>
                      <td>{item.listing.jobtype}</td>
                      <td>{item.listing.title}</td>
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
ShowEmployees.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  //   applyForJob: PropTypes.func.isRequired,
  //   jobapplication: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  //   jobapplication: state.jobapplication,
});

export default connect(mapStateToProps, {})(ShowEmployees);
