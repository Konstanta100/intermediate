import React, { Component } from 'react';

class Task extends Component {
  render() {
    return (
      <li>{this.props.task.firstname}</li>
    );
  }
}

export default Task;