import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


class Student extends Component {



  render() {
    return (
        <li className="studentli">
          <button className="student" onClick={this.props.onClick}>
             {this.props.student.firstname}
          </button>
        </li>
    );
  }
}

export default withTracker(() => {

  return{

  };
})(Student);