import React, { Component } from 'react';
import './App.css';
import Main from './component/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component {



  render() {
    return (
      // <div className="container">
      <Provider store={store}>
        <BrowserRouter>
          <div >

            {/* <Menu dishes={this.state.dishes} /> */}
            {/* <Counter /> */}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
