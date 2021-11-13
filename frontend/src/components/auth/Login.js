import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("componnent")
    if (nextProps.auth.isAuthenticated) {
      if(nextProps.auth.user.usertype===0){
        console.log("0");

        this.props.history.push("/applicantdashboard"); 
      }
      else if(nextProps.auth.user.usertype===1) {
        console.log("1");
        this.props.history.push("/employerdashboard"); // push user to recruiter dashboard when they login
    }
      }
    
  if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  // componentDidMount() {
  //   // If logged in and user navigates to Login page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated && this.props.auth.usertype == 0) {
  //     // this.props.history.push("/applicantdashboard");
  //     console.log("0");
  //   } else if (
  //     this.props.auth.isAuthenticated &&
  //     this.props.auth.usertype == 1
  //   ) {
  //     console.log("1");
  //     // this.props.history.push("/employerdashboard");
  //   }
  // }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    // console.log(userData);
    console.log("hello");
    // console.log(loginUser(userData));
    // console.log(userData.usertype);
    this.props.loginUser(userData);
  };

  // componentWillReceiveProps(nextProps) {
  //   // const { user } = this.props.auth;
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/applicantdashboard"); // push user to dashboard when they login
  //   }
  //   // else if (nextProps.auth.isAuthenticated && user.usertype == 1) {
  //   //   this.props.history.push("/employerdashboard");
  //   // }
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect,
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
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
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
