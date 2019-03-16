import React, { Component } from 'react';

class Student extends Component {
  render() {
    return (
      <li>{this.props.student.name.firstname}</li>
    );
  }
}

export default Student;