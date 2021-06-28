import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers'

import { requestSigner } from '../ethereum';

import BoxContract from "/artifacts/contracts/Box.sol/Box.json"

const BoxContext = createContext();

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export function BoxContractProvider({ children }) {
  const [signer, setSigner] = useState()
  const [contract, setContract] = useState()

  // TODO Workshop 4: useEffect( check if the wallet has already been connected and if so run connectWallet)

  async function connectWallet() {
    const requestedSigner = await requestSigner()
    // TODO: Connect to wallet by requesting the user's account
    setSigner(requestedSigner)

    // TODO: Initialise the contract
    const deployedBoxContract = new ethers.Contract(CONTRACT_ADDRESS, BoxContract.abi, requestedSigner)
    console.log("deployedBoxContract", deployedBoxContract)
    setContract(deployedBoxContract)
  }

  async function storeValue(value) {
    console.log("storeValue(): ", await contract.storeValue(value))
  }

  async function retrieveValue() {
    const value = await contract.retrieveValue()
    console.log("retrieveValue(): ", value)
    return value
  }

  return (<BoxContext.Provider value={{ connectWallet, signer, storeValue, retrieveValue }}>
    {children}
  </BoxContext.Provider>)
}

export function useBoxContract() {
  const context = useContext(BoxContext)

  if (context === undefined) {
    throw new Error("To use useBoxContract you must wrap this component or its ancestor in a <BoxContractProvider>")
  }

  return context
}