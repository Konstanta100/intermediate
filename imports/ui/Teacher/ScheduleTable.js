import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class ScheduleTable extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="ScheduleTable">
                ScheduleTable
            </div>
        );
    }
}

export default ScheduleTable;