import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
    render() {
      return (
        <div>
          <h1>React is running</h1>
        </div>
      );
    }
  }

ReactDOM.render(<App/>, document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}