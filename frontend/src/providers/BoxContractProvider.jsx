import React, { createContext, useContext, useState } from 'react';

import { ethers } from 'ethers'

const BoxContext = createContext();

export function BoxContractProvider({ children }) {
  const [signer, setSigner] = useState()

  function connectWallet() {
    // TODO: Connect to wallet by requesting the user's account
    // setSigner(requestAccount())
    // TODO: Initialise the contract
    // setContract(new ethers.Contract(CONTRACT_ADDRESS, BoxContract.abi, signer))
  }

  const contract = new ethers.Contract(CONTRACT_ADDRESS, BoxContract.abi, signer)

  function storeValue() {
    console.log("TODO: storeValue")
    contract.storeValue()
  }

  function retrieveValue() {
    console.log("TODO: retrieveValue")
    return contract.retrieveValue()
  }

  return (<BoxContext.Provider value={{ signer, storeValue, retrieveValue }}>
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