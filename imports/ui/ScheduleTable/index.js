import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from '../Task/index.js';
import { Tasks } from '../../api/tasks.js';


class ScheduleTable extends Component {

    addTaskToList(day){
        Meteor.call("addTaskToList", day, this.props.owner, this.props.week);
    }

    renderTasks(day) {
      const owner = this.props.owner;
      const week = this.props.week;
      const tasks = this.props.tasks;
    
      function filterByDay(task) {
        if (task.dayofweek === day && task.ownerId===owner && task.weekId===week){
          return true;
        }
        return false;
      }

      const filtredTasks=tasks.filter(filterByDay);
    
      return  filtredTasks.map((task) => (
        <Task key={task._id} task={task} /> 
        ));
    };
    

    render() {
        return (
            <div className="ScheduleTable">
                <div name="monday" className="dayOfWeek">
                    {this.renderTasks('1')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '1')}>
                       <span className="newtask">+ New Task</span> 
                    </button>
                </div>
                <div name="tuesday" className="dayOfWeek">
                    {this.renderTasks('2')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '2')}>
                        <span className="newtask">+ New Task</span>
                    </button>
                </div>
                <div name="wednesday" className="dayOfWeek">
                    {this.renderTasks('3')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '3')}>
                        <span className="newtask">+ New Task</span>
                    </button>                    
                </div>
                <div name="thursday" className="dayOfWeek">
                    {this.renderTasks('4')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '4')}>
                        <span className="newtask">+ New Task</span>
                    </button>
                </div>
                <div name="friday" className="dayOfWeek">
                    {this.renderTasks('5')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '5')}>
                        <span className="newtask">+ New Task</span>
                    </button>
                </div>
                <div name="saturday" className="dayOfWeek">
                    {this.renderTasks('6')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '6')}>
                        <span className="newtask">+ New Task</span>
                    </button>
                </div>
                <div name="sunday" className="dayOfWeek">
                    {this.renderTasks('7')}
                    <button className="addTask" onClick={this.addTaskToList.bind(this, '7')}>
                        <span className="newtask">+ New Task</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return{
    tasks: Tasks.find({authorId: Meteor.userId()}).fetch()
  };
})(ScheduleTable);