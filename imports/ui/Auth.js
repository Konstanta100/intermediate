import React, { Component } from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import AccountsUIWrapper from './AccountsUIWrapper.js';


class Auth extends Component {

  /*addStudent(event) {
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
  findUser(event) {
      event.preventDefault();
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
      if (username !== '' && number !== '' ){
          Meteor.call('findUserInData', username, number, (err, res)=>)


      }
  }
  */


  render() {
    return (
      <div className="Auth">
          <AccountsUIWrapper/>
          /*<form className="authform" onSubmit={this.findUser.bind(this)}>
              <input
                  type="text"
                  ref="firstname"
                  placeholder ="Your username" />
              <input
                  type="text"
                  ref="number"
                  placeholder ="Your number" />
              <button type="submit">Authentication</button>
          </form>
          */
      </div>
    );
  }
}

export default Auth;