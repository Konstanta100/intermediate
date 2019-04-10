import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Students } from '../../api/students.js';
import Student from '../Student/index.js';
import ScheduleTable from '../ScheduleTable/index.js';
import Time from '../Time/index.js';
import RightSider from './RightSider.js';
import AccountsUIWrapper from '../AccountsUIWrapper.js';


class Teacher extends Component {

    constructor(props) {
      super(props);
      this.state= {
          owner: null,
          week: ['1', '2', '3', '4', '5', '6', '7', '8','9','10'], 
          now: 0
      };
      this.studentClick = this.studentClick.bind(this);
      this.scheduleClick = this.scheduleClick.bind(this)
    }

    studentClick (value) {
      const studentId = value;
      this.setState({
        owner: studentId
      });
      
      
    }

    scheduleClick() {
      this.setState({
        owner: Meteor.userId()
      });   
      
    } 

    renderStudents() {
      return this.props.students.map((student) => (
          <Student key={student._id} student={student} onClick={() => this.studentClick(student._id)}/>
      ));
    }

    renderScheduleTable() {
      const owner = this.state.owner;
      const week = this.state.week;
      const now = this.state.now;
      
      return (
        <ScheduleTable owner={owner} week={week[now]} />
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

    render(){
      console.log(this.state.owner)
      return(
          <div>
            <div className="leftsider">
              <div className="profile">
                <p><img src={"/../images/avatar.png"}/><AccountsUIWrapper/></p>
              </div>
                  <div className="new-student">
                    <form className="studentsform" onSubmit={this.addStudent.bind(this)}>
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
                  <div className="ScheduleEdit">
                    <button className="MySchedule" onClick={this.scheduleClick}>
                        <span className="edit">My schedule Edit </span>
                    </button>
                  </div>
                  <div className="studentslist">
                    <ol>
                      {this.renderStudents()}
                    </ol>
                  </div>
            </div>
            {this.renderScheduleTable()}
            <Time />
            <RightSider/>
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