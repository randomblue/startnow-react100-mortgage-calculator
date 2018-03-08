import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor() {
    super();
    this.state = { 
      balance:'', 
      rate:'',
      term:'',
      submit:'',
      output:'',
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.calculate = this.calculate.bind(this)
  }

  calculate(balance, term, rate){
    term = parseFloat(this.state.term)
    rate = parseFloat(this.state.rate) /100 /12
    // rate /= 100 
    // rate /= 12
    const topHalf = rate * Math.pow((1+rate),(term*12))
    const bottomHalf = Math.pow((1+rate),(term*12)) - 1
    const monthlyP = parseFloat(this.state.balance)*(topHalf/bottomHalf)
    this.setState({
      output:monthlyP
    }, () => console.log(this.state))
  } 
//p = balance r=rate n=ter,
  changeHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    }, () => console.log(this.state))
    
  }

  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <input name='balance' type='number' placeholder='Balance' onChange={this.changeHandler}></input>
        <input name='rate' type='number' step='0.01' placeholder='Rate' onChange={this.changeHandler}></input>
        <select name='term' type='number' onChange={this.changeHandler}>
          <option value='15' type='number'>15</option>
          <option value='30' type='number'>30</option>
        </select>
        <button name='submit' onClick={this.calculate}>Calculate Me</button>
        <div id='output' name='output' type='number'>{Math.round(this.state.output * 100) /100}</div>
      </div>
    );
  }
}