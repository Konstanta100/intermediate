import React, { Component } from 'react';
import { render } from 'react-dom';

import Teacher from './Teacher';


class App extends Component {

  renderTeacher = ()=>{
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

export default App;