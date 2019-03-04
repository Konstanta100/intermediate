import React, { Component } from 'react';

class Student extends Component {
  render() {
    return (
      <li>{this.props.student.text}</li>
    );
  }
}

export default Student;