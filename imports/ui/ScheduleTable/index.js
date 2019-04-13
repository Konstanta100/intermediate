import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from '../Task/index.js';
import { Tasks } from '../../api/tasks.js';
import RightSider from '../RightSider/index.js';


class ScheduleTable extends Component {

    constructor(props) {
        super(props);
        this.state= {
            daysOfWeek: [{'1':'monday'},{'2':'tuesday'},{'3':'wendsday'},{'4':'thursday'},{'5':'friday'},{'6':'saturday'},{'7':'sunday'}]
        };
        this.taskClick = this.taskClick.bind(this);
    }

    taskClick(taskId){
      console.log(taskId);

    }

    addTask(day){
      const tasks = this.props.tasks; 
      const owner = this.props.owner;
      const teacherweek = this.props.teacherweek;
      const studentweek = this.props.studentweek;
      const studentId = this.props.studentId;

      function filterByStudent(task){
        if (task.ownerId === studentId && task.weekId === studentweek){
          return true;
        }
        return false;
      }
      const filtredStudent=tasks.filter(filterByStudent);
      console.log(filtredStudent)

      function filterByTeacher(task){
        if (task.ownerId === owner && task.weekId === teacherweek){
          return true;
        }
        return false;
      }
      const filtredTeacher=tasks.filter(filterByTeacher);

      if (studentId === null){
        Meteor.call("addTaskToList", day, owner, teacherweek);
      } 
      if (studentId !==null && filtredTeacher.length !== 0 && filtredStudent.length === 0  ) {
        filtredTeacher.forEach( (task) => (
          Meteor.call("addTaskToList", task.dayofweek, studentId, studentweek)
        ));
        Meteor.call("addTaskToList", day, studentId, studentweek)
      }  
      if (studentId !== null && filtredTeacher.length===0 ) {  
        Meteor.call("addTaskToList", day, studentId, studentweek);   
      }  
      if (studentId !== null && filtredTeacher.length !==0 && filtredStudent.length !== 0 ) {  
        Meteor.call("addTaskToList", day, studentId, studentweek);   
      }  
    }

    renderSchedule(day) {
      const studentweek = this.props.studentweek;
      const tasks = this.props.tasks;  
      const owner = this.props.owner;
      const studentId = this.props.studentId;
      const teacherweek = this.props.teacherweek;

      function filterByStudentId(task){
        if (task.ownerId === studentId && task.weekId === studentweek){
          return true;
        }
        return false;
      }
      const filtredStudent=tasks.filter(filterByStudentId);

      if (filtredStudent.length > 0 ){
        function filterByStudent(task){
          if (task.dayofweek === day && task.ownerId === studentId && task.weekId === studentweek){
            return true;
          }
          return false;
        }
        const tasksStudent=tasks.filter(filterByStudent);
        return tasksStudent.map((task) => (
          <Task key={task._id} task={task} onClick={() => this.taskClick(task._id)} /> 
        )); 
      } else if(filtredStudent.length === 0){  
        function filterByTeacher(task){
          if (task.dayofweek === day && task.ownerId === owner && task.weekId === teacherweek){
            return true;
          }
          return false;
        }
        const tasksTeacher=tasks.filter(filterByTeacher);
        return tasksTeacher.map((task) => (
            <Task key={task._id} task={task} onClick={() => this.taskClick(task._id)} /> 
        ));
      }
    };
 
    render() {
        return (
          <div>
            <div className="ScheduleTable">
              <div name="monday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '1')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('1')}
              </div>
              <div name="tuesday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '2')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('2')}
              </div>
              <div name="wednesday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '3')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('3')}
              </div>
              <div name="thursday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '4')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('4')}
              </div>
              <div name="friday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '5')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('5')}
              </div>
              <div name="saturday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '6')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('6')}
              </div>
              <div name="sunday" className="dayOfWeek">
                <button className="addTask" onClick={this.addTask.bind(this, '7')}>
                <span className="newtask">+ New Task</span> 
                </button>
                {this.renderSchedule('7')}
              </div>      
            </div>  
            <RightSider /> 
          </div>  
        );
    }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return{
    tasks: Tasks.find({authorId: Meteor.userId()}).fetch(),
  };
})(ScheduleTable);

