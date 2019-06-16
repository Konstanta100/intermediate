import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

class RightSider extends Component {

    constructor(props) {
        super(props);
        this.state= {
            studentId: null,
            value: 'Math',
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    deleteTask(){
        Meteor.call('DeleteTask', this.props.taskId)
    }

    deleteSchedule(){

    }

    addNameWeek(){

    }

    addInformation(event) {
        event.preventDefault();
        const taskId = this.props.taskId;
        const lesson = this.state.value;
        const start = ReactDOM.findDOMNode(this.refs.start).value.trim();
        const finish = ReactDOM.findDOMNode(this.refs.finish).value.trim();
        if ( start !== '' && finish !== '' && lesson){
            Meteor.call('addTaskForInformation',  taskId, lesson, start, finish, (err, res)=>{
                if(!err){
                    ReactDOM.findDOMNode(this.refs.start).value="";
                    ReactDOM.findDOMNode(this.refs.finish).value="";
                }
            });
        }
      }

    render() {
        return (
            <div className="RightSider">
                <div className="new-student">
                { this.props.taskId ? 
                    <form className="studentsform" onSubmit={() => this.addInformation()}>
                          <select className="lesson" value={this.state.value} onChange={() => this.handleChange()}>
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="Geography">Geography</option>
                          </select>
                          <input className="start"
                              type="text"
                              ref="start"
                              placeholder ="Start lesson" />
                          <input className="finish"
                              type="text"
                              ref="finish"
                              placeholder ="End lesson" />          
                        <button className="addInfo"  type="submit"></button>
                    </form>: 
                    <form className="studentsform" onChange={() => this.addNameWeek()}>
                        <input className="start"
                            type="text"
                            ref="start"
                            placeholder ="Week" />      
                    </form>
                }    
                </div>  
                <div className="moves">
                { !this.props.taskId ?     
                    <div>
                        <button className="Copy" onClick={() => this.copySchedule()}>
                            Copy
                        </button> 
                        <button className="Clean" onClick={() => this.deleteSchedule()}>
                            Clean
                        </button>
                        <button className="Paste" onClick={() => this.pasteSchedule()}>
                            Paste
                        </button>
                    </div>    : ''
                }        
                </div>        
                <div className="delete">
                { this.props.taskId ? 
                    <button className="deletebutton" onClick={() => this.deleteTask()}>
                        Delete task
                    </button> : ''
                }    
                </div>  
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('tasks');
    return{};
})(RightSider);