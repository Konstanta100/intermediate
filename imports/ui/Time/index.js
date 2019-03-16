import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class Time extends Component {

   constructor(props) {
       super(props);
       this.state={};
   };

   render(){
     return(

         <div className={"Time"}>
             Time
         </div>
     );
   }
}

export default Time;