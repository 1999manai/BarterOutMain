/**
 * @file React component for loging users in.
 * @author Duncan Grubbs <duncan.grubbs@gmail.com>
 * @author Luis Nova
 * @version 0.0.3
 */

import React, { Component } from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';

import AuthService from '../services/AuthService';

import './landingpage.css';
import '../res/sylesheetOrkneyRegular.css';
import '../res/sylesheetOrkneyLight.css';
import '../res/sylesheetOrkneyMedium.css';
import '../res/sylesheetOrkneyBold.css';
// import '../res/animate.css';

import logoPic from '../images/barterOutOrangeWhiteLogoHeader.png';

import picOne from '../images/overtheShoulderCompressed.jpg';
import picTwo from '../images/groupMeetingCompressed.jpg';
import picThree from '../images/outdoorsCompressed.jpg';

import vlad from '../images/team-photos/vladCazacu.jpg';
import annie from '../images/team-photos/annieHamburgen.png';
import pavel from '../images/team-photos/pavelStan.jpg';
import melissa from '../images/team-photos/melissaKagaju.jpg';
import duncan from '../images/team-photos/duncanGrubbs.jpg';
import daniel from '../images/team-photos/danielMunoz.jpg';
import shawn from '../images/team-photos/zixuChen.jpg';
import nikolai from '../images/team-photos/Nikolai.jpg';
import genessis from '../images/team-photos/genessisGalindo.jpg';
import zacqueline from '../images/team-photos/zacquelineBaldwin.jpg';

import adviserOne from '../images/team-photos/meyerElizabeth.jpg';

import logo from '../images/barterOutProfilePhotoWebPage.png';

import linkedInLogo from '../images/linkedIn.png';
import facebookLogo from '../images/facebook.png';
import instagramLogo from '../images/instagram.png';

import './noframework.waypoints.min.js';
import '../res/jquery-3.3.1.min.js';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.setRedirect();
  }

  setRedirect() {
    if (!this.Auth.isTokenExpired(this.Auth.getToken())) {
      this.setState({ redirect: true });
    } else {
      this.setState({ redirect: false });
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/home" />);
    }

    return (
      <div className="app">
        <div className="landingpage">
          <div className="photo-bg">
            <nav className="headerBar animated slideInDown">
              <div className="logo">
                <a href="/" className="buttonLink"><img alt="logo" id="logoPic" src={logoPic} /></a>
              </div>
              <div className="pageLinks">
                <a className="productLink landingPageLink" href="#madeSimple">Our Product</a>
                <a className="missionLink landingPageLink" href="#whatWereAbout">Our Mission</a>
                <a className="teamLink landingPageLink" href="#teamPage">Our Team</a>
                <Link className="landingPageLink preRegisterLink" to="/login" href="login">Login</Link>
              </div>
            </nav>
            <div className="mainText animated fadeIn" id="mainText">
              <h1>
                HASSLE-FREE <br />
                PEER-TO-PEER <br />
                SHOPPING
              </h1>
              <Link to="/signup" href="/signup" className="buttonLink">
                <button className="barterOutButton">JOIN NOW FREE</button>
              </Link>
            </div>
          </div>
          <div className="madeSimple" id="madeSimple">
            <div className="madeSimpleInfo animated" id="madeSimpleInfo">
              <h2 className="madeSimpleHeader animated">
                BUYING AND SELLING MADE SIMPLE
              </h2>
              <div className="madeSimpleText animated">
                <p>
                  At BarterOut, we know textbooks can get very expensive and finding second-hand ones can be a hassle.
                  That&apos;s why we make it easier for your students to get their books and go to class, all with
                  just a couple clicks on our platform. We empower forward thinking universities, just like yours,
                  to set up textbooks exchanges for their students using our customisable software.
                </p>
                <br />
                Buy and sell with us in minutes!
              </div>
            </div>
          </div>
          <div className="howItWorks">
            <div className="howItWorksText animated">
              <h2 className="howItWorksHeader animated">FOR STUDENTS</h2>
              <div className="howItWorksBodyText">
                <br />
                <div className="steps">
                    1. <b>Simple &amp; Organized:</b>
                </div>
                <p>
                  Our easy-to-use software is intuitive and will get you to checkout in no time.
                </p>
                <br />
                <div className="steps">
                  2. <b>Affordable:</b>
                </div>
                <p>
                  Save money by buying used textbooks from your peers,earn money by selling the
                 textbooks you don’t need anymore.
                </p>
                <br />
                <div className="steps">
                  3. <b>Local:</b>
                </div>
                <p>
                  Everything happens at on-campus with no shipping necessary.
                </p>
              </div>
            </div>
            <div className="forUniversitiesText animated">
              <h2 className="howItWorksHeader animated">FOR UNIVERSITIES</h2>
              <div className="howItWorksBodyText">
                <br />
                <div className="steps">
                    1. <b>Safe:</b>
                </div>
                <p>
                  Exclusive to the university community.
                </p>
                <br />
                <div className="steps">
                  2. <b>Sustainable &amp; Efficient:</b>
                </div>
                <p>
                  Helps the students transact used textbooks, better for the students
                  and better for the environment.
                </p>
                <br />
                <div className="steps">
                  3. <b>Simple:</b>
                </div>
                <p>
                  Our fast onboarding process and dedicated consultancy team make it easy
                  for you to start a textbook exchange
                </p>
              </div>
            </div>
          </div>
          <div className="whatWereAbout" id="whatWereAbout">
            <div className="whatWereAboutInfo" id="whatWereAboutInfo">
              <h2 className="whatWereAboutHeader animated" id="whatWereAboutHeader">WHAT WE&apos;RE ALL ABOUT</h2>
              <br />
              <div className="blurbBlock" id="smartPeopleBlock">
                <div className="smartPeopleBlock animated">
                  <h2 className="smartPeopleBlockHeader animated">SMART SHOPPING FOR SMART PEOPLE</h2>
                  <div className="whatWereAboutText" >
                    <p>
                      Leave it to our smart search system to meet your needs and do the work for you. Why? So you can have
                      more time to spend living that beautiful college life!
                    </p>
                  </div>
                </div>
                <div className="slideInPhotoRight animated" id="smartPeopleBlockPhoto">
                  <img src={picOne} alt="students" />
                </div>
              </div>

              <br />
              <div className="blurbBlock" id="helpingOthersBlock">
                <div className="helpingOthersBlock animated">
                  <h2 className="helpingOthersBlockHeader animated">WHILE HELPING OTHERS</h2>
                  <div className="whatWereAboutText">
                    <p>
                      When books on the BarterOut platform fail to sell, we give the seller the
                      option to donate the book, helping financially disadvantaged
                      students in the community.
                    </p>
                  </div>
                </div>
                <div className="slideInPhotoLeft animated" id="helpingOthersBlockPhoto">
                  <img src={picTwo} alt="students" />
                </div>
              </div>

              <br />
              <div className="blurbBlock" id="fastCheapEasyBlock">
                <div className="fastCheapEasyBlock animated">
                  <h2 className="fastCheapEasyBlockHeader animated">EASY, FAST &amp; CHEAP</h2>
                  <div className="whatWereAboutText">
                    <p>
                      Because we care about you, we have built an easy-to-use system capable
                      of providing you with the textbooks you need as fast as possible.
                      In order to make this dream a reality we take a small share of every
                      transaction to keep our servers running.
                    </p>
                  </div>
                </div>
                <div className="slideInPhotoRight animated" id="fastCheapEasyBlockPhoto">
                  <img src={picThree} alt="students" />
                </div>
              </div>
            </div>
            <div className="blurbBlock">
              <Link to="/signup" href="/signup" className="buttonLink">
                <button className="barterOutButton animated" id="joinTodayButton" href="/signup">JOIN TODAY</button>
              </Link>
            </div>
          </div>
          <div className="teamPage" id="teamPage">
            <div>
              <h2 className="animated" id="meetOurTeamHeader">MEET OUR TEAM</h2>
              <div className="teamTextTop animated">
                <br />
                A company created by students, all to benefit... well... students
              </div>
              <table className="staffPhotos">
                <tbody>
                  <tr className="animated" id="rowOne">
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/vladcazacu/" rel="noopener noreferrer" target="_blank"><img alt="Team Profile" className="team" src={vlad} /></a>
                        <br />
                        <div className="profileName">Vlad Cazacu</div>
                        Co-founder &amp; CEO
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/pavel-stan-232911140/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={pavel} />
                        </a>
                        <br />
                        <div className="profileName">Pavel Stan</div>
                        Co-founder &amp; Director
                        <br />
                        of External Relations
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/annmarie-hamburgen-9ab65a12b/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={annie} />
                        </a>
                        <br />
                        <div className="profileName">Annie Hamburgen</div>
                        CMO
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/duncan-grubbs-01979a14a/" rel="noopener noreferrer" target="_blank"><img alt="Team Profile" className="team" src={duncan} /></a>
                        <br />
                        <div className="profileName">Duncan Grubbs</div>
                        Interim CTO
                      </div>
                    </td>
                  </tr>
                  <tr className="animated" id="rowTwo">
                    <td>
                      <div className="profile">
                        <img alt="Team Profile" className="staff" src={daniel} />
                        <br />
                        <div className="profileName">Daniel Munoz</div>
                        Full-Stack Developer
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/zixu-chen/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={shawn} />
                        </a>
                        <br />
                        <div className="profileName">Zixu (Shawn) Chen</div>
                        Backend Developer
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/melissa-k-7080ba103/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={melissa} />
                        </a>
                        <br />
                        <div className="profileName">Melissa Kagaju</div>
                        Android Developer
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/genessis-galindo/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={genessis} />
                        </a>
                        <br />
                        <div className="profileName">Genessis Galindo</div>
                        Marketing Analyst
                      </div>
                    </td>
                  </tr>
                  <tr className="animated" id="rowThree">
                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/sam-hirschhorn-03029a7a/" rel="noopener noreferrer" target="_blank">
                          <img alt="Team Profile" className="team" src={logo} />
                        </a>
                        <br />
                        <div className="profileName">Sam Hirschhorn</div>
                        Video Marketer
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <img alt="Team Profile" className="staff" src={logo} />
                        <br />
                        <div className="profileName">Tristan De Lange</div>
                        Frontend Developer
                      </div>
                    </td>

                    <td>
                      <div className="profile">
                        <a href="https://www.linkedin.com/in/nikolai-draganov-314986161/" rel="noopener noreferrer" target="_blank"><img alt="Team Profile" className="team" src={nikolai} /></a>
                        <br />
                        <div className="profileName">Nikolai Draganov</div>
                        Marketing Strategist
                      </div>
                    </td>
                    <td>
                      <div className="profile">
                        <img alt="Team Profile" className="staff" src={zacqueline} />
                        <br />
                        <div className="profileName">Zacqueline Baldwin (ZQ)</div>
                        Marketing Intern
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="teamTextBottom animated" id="teamTextBottom">
                <br />
                Interested in working with us?
                <br />
                <a className="buttonLink" href="/careers"><button className="barterOutButton animated" id="applyButtonOne">Apply Now</button></a>
              </div>
            </div>
            <br />
            <div>
              <h2 className="animated" id="meetOurAdvisersHeader">AND OUR ADVISERS</h2>
              <div className="adviserPageText" id="adviserPageText">
                <div className="adviserTextTop animated">
                  <br />
                  Because any team needs some guidance from time to time
                </div>
                <table className="adviserPhotos animated">
                  <tbody>
                    <tr>
                      <td>
                        <div className="profile">
                          <a href="https://www.linkedin.com/in/elizabeth-meyer-3483411b/" rel="noopener noreferrer" target="_blank">
                            <img alt="Team Profile" className="team" src={adviserOne} />
                          </a>
                          <br />
                          <div className="profileName">Elizabeth Meyer</div>
                          Strategy Advisor
                          <br />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="adviserTextBottom animated">
                  <br />
                  Interested in helping us grow?
                  <br />
                  <a className="buttonLink" href="https://goo.gl/forms/tAXa5huk9hAcaNSH2" rel="noopener noreferrer" target="_blank">
                    <button className="barterOutButton animated" id="applyButtonTwo">Apply Now</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="landingPageBottom">
            <div id="bottomLinksCol1">
              <div className="bottomLinkHeader">Company</div>
              <a href="/careers" className="bottomPageLink">Careers</a>
              <br />
              <a href="/contact" className="bottomPageLink">Contact</a>
              <br />
            </div>
            <div id="bottomLinksCol2">
              <div className="bottomLinkHeader">Resources</div>
              <a href="/termsOfService" className="bottomPageLink">Terms of Service</a>
              <br />
              <a href="/privacyPolicy" className="bottomPageLink">Privacy Policy</a>
            </div>
          </div>
          <div id="socialMedia">
            <a href="https://www.linkedin.com/company/18490388/" rel="noopener noreferrer" target="_blank">
              <img alt="logo" className="logoImage" src={linkedInLogo} />
            </a>
            <a href="https://www.facebook.com/BarterOut/" rel="noopener noreferrer" target="_blank">
              <img alt="facebook logo" className="logoImage" src={facebookLogo} />
            </a>
            <a href="https://www.instagram.com/barteroutofficial/" rel="noopener noreferrer" target="_blank">
              <img alt="instagram logo" className="logoImage" src={instagramLogo} />
            </a>
          </div>
          <div id="copyright">
            © 2018 BarterOut. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  }
}


export default LandingPage;

// $(document).ready(() => {
//   $('.madeSimpleInfo').css('opacity', 0);
//   $('.howItWorksText').css('opacity', 0);
//   $('.whatWereAboutHeader').css('opacity', 0);
//   $('#smartPeopleBlock').css('opacity', 0);
//   $('#helpingOthersBlock').css('opacity', 0);
//   $('#fastCheapEasyBlock').css('opacity', 0);
//   $('#joinTodayButton').css('opacity', 0);
//   $('#joinTodayButton').css('opacity', 0);
//   $('#meetOurTeamHeader').css('opacity', 0);
//   $('.teamTextTop').css('opacity', 0);
//   $('#rowOne').css('opacity', 0);
//   $('#rowTwo').css('opacity', 0);
//   $('#rowThree').css('opacity', 0);
//   $('#rowFive').css('opacity', 0);
//   $('.teamTextBottom').css('opacity', 0);
//   $('#meetOurAdvisersHeader').css('opacity', 0);
//   $('#adviserPageText').css('opacity', 0);
//   $('#registrationPageInfo').css('opacity', 0);

//   const madeSimpleAnimations = new Waypoint({
//     element: document.getElementById('madeSimpleInfo'),
//     handler: () => {
//       $('.madeSimpleInfo').css('opacity', 100);
//       $('.madeSimpleHeader').addClass('fadeIn');
//       $('.madeSimpleText').addClass('fadeInUp');
//     },
//     offset: '75%',
//   });
//   const howItWorksAnimations = new Waypoint({
//     element: document.getElementById('howItWorksInfo'),
//     handler: () => {
//       $('.howItWorksText').css('opacity', 100);
//       $('.howItWorksHeader').addClass('fadeInLeft');
//       $('.howItWorksText').addClass('fadeInLeft');
//     },
//     offset: '50%',
//   });
//   const whatWereAboutHeaderAnimations = new Waypoint({
//     element: document.getElementById('whatWereAboutHeader'),
//     handler: () => {
//       $('#whatWereAboutHeader').css('opacity', 100);
//       $('#whatWereAboutHeader').addClass('fadeIn');
//     },
//     offset: '70%',
//   });
//   const smartPeopleBlockAnimations = new Waypoint({
//     element: document.getElementById('smartPeopleBlock'),
//     handler: () => {
//       $('#smartPeopleBlock').css('opacity', 100);
//       $('.smartPeopleBlock').addClass('fadeInLeft');
//       $('.smartPeopleBlockHeader').addClass('fadeInLeft');
//       $('#smartPeopleBlockPhoto').addClass('fadeInRight');
//     },
//     offset: '60%',
//   });
//   const helpingOthersBlockAnimations = new Waypoint({
//     element: document.getElementById('helpingOthersBlock'),
//     handler: () => {
//       $('#helpingOthersBlock').css('opacity', 100);
//       $('.helpingOthersBlock').addClass('fadeInRight');
//       $('.helpingOthersBlockHeader').addClass('fadeInRight');
//       $('#helpingOthersBlockPhoto').addClass('fadeInLeft');
//     },
//     offset: '60%',
//   });
//   const fastCheapEasyBlockAnimations = new Waypoint({
//     element: document.getElementById('fastCheapEasyBlock'),
//     handler: () => {
//       $('#fastCheapEasyBlock').css('opacity', 100);
//       $('.fastCheapEasyBlock').addClass('fadeInLeft');
//       $('.fastCheapEaskBlockHeader').addClass('fadeInLeft');
//       $('#fastCheapEasyBlockPhoto').addClass('fadeInRight');
//     },
//     offset: '60%',
//   });
//   const joinTodayButtonAnimations = new Waypoint({
//     element: document.getElementById('joinTodayButton'),
//     handler: () => {
//       $('#joinTodayButton').css('opacity', 100);
//       $('#joinTodayButton').addClass('fadeIn');
//     },
//     offset: '85%',
//   });
//   const meetOurTeamHeaderAnimations = new Waypoint({
//     element: document.getElementById('meetOurTeamHeader'),
//     handler: () => {
//       $('#meetOurTeamHeader').css('opacity', 100);
//       $('#meetOurTeamHeader').addClass('fadeIn');
//       $('.teamTextTop').css('opacity', 100);
//       $('.teamTextTop').addClass('fadeInDown');
//       $('#rowOne').css('opacity', 100);
//       $('#rowOne').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamRowTwoAnimation = new Waypoint({
//     element: document.getElementById('rowTwo'),
//     handler: () => {
//       $('#rowTwo').css('opacity', 100);
//       $('#rowTwo').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamRowThreeAnimation = new Waypoint({
//     element: document.getElementById('rowThree'),
//     handler: () => {
//       $('#rowThree').css('opacity', 100);
//       $('#rowThree').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
//   const teamTextBottomAnimation = new Waypoint({
//     element: document.getElementById('teamTextBottom'),
//     handler: () => {
//       $('.teamTextBottom').css('opacity', 100);
//       $('.teamTextBottom').addClass('fadeInUp');
//     },
//     offset: '80%',
//   });
//   const meetOurAdvisers = new Waypoint({
//     element: document.getElementById('meetOurAdvisersHeader'),
//     handler: () => {
//       $('#meetOurAdvisersHeader').css('opacity', 100);
//       $('#meetOurAdvisersHeader').addClass('fadeIn');
//       $('#adviserPageText').css('opacity', 100);
//       $('.adviserTextTop').addClass('fadeInDown');
//       $('.adviserPhotos').addClass('fadeIn');
//       $('.adviserTextBottom').addClass('fadeInUp');
//       $('.applyButtonTwo').addClass('fadeIn');
//     },
//     offset: '60%',
//   });
// });
