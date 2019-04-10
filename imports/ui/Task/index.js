import React, { Component } from 'react';


class Task extends Component {
  //{this.props.task.ownerId}
  render() {
    return (
      <li className="taskli">          
        <button className="task" onClick={this.props.onClick}>
        </button>
      </li>
    );
  }
}

export default Task;