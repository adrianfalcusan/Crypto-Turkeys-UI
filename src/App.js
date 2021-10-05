import React, { Component } from "react";
import "./App.css";
import Card from "./Components/Card/Card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../src/Components/Header/Header";
import Home from "./Pages/Home";
import Web3 from "web3";
import MyKurkeys from "./Pages/MyKurkeys";
import KurkanStore from "./Pages/KurkanStore";

export class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying Metamask!"
      );
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <div className="app__body">
            <Switch>
              <Route path="/" exact component={() => <Home />} />
              <Route
                path="/kurkaniimei"
                exact
                component={() => <MyKurkeys />}
              />
              <Route path="/kurkaan" exact component={() => <Card id="1" />} />
              <Route
                path="/kurkan-store"
                exact
                component={() => <KurkanStore />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
