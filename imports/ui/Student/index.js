import React, { Component } from 'react';

class Student extends Component {
  render() {
    return (
      <li>{this.props.student.name.firstname} {this.props.student.name.lastname}</li>
    );
  }
}

export default Student;