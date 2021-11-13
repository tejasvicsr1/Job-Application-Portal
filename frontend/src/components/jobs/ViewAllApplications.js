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
  Container,
  Row,
  Table,
} from "reactstrap";

import { connect } from "react-redux";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

class ViewAllApplications extends Component {
  constructor() {
    super();
    const state_current = this;
    this.state = {
      details: [],
    };
  }
  componentDidMount() {
    axios
      .post("/api/jobapplications/getall", { userid: this.props.auth.user.id })
      .then(async (res) => {
        console.log(res.data);
        await this.setState({ details: res.data });
      });
    //   console.log(this.details, "Details");
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div class="page-content page-container" id="page-content">
        <Link to="/employerdashboard" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i> Back to
          Applicant Dashboard
        </Link>
        <div class="row center-align">
          <h2>
            <b>MY APPLICATIONS</b>
          </h2>
        </div>
        <div class="row center-align">
          <div class="col-sm"></div>
          <div class="col-sm">
            <Table responsive hover bordered striped dark>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Salary</th>
                  <th>Name of Recruiter</th>
                  <th>Rate Recruiter</th>
                  <th>Date of Joining</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.details &&
                  this.state.details.map((item) => (
                    <tr>
                      <td>{item.getalldetails.title}</td>
                      <td>{item.getalldetails.salary}</td>
                      <td>{item.getmoredetails.name}</td>
                      <td>{item.getalldetails.rating}</td>
                      <td>{item.getalldetails.deadline}</td>
                      <td>{item.application.status == "1" ? "Pending" : item.application.status == "2" ? "Shortlisted" : item.application.status == "3" ? "Rejected" : "Accepted"}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    );
  }
}
ViewAllApplications.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(ViewAllApplications);
