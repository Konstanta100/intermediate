import React, { Component } from 'react';


class Task extends Component {
  //{this.props.task.ownerId}
  render() {
    return (
      <li className="taskli">          
        <button className="task" onClick={this.props.onClick}>
        <span className="takstime">10:00</span>-<span>10:40</span><span className="lesson">Math</span><span className="lesson">: )</span>
        </button>
      </li>
    );
  }
}

export default Task;