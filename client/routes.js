import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AuthService from './services/AuthService';

import LandingPage from './LandingPage/LandingPage';
import TermsOfService from './TermsOfService/termsOfService';
import PrivacyPolicy from './PrivacyPolicy/privacyPolicy';
import Contact from './Contact/contact';
import Careers from './Careers/careers';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';


const HomePage = ({ component: Component, rest }) => {
  const auth = new AuthService();
  return (
    <Route
      {...rest}
      render={(props) => 
        auth.loggedIn()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}}
      />}
    />
  );
};

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/termsOfService" component={TermsOfService} />
    <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/careers" component={Careers} />
    <HomePage exact path="/home" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Switch>
);
