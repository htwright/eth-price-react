import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      balance : null,
      specificBalance: null,
      walletCode: null
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

  fetchSpecificBalance(e) {
    e.preventDefault();
    console.log(e.target.value)
    fetch(`/api/balance/${this.state.walletCode}`).then(data => data.json())
    .then(data => this.setState({specificBalance:data}))
    // .catch(err => console.error(err));
  }

  onTextChange(e) {
    this.setState({walletCode:e.target.value});
  }

  componentDidMount(){
    return this.fetchBalance();
  }

  render() {
    // let balance = this.fetchBalance();
    return (
      <div className="App">
        <span> CURRENT ETH BALANCE FOR ME = {this.state.balance}</span>
        <form className = "wallet-code"  onChange={(e) => this.onTextChange(e)} onSubmit = {e => this.fetchSpecificBalance(e)}>
        <input type='text' />
        <button type = "submit">submit</button>
        </form>
        <span> {this.state.walletCode}'s balace = {this.state.specificBalance}</span>
      </div>
    );
  }
}

export default App;
