import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Students } from '../../api/students.js';


import Student from '../Student/index.js';
import ScheduleTable from './ScheduleTable.js';

import RightSider from './RightSider.js';


import AccountsUIWrapper from './../AccountsUIWrapper.js';

class Parent extends Component {

    constructor(props) {
        super(props);
        this.state= {
            /*time: [{
                boxs: Array(7).fill(null)
            }],
            timelength: time.length,*/
        };

    };

    /*nextweek(week) {
        this.setState({
            timelength: week,

        });

    }*/
    renderStudents() {
      return this.props.students.map((student) => (
        <Student key={student._id} student={student} />
      ));
    };



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

    addTask(event) {
        event.preventDefault();
        Meteor.call('addNewTask')

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
                          ref="number"
                          placeholder ="+7 *** *** **" />
                    <button type="submit">Add your child</button>
                </form>
              </div>
              <ScheduleEdit /* onClick={this.handleClick()} */ />
              <div className="studentslist">
                <ol>
                  {this.renderStudents()}
                </ol>
              </div>

            </div>
            
            <ScheduleTable />
            <RightSider/>
          </div>
      );
    }
}

export default withTracker(() => {
  Meteor.subscribe('students');
  return{
    students: Students.find({}).fetch(),
  };
})(Parent);