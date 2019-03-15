import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Students } from '../../api/students.js';

import Student from '../Student/index.js';

import AccountsUIWrapper from './../AccountsUIWrapper.js';

class Teacher extends Component {

    constructor(props) {
        super(props);
        this.state={rightBoard: false };
    };

    renderStudents() {
      return this.props.students.map((student) => (
        <Student key={student._id} student={student} />
      ));
    };

    addStudent(event) {
      event.preventDefault();
      const firstname = ReactDOM.findDOMNode(this.refs.firstname).value.trim();
      const lastname = ReactDOM.findDOMNode(this.refs.lastname).value.trim();
      if (firstname !== '' && lastname !== '' ){
          Meteor.call('insertNewStudent', firstname, lastname, (err, res)=>{
              if(!err){
                  ReactDOM.findDOMNode(this.refs.firstname).value="";
                  ReactDOM.findDOMNode(this.refs.lastname).value="";
              }
          });
      }
    }


    render(){
      return(
          <div>
            <div className="leftsider">
              <div className="profile">
                <p><img src="/images/avatar.png" alt="profile"/>
                TeacherName</p>
                <p><AccountsUIWrapper /></p>
              </div>
              <div className="new-student">
                <form className="studentsform" onSubmit={this.addStudent.bind(this)}>
                      <input
                          type="text"
                          ref="firstname"
                          placeholder ="Firstname's child" />
                      <input
                          type="text"
                          ref="lastname"
                          placeholder ="Lastname's child" />
                    <button type="submit">Add your child</button>
                </form>
              </div>
              <div className="schedule">
                <button className="schedulebutton">Schedule</button>
              </div>
              <div className="studentslist">
                <ol>
                  {this.renderStudents()}
                </ol>
              </div>

            </div>
            <div className="topclock">
                topclock
            </div>
            <div className="table">
                Table
            </div>
            <div className="rightsider ">
                menu with pictures
            </div>
          </div>
      );
    }
}

export default withTracker(() => {
  Meteor.subscribe('students');
  return{
    students: Students.find({}).fetch(),
  };
})(Teacher);