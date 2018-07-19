/**
 * @file React component for posting a book you are looking to sell.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';
import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import '../../baseStyles.css';


class SellBook extends Component {
  constructor() {
    super();
    this.state = {
      name: String,
      edition: Number,
      course: String,
      price: Number,
      ISBN: String,
      condition: 'Poor',
      comments: String,
    };
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  formSubmit(e) {
    e.preventDefault();
  }

  selectChange(evt) {
    const index = evt.target.selectedIndex;
    this.setState({ condition: evt.target[index].value });
  }

  cancel() {
    window.location.reload();
  }

  postToDatabase() {
    const AUTH = new AuthService();
    const profile = AUTH.getProfile();

    if (!this._validateInputs()) {
      return;
    }

    const payload = {
      name: this.state.name,
      edition: this.state.edition,
      course: this.state.course,
      price: this.state.price,
      status: 0,
      date: Date.now(),
      ISBN: this.state.ISBN,
      condition: this.state.condition,
      comments: this.state.comments,
      owner: profile.userInfo._id,
    };

    FetchService.POST(`/api/books/postBook/${AUTH.getToken()}`, payload)
      .then(() => {
        window.location.reload();
      });
  }

  _validateInputs() {
    if (!/^[A-Z]{3} \d{3}$/.test(this.state.course)) {
      return false;
    }

    if (this.state.price > 200 || this.state.price < 1) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <div className="wrapper-custom">
        <div className="modalContent">
          <h2>Tell us about your book</h2>
          <form className="input-wrapper" onSubmit={this.formSubmit.bind(this)}>
            <span className="inputLabelHome">Title of Book *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="e.g. Calculus and Early Transcendentals"
              type="text"
              name="name"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">Edition *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="e.g. 11"
              type="number"
              name="edition"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">Course *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="e.g. MTH 101"
              type="text"
              pattern="^[A-Z]{3} \d{3}$"
              name="course"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">Price *</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="$"
              type="number"
              name="price"
              onChange={this.onChange.bind(this)}
              required
            />
            <span className="inputLabelHome">ISBN</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="ISBN"
              type="number"
              pattern="^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$"
              onChange={this.onChange.bind(this)}
              name="ISBN"
            />
            <span className="inputLabelHome">Condition *</span>
            <select onChange={this.selectChange.bind(this)} className="conditionInput">
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Like new">Like new</option>
            </select>
            <span className="inputLabelHome">Comments</span>
            <input
              autoComplete="off"
              className="formInput"
              placeholder="Comments"
              type="text"
              onChange={this.onChange.bind(this)}
              name="comments"
            />
            <div>
              <a className="cancel" href="/home" onClick={this.cancel.bind(this)}>Cancel</a>
              <button
                type="submit"
                className="button"
                onClick={this.postToDatabase.bind(this)}
              >Sell Now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SellBook;