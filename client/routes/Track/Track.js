/**
 * @file Reusable React component for a route on the web platform.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @version 0.0.2
 */

import React, { Component } from 'react';

import SideNav from '../../components/SideNav/SideNav';

class Track extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <SideNav selected="track" />
      </div>
    );
  }
}

export default Track;
