import React, { useEffect, useState } from "react";
import "../Components/CardList/CardList.css";
import Web3 from "web3";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../config";
import Card2 from "../Components/Card/Card2";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function MyKurkeys() {
  const [turkeys, setTurkeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState();
  const [test, setTest] = useState(true);

  useEffect(async () => {
    await getAccount();
    fetchTurkeys();
  }, [account]);

  const getAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const fetchTurkeys = async () => {
    const marketplace = new web3.eth.Contract(
      MARKETPLACE_ABI,
      MARKETPLACE_ADDRESS
    );

    let turkeysLength = await marketplace.methods.turkeysLength().call();
    let kurkans = [];
    for (var i = 0; i < turkeysLength; i++) {
      const turkey = await marketplace.methods.turkeys(i).call();
      console.log("owner", turkey.owner, "account", account);

      if (turkey.owner === account) {
        kurkans.push(turkey);
        console.log("yep");
      } else {
        console.log("nope");
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

export default MyKurkeys;
