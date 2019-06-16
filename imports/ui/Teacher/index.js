import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Students } from '../../api/students.js';
import ScheduleTable from '../ScheduleTable/index.js';
import AccountsUIWrapper from '../AccountsUIWrapper.js';
import Menu from 'antd/lib/menu';
import Avatar from 'antd/lib/avatar';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import 'antd/lib/menu/style'; 
import 'antd/lib/avatar/style'; 
import 'antd/lib/button/style'; 
import 'antd/lib/modal/style';

class Teacher extends Component {

    constructor(props) {
      super(props);
      this.state= {
          owner: null,
          time: ['1','2','3','4','5','6','7','8','9','10'], 
          nowteacher: 0,
          nowstudent: null,
          studentId: null,
          taskId: '',
          visible: false 
      };
    }

    updatetaskId = (value) => {
      this.setState({ taskId: value })
    }

    LeftWeekClick () {
      this.setState({
        taskId: null
      });
      const now = this.state.nowstudent
      const studentId = this.state.studentId;
      if (studentId === null){
        const nowteacher = this.state.nowteacher-1;
        if (nowteacher < 0){
          return;
        } else {
          this.setState({
            nowteacher: nowteacher
          });
        }
      } else {
        if (now > 0){
          const nowstudent =  now - 1;
          Meteor.call("UpdateNowStudent", studentId, nowstudent);
          this.setState({
            nowstudent: nowstudent
          });  
        }  
      }
    }

    RightWeekClick () {
      this.setState({
        taskId: null
      });
      const studentId = this.state.studentId;
      if (studentId === null){
        const nowteacher = this.state.nowteacher + 1;
        this.setState({
          nowteacher: nowteacher
        });
      } else {
        const nowstudent = this.state.nowstudent + 1;
        Meteor.call("UpdateNowStudent", studentId, nowstudent);
        this.setState({
          nowstudent: nowstudent
        });  
      }
    }
    
    studentClick (studentId) {
      this.setState({
        taskId: null
      });
      function filterStudentId(student){
        if (student._id === studentId){
          return true;
        }
        return false;
      }
      const students = this.props.students;
      const filtredStudents=students.filter(filterStudentId);
      const student = filtredStudents.shift();
      const nowstudent = student.now
      this.setState({
        studentId: studentId,
        nowstudent: nowstudent
      });

    }
    
    scheduleClick() {
      this.setState({
        owner: Meteor.userId(),
        taskId: null,
        studentId: null
      });   
      
    } 

    renderStudents() {
      return this.props.students.map((student) => (
        <Menu.Item key={student._id} student={student} onClick={() => this.studentClick(student._id)}>
          <span className='studentSize'>{student.firstname}</span>
        </Menu.Item>
      ));    
    }

    renderScheduleTable(owner, time, nowteacher, nowstudent, studentId, taskId ) {
      return (
        <ScheduleTable 
          owner={owner}
          teacherweek={time[nowteacher]}
          studentweek={time[nowstudent]}
          studentId={studentId}
          taskId={taskId}
          updatetaskId={this.updatetaskId}
         />
      );
        
    }

    addStudent(event) {
      event.preventDefault();
      const firstname = ReactDOM.findDOMNode(this.refs.firstname).value.trim();
      const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
      if (firstname !== '' && number !== '' ){
          Meteor.call('insertNewStudent', firstname, number, (err, res)=>{
              if(!err){
                  ReactDOM.findDOMNode(this.refs.firstname).value="";
                  ReactDOM.findDOMNode(this.refs.number).value="";
              }
          });
      }
    }

    renderTime(studentId, time, nowstudent, nowteacher){
      return (studentId !== null ? time[nowstudent] : time[nowteacher]);
    }

    render(){
      const owner = this.state.owner;
      const time = this.state.time;
      const nowstudent = this.state.nowstudent;
      const nowteacher = this.state.nowteacher;
      const studentId = this.state.studentId;
      const taskId = this.state.taskId;
      return(
          <div>
            <div className="leftsider">
              <div className="profile">
                <div className="Avatar"><Avatar size={64} icon="user" /></div>
                <div className="loginbut"><AccountsUIWrapper/></div>
                
              </div>
              
              <Menu mode="inline" style={{ width: 206 }}>
                <Menu.Item key='Edit' onClick={() => this.scheduleClick()}>
                  <span className='sheduleedit'><strong>My schedule</strong></span><span className="edit">Edit</span>
                </Menu.Item>
                {this.renderStudents()}
              </Menu>  
              <div className="new-student">
                <form className="studentsform" onSubmit={() => this.addStudent()}>
                  <input
                    type="text"
                    ref="firstname"
                    placeholder ="Firstname's child" />
                  <input
                    type="text"
                    ref="number"
                    placeholder ="+7 *** *** **" />
                  <button type="submit">Add your child</button>
                </form>
              </div>
            </div>
            {this.renderScheduleTable(owner, time, nowteacher, nowstudent, studentId, taskId)}
            <div className="Time">
              <button className="LeftWeek" onClick={() => this.LeftWeekClick()}>
              </button>
              <span className="time">2018 Week {this.renderTime(studentId, time, nowstudent, nowteacher)}  </span>
              <button className="RightWeek" onClick={() => this.RightWeekClick()}>
              </button>
            </div>
          </div>
      );
    }
}

export default withTracker(() => {
  
  Meteor.subscribe('students');
  return{
    students: Students.find({teacherId: Meteor.userId()}).fetch(),
    currentUser: Meteor.user(),
    
  };
})(Teacher);