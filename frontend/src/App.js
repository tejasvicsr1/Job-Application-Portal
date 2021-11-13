import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "reactstrap";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import JoblistingModal from "./components/JoblistingModal";
import PrivateRoute from "./components/private-route/PrivateRoute";
import PrivateEmployerRoute from "./components/private-route/PrivateEmployerRoute";
import EmployerDashboard from "./components/employerdashboard/EmployerDashboard";
import ApplicantDashboard from "./components/applicantdashboard/ApplicantDashboard";
import ApplicantProfile from "../src/components/applicantdashboard/ApplicantProfile";
import EmployerProfile from "./components/employerdashboard/EmployerProfile";
import EditJobListing from "./components/jobs/EditJobListing";
import EmployerEditProfile from "./components/employerdashboard/EmployerEditProfile";
import ApplicantEditProfile from "./components/applicantdashboard/ApplicantEditProfile";
import ViewAllApplications from "./components/jobs/ViewAllApplications";
import ViewJobs from "./components/jobs/ViewJobs";
import ShowEmployees from "./components/applicantdashboard/ShowEmployees";
import SearchJobs from "./components/jobs/SearchJobs";
import ApplyJobsModal from "./components/jobs/ApplyJobsModal";
import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addjob" component={JoblistingModal} />
            <Route exact path="/viewallapplications" component={ViewAllApplications} />
            <Route exact path="/searchjobs" component={SearchJobs} />
            <Route exact path="/show" component={ShowEmployees} />
            <Route
              exact
              path="/applicantprofile"
              component={ApplicantProfile}
            />
            <Route exact path="/employerprofile" component={EmployerProfile} />
            <Route
              exact
              path="/editapplicantprofile"
              component={ApplicantEditProfile}
            />
            <Route
              exact
              path="/editemployerprofile"
              component={EmployerEditProfile}
            />
            <PrivateRoute
              exact
              path="/applicantdashboard"
              component={ApplicantDashboard}
            />
            <PrivateRoute exact path="/viewjobs/:id" component={ViewJobs} />
            <PrivateRoute exact path="/editjobs/:id" component={EditJobListing} />
            <PrivateEmployerRoute
              exact
              path="/employerdashboard"
              component={EmployerDashboard}
            />
            <PrivateEmployerRoute
              exact
              path="/employer/apply/:id"
              component={ApplyJobsModal}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
