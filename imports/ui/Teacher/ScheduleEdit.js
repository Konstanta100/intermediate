import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class ScheduleEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="ScheduleEdit">
                <p>My Schedule <a className="Edit">Edit</a></p>
            </div>
        );
    }
}

export default ScheduleEdit;