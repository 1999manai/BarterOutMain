/**
 * @file Main React component for the app itself.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.3
 */

import React, { Component } from 'react';

import FetchService from '../../services/FetchService';
import AuthService from '../../services/AuthService';

import './Dashboard.css';

class DashboardHome extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      purchasedBooks: [],
      transactions: [],
    };

    this.AUTH = new AuthService();
    this.confirm = this.confirm.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this._getAllUsers();
    this._getPurchasedBooks();
    this._getTransactions();
  }

  _getAllUsers() {
    FetchService.GET(`/api/dashboard/getUsers/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ users: data });
      });
  }

  _getPurchasedBooks() {
    FetchService.GET(`/api/dashboard/getPurchasedBooks/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ purchasedBooks: data });
      });
  }

  _getTransactions() {
    FetchService.GET(`/api/dashboard/getTransactions/${this.AUTH.getToken()}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({ transactions: data });
      });
  }

  confirm(evt) {
    const id = evt.target.id;
    FetchService.POST('/api/dashboard/confirmBook', { id, token: this.AUTH.getToken })
      .then(() => window.location.reload());
  }

  logout() {
    this.AUTH.logout();
  }

  render() {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <button onClick={this.logout}>Logout</button>

        <h2>On-going transactions</h2>
        <table className="has-border">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Owner</th>
              <th>Condition</th>
              <th>Buyer</th>
              <th>Confirm</th>
            </tr>
            {this.state.transactions.map(book => (
              <tr id={book._id}>
                <td className="has-border">{book._id}</td>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
                <td className="has-border"><button id={book._id} onClick={this.confirm}>Confirm Purchase</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Completed Transactions</h2>
        <table className="has-border">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Owner</th>
              <th>Condition</th>
              <th>Buyer</th>
            </tr>
            {this.state.purchasedBooks.map(book => (
              <tr id={book._id}>
                <td className="has-border">{book._id}</td>
                <td className="has-border">{book.name}</td>
                <td className="has-border">{book.course}</td>
                <td className="has-border">{book.owner}</td>
                <td className="has-border">{book.condition}</td>
                <td className="has-border">{book.buyer}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Users</h2>
        <table className="has-border">
          <tbody>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Venmo</th>
              <th>CMC</th>
              <th># Sold</th>
              <th># Bought</th>
            </tr>
            {this.state.users.map(user => (
              <tr id={user._id}>
                <td className="has-border">{user._id}</td>
                <td className="has-border">{user.firstName}</td>
                <td className="has-border">{user.lastName}</td>
                <td className="has-border">{user.emailAddress}</td>
                <td className="has-border">{user.venmoUsername}</td>
                <td className="has-border">{user.CMC}</td>
                <td className="has-border">{user.numberOfBooksSold}</td>
                <td className="has-border">{user.numberOfBooksBought}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DashboardHome;