import React, { useEffect, useState } from "react";
import "./Card.css";
import turkeyImage from "./turkey.png";
import Web3 from "web3";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../../config";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function Card2(props) {
  const [account, setAccount] = useState();
  const { turkeys, loading, owner } = props;

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    const accounts = await web3.eth.getAccounts();
    const getListing = await marketplace.methods.getListing(0).call();
    console.log(getListing.token);
    setAccount(accounts[0]);
  };

  const createListing = async () => {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    await marketplace.methods
      .createListing(MARKETPLACE_ADDRESS, 1, "100000000000000000")
      .send({ from: account });
  };

  const purchaseToken = async () => {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    await marketplace.methods
      .purchase(0)
      .send({ from: account, value: 100000000000000000 });
  };

  return (
    <div>
      {loading && turkeys.length === 0 ? (
        <h2>...loading</h2>
      ) : (
        <ul className="big-container">
          {turkeys.map(turkey => (
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
                  {owner === account ? (
                    <div>
                      <div className="nft-details">
                        <h1>{turkey.name}</h1>
                        <h4>{turkey.dna}</h4>
                        <img src={turkeyImage} alt=""></img>
                        <h4>You're the owner</h4>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="nft-details">
                        <h1>{turkey.name}</h1>
                        <h4>{turkey.dna}</h4>
                        <img src={turkeyImage} alt=""></img>
                        <h4>Dumbest turkey</h4>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Card2;
