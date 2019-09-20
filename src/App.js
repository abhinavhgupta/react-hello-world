import React, { Component } from 'react';
import './App.css';
import Main from './component/MainComponent';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      // <div className="container">
      <BrowserRouter>
        <div >

          {/* <Menu dishes={this.state.dishes} /> */}
          {/* <Counter /> */}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
