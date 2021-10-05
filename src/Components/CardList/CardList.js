import React, { useEffect, useState } from "react";
import "./CardList.css";
import Web3 from "web3";
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from "../../config";
import Card2 from "../Card/Card2";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function CardList() {
  const [turkeys, setTurkeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTurkeys = async () => {
      const marketplace = new web3.eth.Contract(
        MARKETPLACE_ABI,
        MARKETPLACE_ADDRESS
      );
      let kurkans = [];
      let turkeysLength = await marketplace.methods.turkeysLength().call();
      for (var i = 0; i < turkeysLength; i++) {
        const turkey = await marketplace.methods.turkeys(i).call();
        kurkans.push(turkey);
      }
      setTurkeys(kurkans);
      setLoading(false);
    };

    fetchTurkeys();
  }, []);

  return (
    <div>
      <Card2 turkeys={turkeys} loading={loading}></Card2>
    </div>
  );
}

export default CardList;
