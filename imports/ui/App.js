import React, { Component } from 'react';
import { render } from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Teacher from './Teacher';
import Parent from './Parent';



class App extends Component {

  renderTeacherOrParent=()=> {
      if (Roles.userIsInRole(Meteor.user(), 'TEACHER')){
        return <Teacher />;

      return <Parent />;
      }
  };

  renderTeacher =()=>{
      return <Teacher/>
  };



  render() {
    return (
      <div className="App">
        {this.renderTeacher()}
      </div>
    );
  }
}

export default withTracker(() => {
  return { 
  };
})(App);