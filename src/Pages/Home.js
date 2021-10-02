import Web3 from "web3";
import React, { Component } from "react";
import CardList from "../Components/CardList/CardList";
import "./Home.css";

export class Home extends Component {
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
      <div>
        <div>
          <CardList></CardList>
        </div>
      </div>
    );
  }
}

export default Home;
