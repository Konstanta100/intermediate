import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class ScheduleEdit extends Component {

    render() {
        return (
            <div className="ScheduleEdit">
                <p>My Schedule <a className="Edit">Edit</a></p>
            </div>
        );
    }
}

export default ScheduleEdit;