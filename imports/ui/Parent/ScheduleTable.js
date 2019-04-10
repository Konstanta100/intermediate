import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class ScheduleTable extends Component {
    render() {
        return (
            <div className="ScheduleTable">
                {this.props.sheduletable}
            </div>
        );
    }
}

export default ScheduleTable;