import React, { Component } from 'react';


class Task extends Component {

  render() {
    const start = this.props.task.start;
    const lesson = this.props.task.lesson;
    const finish = this.props.task.finish;
    return (
      <li className="taskli">   
        <button className="task" onClick={this.props.onClick}>
        { start  || finish || lesson ?  
          <div>
            <span className="taskTIME">
              {start} - {finish}
            </span>
            <span className="taskLESSON">{lesson}</span>
          </div>  : ''
        }  
        </button> 
        
      </li>
    );
  }
}

export default Task;