import React, { Component } from 'react';
import logo from '../images/logo.svg';


class About extends Component {
  linkTo(page) {
      return () => {
          this.props.history.push(page)
      }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>About Hercules</h2>
        </div>
        <p className="About">
        </p>
      </div>
    );
  }
}
export default About;