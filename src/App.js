import React, { Component } from "react";
import faker from "faker";
import SegmentTree from "./segment-tree";

function createFakeData(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      date: faker.date.past(),
      account: faker.finance.accountName(),
      item: faker.commerce.product(),
      bid: Number(faker.commerce.price()),
      volume: faker.random.number()
    });
  }
  return arr;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: null, 
      start: 0,
      end: 99,
      smallestValue: 0 ,
      sumValue: 0,
      arrayExecTime: 0,
      treeExecTime: 0,
      treeSmallestValue: 0
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createFakeD = () => {
    let data = createFakeData(this.state.counter || 100);
    this.setState({
      items: data,
      counter: this.state.counter || 100
    });
    this.segmentTree = new SegmentTree(data, true, "bid");
  }

  getSmallestBidFromRange = () => {
    var t_start = performance.now();
    const start = parseInt(this.state.start);
    const end = parseInt(this.state.end);
    let smallestValue = this.state.items
      .filter((el, idx) => idx >= start && idx <= end)
      .reduce((acc, curr) => (acc.bid < curr.bid ? acc : curr)).bid;
    this.setState({
      arrayExecTime: performance.now() - t_start,
      smallestValue
    })
  };
  getSumFromRange = () => {
    var t_start = performance.now();
    const start = parseInt(this.state.start);
    const end = parseInt(this.state.end);
    let sum = this.state.items
      .filter((el, idx) => idx >= start && idx <= end)
      .reduce(
        (prev, cur) => {
          prev.bid += cur.bid;
          return prev;
        },
        { bid: 0 }
      ).bid;
    console.log(this.sum);
    let t_end = performance.now() - t_start;
    this.setState({
      arrayExecTime: t_end,
      smallestValue: sum
    });
  };
  getSmallestBidFromRangeSegmentTree = () => {
    var t_start = performance.now();
    const start = parseInt(this.state.start);
    const end = parseInt(this.state.end);
    let treeSmallestValue = this.segmentTree.rangeMinQuery(start, end)
    let t_end = performance.now() - t_start;
    this.setState({
      treeSmallestValue,
      treeExecTime: t_end
    })
  };
  getSumFromRangeSegmentTree = () => {
    var t_start = performance.now();
    const start = parseInt(this.state.start);
    const end = parseInt(this.state.end);
    let treeSmallestValue = this.segmentTree.rangeSumQuery(start, end);
    let t_end = performance.now() - t_start;
    this.setState({
      treeSmallestValue,
      treeExecTime: t_end
    })
  };
  render() {
    return (
      <div className="App center">
        <h3 className="head">Segment Tree</h3>
        <div className="container header-container">
          <input 
            className="input" 
            type="number" 
            placeholder="Enter number" 
            name="counter"
            onChange={this.handleChange}
          />
          <button className="submit" onClick={this.createFakeD}>Create Fake DATA</button>
        </div>
        <div className="container">
          <div className="controls">
            <div className="input-group">
            <input 
              name="start" 
              onChange={this.handleChange} 
              className="input"
              placeholder="Start index"
            />
            <input 
              className="input"
              name="end" 
              onChange={this.handleChange}
              placeholder="End index"
            />
            </div>
            <fieldset className="">
              <legend>Arrays methods</legend>
              <button 
              onClick={this.getSmallestBidFromRange}
              className="submit">Get Min</button>
              <button 
                onClick={this.getSumFromRange}
                className="submit">Get Sum</button>  
              <div className="info">exec time: {this.state.arrayExecTime}</div>    
              <div className="info">value: {this.state.smallestValue}</div>    
            </fieldset>
            <fieldset>
              <legend>Tree methods</legend>
              <button 
                onClick={this.getSmallestBidFromRangeSegmentTree}
                className="submit">
                Get Min
              </button>
            <button 
              onClick={this.getSumFromRangeSegmentTree}
              className="submit">
              Get Sum
            </button>
            <div className="info">exec time: {this.state.treeExecTime}</div>    
            <div className="info">value: {this.state.treeSmallestValue}</div>
            </fieldset>       
          </div>
          <table style={{display: this.state.items ? true : 'none'}}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Account</th>
                <th>Item</th>
                <th>Bid</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items && this.state.items.slice(0, 10).map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.date.toLocaleDateString()}</td>
                    <td>{item.account}</td>
                    <td>{item.item}</td>
                    <td>{item.bid}</td>
                    <td>{item.volume}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;


