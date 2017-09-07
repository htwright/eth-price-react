import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      balance : 0
    };
  }

  fetchBalance(){
    return fetch('/api/hello')
    .then(data => {
      // console.log(data.json());
      return data.json();
    }).then(data =>{
      return this.setState({balance:data});
    }).catch(err => console.error(err));
  }
  componentDidMount(){
    return this.fetchBalance();
  }

  render() {
    // let balance = this.fetchBalance();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <span> CURRENT ETH BALANCE FOR ME = {this.state.balance}</span>
      </div>
    );
  }
}

export default App;
