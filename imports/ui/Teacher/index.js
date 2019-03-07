import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Students } from '../../api/students.js';

import Student from '../Student/index.js';

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
    handleSubmit(event) {
      this.setState({rightBoard: !this.state.rightBoard});
    };

    render(){
      return(
        <div className="leftsider">
          <div className="avatar">
            <img src="../lib/images/avatar.png"/>
            <div className="teachername">
                TeacherName
            </div>
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
      );
    }
}

export default withTracker(() => {
  Meteor.subscribe('students');
  return{
    students: Students.find({}).fetch(),
  };
})(Teacher);