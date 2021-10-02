import React, { Component } from "react";
import "./Card.css";
import turkeyImage from "./turkey.png";
import Web3 from "web3";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../../config";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

export class Card extends Component {
  UNSAFE_componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const accounts = await web3.eth.getAccounts();
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    this.setState({ marketplace });

    const myBalance = await marketplace.methods.balanceOf(accounts[0]).call();
    const turkeyOwner = await marketplace.methods.ownerOf(0).call(); //warning index.js:1 Warning: Each child in a list should have a unique "key" prop.
    const turkey = await marketplace.methods.turkeys(1).call();
    const listing = await marketplace.methods.listings(1).call();
    const purchaseFee = await marketplace.methods.listingPurchaseFee().call();
    this.setState({ purchaseFee });
    const isForSale = listing.status;
    console.log("purchase fee", listing);
    this.setState({ account: accounts[0] });
    this.setState({ turkey });
    this.setState({ isForSale });
    this.setState({ turkeyOwner });
    // console.log("turkey owner:", turkey);
    // console.log("account:", accounts[0]);
    this.setState({ myBalance });
    console.log(turkey);
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      myBalance: "",
      turkeyOwner: "",
      turkey: "",
      listing: "",
      isForSale: "",
      id: "",
    };
    this.createListing = this.createListing.bind(this);
    this.purchaseToken = this.purchaseToken.bind(this);
  }

  async createListing() {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    await marketplace.methods
      .createListing(MARKETPLACE_ADDRESS, 1, "100000000000000000")
      .send({ from: this.state.account });
  }

  async purchaseToken() {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    await marketplace.methods
      .purchase(0)
      .send({ from: this.state.account, value: 1000000000000000 });
  }

  render() {
    return (
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div className="front-card-header">
              <h1 className="turkey-name">KURKAN</h1>
            </div>
            <div className="front-card-content">
              <img src={turkeyImage} alt=""></img>
            </div>
          </div>
          <div className="flip-card-back">
            {this.state.turkeyOwner === this.state.account ? (
              <div>
                <div className="nft-details">
                  <h1>
                    {this.state.turkey.name}
                    {console.log(this.props.id)}
                  </h1>
                  <h4>{this.state.turkey.dna}</h4>
                  <img src={turkeyImage} alt=""></img>
                </div>
                <div className="nft-options">
                  <button type="button" onClick={this.createListing}>
                    SELL FOR 1ETH
                  </button>
                </div>
              </div>
            ) : (
              [
                this.state.isForSale === "1" ? (
                  <div>
                    <div className="nft-details">
                      <h1>{this.state.turkey.name}</h1>
                      <h4>{this.state.turkey.dna}</h4>
                      <img src={turkeyImage} alt=""></img>
                    </div>
                    <div className="nft-options">
                      <button onClick={this.purchaseToken}>BUY NFT</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="nft-details">
                      <h1>{this.state.turkey.name}</h1>
                      <h4>{this.state.turkey.dna}</h4>
                      <img src={turkeyImage} alt=""></img>
                    </div>
                    <div className="nft-options">Not for sale</div>
                  </div>
                ),
              ]
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
