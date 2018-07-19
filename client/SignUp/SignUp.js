/**
 * @file React component for signing users up.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FetchService from '../services/FetchService';
import logo from '../images/barterOutOrangeWhiteLogo.png';

import './SignUp.css';
import '../baseStyles.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      university: 'University of Rochester',
      CMC: '',
      venmoUsername: '',
      success: false,
      allFilledOut: true,
      passwordsMatch: true,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  _handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.signUp();
    }
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ university: evt.target[index].value });
  }

  signUp() {
    this.setState({ passwordsMatch: true });
    this.setState({ allFilledOut: true });

    if (!this._validateInputs()) {
      return;
    }

    FetchService.POST('/api/auth/signup', {
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      venmoUsername: this.state.venmoUsername,
      firstName: this.state.firstName,
      university: this.state.university,
      lastName: this.state.lastName,
      CMC: this.state.CMC,
    })
      .then(() => {
        this.setState({ success: true });
      });
  }

  _validateInputs() {
    let allGood = true;

    if (!(this.state.passwordConfirm === this.state.password)) {
      this.setState({ passwordsMatch: false });
      const $password = document.getElementsByName('password')[0];
      const $passwordConfirm = document.getElementsByName('passwordConfirm')[0];

      $password.className = 'badInput';

      $passwordConfirm.className = 'badInput';

      allGood = false;
    } else {
      this.setState({ passwordsMatch: true });
    }

    if (!this.state.emailAddress.includes('@')) {
      this.setState({ allFilledOut: false });
      allGood = false;
    }

    // This is only temporary since we only allow U of R students currently.
    const checkerEmail = this.state.emailAddress.split('@')[1];

    if (checkerEmail !== 'u.rochester.edu' && checkerEmail !== 'rochester.edu') {
      const $emailAddress = document.getElementsByName('emailAddress')[0];

      $emailAddress.style.className = 'badInput';
      this.setState({ allFilledOut: false });
      allGood = false;
    }

    const inputsArray = document.getElementsByClassName('input');

    for (let i = 0; i < inputsArray.length; i++) {
      inputsArray[i].className = 'input';
    }

    for (let i = 0; i < inputsArray.length; i++) {
      if (inputsArray[i].value === '') {
        this.setState({ allFilledOut: false });
        allGood = false;
        inputsArray[i].className = 'badInput';
      } else {
        inputsArray[i].className = 'input';
      }
    }

    return allGood;
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="leftLoginContent">
          <h1>Welcome to</h1>
          <img src={logo} alt="logo" />
        </div>

        <div className="rightLoginContent">
          <h3>Sign Up for BarterOut</h3>
          {this.state.success && <h3 id="signup-success">Thanks for signing up, before logging in, please check your email to verify your account!</h3>}
          {!this.state.allFilledOut && <h4 className="input-error">Please ensure all the required fields are filled out.</h4>}
          <span className="inputLabel">First Name *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange.bind(this)}
            name="firstName"
            required
          />
          <span className="inputLabel">Last Name *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange.bind(this)}
            name="lastName"
            required
          />
          <span className="inputLabel">Email *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            onChange={this.onChange.bind(this)}
            name="emailAddress"
            required
          />
          <span className="inputLabel">University *</span>
          <select onChange={this.selectChange.bind(this)} className="conditionInput">
            <option value="University of Rochester">University of Rochester</option>
          </select>
          <span className="inputLabel">Venmo Username *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange.bind(this)}
            name="venmoUsername"
            required
          />
          <span className="inputLabel">CMC Box Number *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="number"
            onChange={this.onChange.bind(this)}
            name="CMC"
            required
          />
          {!this.state.passwordsMatch && <h4 className="input-error">Please make sure your passwords are the same!</h4>}
          <div className="line">
            <input
              className="formInputLoginSignup"
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.onChange.bind(this)}
              required
            />
            <input
              className="formInputLoginSignup"
              placeholder="Confirm Password"
              type="password"
              name="passwordConfirm"
              onChange={this.onChange.bind(this)}
              required
            />
          </div>
          <div className="terms">
              By clicking "Sign Up" below, you are agreeing to our <a href="/termsOfService" target="_blank" rel="noopener"> Terms of Service </a>
              and <a href="/privacyPolicy" target="_blank" rel="noopener"> Privacy Policy</a>.
          </div>
          <button
            className="button"
            type="submit"
            onClick={this.signUp.bind(this)}
          >Sign Up
          </button>

          <span>Back to <Link href="/login" to="/login">Login</Link></span>
        </div>
      </div>
    );
  }
}

export default SignUp;