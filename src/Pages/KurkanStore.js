import React, { useEffect, useState } from "react";
import "../Components/CardList/CardList.css";
import Web3 from "web3";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../config";
import Card2 from "../Components/Card/Card2";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function KurkanStore() {
  const [turkeys, setTurkeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState();

  useEffect(async () => {
    await getAccount();
  }, [account]);
  useEffect(async () => {
    fetchTurkeys();
  }, []);

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const fetchTurkeys = async () => {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );
    let listingsLength = await marketplace.methods.listingsLength().call();
    console.log(listingsLength);
    let kurkans = [];
    let listing = [];
    let token;
    for (var i = 0; i < listingsLength; i++) {
      listing = await marketplace.methods.listings(i).call();
      token = listing.token;
      if (listing.status == 1) {
        const turkey = await marketplace.methods.turkeys(token).call();
        kurkans.push(turkey);
        setTurkeys(kurkans);
      }
    }

    setTurkeys(kurkans);
    setLoading(false);
  };

  return (
    <div>
      <Card2 turkeys={turkeys} loading={loading}></Card2>
    </div>
  );
}

export default KurkanStore;
