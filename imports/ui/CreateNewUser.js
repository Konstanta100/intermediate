import React, { Component } from 'react';
import { render } from 'react-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";


class CreateNewUser extends Component {

  addNewUser(event){
      event.preventDefault();
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const number = ReactDOM.findDOMNode(this.refs.number).value.trim();
      if (username !== '' && number !== '' ){
          Meteor.call('insertNewUser', username, number, (err, res)=>{
              if(!err){
                  ReactDOM.findDOMNode(this.refs.username).value="";
                  ReactDOM.findDOMNode(this.refs.number).value="";
              }
          });
      }
  }



  render() {
    return (
        <div className="new-user">
                <form className="create-new-user" onSubmit={this.addNewUser.bind(this)}>
                      <input
                          type="text"
                          ref="username"
                          placeholder ="Username" />
                      <input
                          type="text"
                          ref="number"
                          placeholder ="number" />
                      <button type="submit">Add new User</button>
                </form>
        </div>
    );
  }
}

export default withTracker(() => {
  return {};
})(CreateNewUser);