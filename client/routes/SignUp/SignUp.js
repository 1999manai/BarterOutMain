/**
 * @file React component for signing users up.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.4
 */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import FetchService from '../../services/FetchService';
import VerifyService from '../../services/VerifyService';
import logo from '../../images/logo-orange.png';

import './SignUp.css';
import '../../barterout.css';

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
      redirectToSuccess: false,
      allFilledOut: true,
      passwordsMatch: true,
    };

    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
    if (evt.target.name == 'password') { this.updatePasswordStrength(evt); }
  }

  updatePasswordStrength(evt) {
    const strength = VerifyService.getPasswordStrength(evt.target.value);
    const strengthElement = document.getElementsByClassName('password-strength')[0];
    strengthElement.style.width = `${strength * 10}%`;
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

    if (this._validateInputs()) {
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
          this.setState({ redirectToSuccess: true });
        });
    }
  }

  _validateInputs() {
    let allGood = true;
    this.setState(state => ({ emailAddress: state.emailAddress.toLowerCase() }));
    // Making sure passwords are the same.
    if (!VerifyService.verifyPasswords(this.state.passwordConfirm, this.state.password)) {
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
    const $emailAddress = document.getElementsByName('emailAddress')[0];

    if (!VerifyService.verifyEmail(this.state.emailAddress)) {
      $emailAddress.className = 'badInput';
      this.setState({ allFilledOut: false });
      allGood = false;
    } else {
      $emailAddress.className = 'formInputLoginSignup';
    }

    const inputsArray = document.getElementsByClassName('formInputLoginSignup');
    const badInputsArray = document.getElementsByClassName('badInput');

    for (let i = 0; i < badInputsArray.length; i++) {
      badInputsArray[i].className = 'formInputLoginSignup';
    }

    for (let i = 0; i < inputsArray.length; i++) {
      inputsArray[i].className = 'formInputLoginSignup';
    }

    for (let i = 0; i < inputsArray.length; i++) {
      if (inputsArray[i].value === '') {
        this.setState({ allFilledOut: false });
        allGood = false;
        inputsArray[i].className = 'badInput';
      } else {
        inputsArray[i].className = 'formInputLoginSignup';
      }
    }

    return allGood;
  }

  render() {
    if (this.state.redirectToSuccess) {
      return <Redirect to="/sign-up-success" />;
    }
    return (
      <div className="login-wrapper">
        <div className="leftLoginContent">
          <h1>Welcome to</h1>
          <img className="wide-logo" src={logo} alt="logo" />
        </div>

        <div className="rightLoginContent">
          <h3>Create an Account</h3>
          {!this.state.allFilledOut && <h4 className="input-error">Please ensure all the required fields are filled out.</h4>}

          <span className="inputLabel">First Name *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange}
            name="firstName"
            required
          />

          <span className="inputLabel">Last Name *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange}
            name="lastName"
            required
          />

          <span className="inputLabel">Email * (must be @u.rochester.edu)</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="email"
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu$"
            onChange={this.onChange}
            name="emailAddress"
            required
          />

          <span className="inputLabel">University *</span>
          <select onChange={this.selectChange} className="schoolInput">
            <option value="University of Rochester">University of Rochester</option>
          </select>

          <span className="inputLabel">Venmo Username *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="text"
            onChange={this.onChange}
            name="venmoUsername"
            required
          />

          <span className="inputLabel">CMC Box Number (6 digits) *</span>
          <input
            className="formInputLoginSignup"
            placeholder=""
            type="number"
            onChange={this.onChange}
            name="CMC"
            required
          />

          {!this.state.passwordsMatch && <h4 className="input-error">Please make sure your passwords are the same!</h4>}
          <div className="line">
            <input
              className="formInputSignup"
              placeholder="Password"
              type="password"
              name="password"
              onChange={this.onChange}
              required
            />
            <input
              className="formInputSignup"
              placeholder="Confirm Password"
              type="password"
              name="passwordConfirm"
              onChange={this.onChange}
              required
            />
          </div>
          <div className="password-strength" />
          <div className="terms">
              By clicking &quot;Sign Up&quot; below, you are agreeing to our <a href="/terms-of-service" target="_blank" rel="noopener"> Terms of Service </a>
              and <a href="/privacy-policy" target="_blank" rel="noopener"> Privacy Policy</a>.
          </div>
          <button
            className="inputButtonFilled"
            type="submit"
            onClick={this.signUp}
          >Sign Up
          </button>

          <span>Back to <Link href="/" to="/">Home</Link></span>
        </div>
      </div>
    );
  }
}

export default SignUp;
