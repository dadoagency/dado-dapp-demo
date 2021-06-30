import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { requestAccount } from "../ethereum";

import BoxContract from "/artifacts/contracts/Box.sol/Box.json";

const BoxContext = createContext();

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function BoxContractProvider({ children }) {
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [chainId, setChainId] = useState();

  useEffect(() => {
    async function initialiseChainId() {
      const newChainId = await ethereum.request({
        method: "eth_chainId",
      });
      setChainId(newChainId);

      ethereum.on("chainChanged", (newChainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        setChainId(newChainId);
      });
    }

    initialiseChainId();

    return () => {
      // cleanup function: remove listener
    };
  }, []);

  useEffect(() => {
    if (chainId != null) {
      console.log("chainId updated!", chainId);
    }

    // alert("chainId is", chainId);
  }, [chainId]);

  // TODO: Rerun this when chain id changes
  async function connectWallet() {
    const newSigner = await requestAccount();
    setSigner(newSigner);

    const newContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      BoxContract.abi,
      newSigner
    );

    console.log("contract: ", newContract);
    setContract(newContract);
  }

  async function storeValue(newValue) {
    console.log(`storeValue(${newValue})`);
    const result = await contract.storeValue(newValue);
    console.log("storeValue result=", result);

    return result;
  }

  async function retrieveValue() {
    console.log("retrieveValue()");
    const result = await contract.retrieveValue();
    console.log("retrieveValue result=", result);

    return result;
  }

  return (
    <BoxContext.Provider
      value={{ signer, chainId, connectWallet, storeValue, retrieveValue }}
    >
      {children}
    </BoxContext.Provider>
  );
}

export function useBoxContract() {
  const context = useContext(BoxContext);

  if (context === undefined) {
    throw new Error(
      "To use useBoxContract you must wrap this component or its ancestor in a <BoxContractProvider>"
    );
  }

  return context;
}
