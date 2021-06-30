import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import { requestAccount } from "../ethereum";

import BoxContract from "/artifacts/contracts/Box.sol/Box.json";

const ContractContext = createContext();

const BOX_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function ContractProvider({ contracts, children }) {
  const { connectedSigner, connectSigner } = useConnectedSigner();
  const { boxContract, connectBoxContract } = useBoxContract();
  const chainId = useChainId();

  // Connect to Box Contract with the up-to-date connected signer
  useEffect(() => {
    if (connectedSigner == null) return;

    console.log(
      `About to connectBoxContract(address=${BOX_CONTRACT_ADDRESS}, signer=${connectSigner})`
    );

    connectBoxContract(BOX_CONTRACT_ADDRESS, connectedSigner);
  }, [connectedSigner]);

  return (
    <ContractContext.Provider
      value={{
        connectWallet: connectSigner,
        signer: connectedSigner,
        chainId,
        boxContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
}

// TODO: Make this generic. We will need to:
// 1. Take in an array of contract objects [{ name: "Box", address: "0x1234...", abi: BoxContract.abi }, { ... }, ...]
//    in our ContractProvider
// 2. In our ContractProvider, `useEffect(connectContracts, [signer])` to (re-)initialise all of our contracts on
//    mount and when `signer` changes
// 3. Pass these contracts to context consumers as `contracts` so that they can access `contracts.box` and run
//    `contracts.box.storeValue()`.

function useGenericContract() {}

function useBoxContract() {
  const [boxContract, setBoxContract] = useState();

  function connectBoxContract(boxContractAddress, signer) {
    const newBoxContract = new ethers.Contract(
      boxContractAddress,
      BoxContract.abi,
      signer
    );

    console.log("boxContract: ", newBoxContract);
    setBoxContract(newBoxContract);
  }

  return { boxContract, connectBoxContract };
}

function useConnectedSigner() {
  const [connectedSigner, setConnectedSigner] = useState();

  async function connectSigner() {
    const signer = await requestAccount();
    setConnectedSigner(signer);
  }

  return { connectedSigner, connectSigner };
}

function useChainId() {
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

  // useEffect(() => {
  //   if (chainId != null) {
  //     console.log("chainId updated!", chainId);
  //   }

  //   // alert("chainId is", chainId);
  // }, [chainId]);

  return chainId;
}

export function useContract() {
  const context = useContext(ContractContext);

  if (context === undefined) {
    throw new Error(
      "To use useContract you must wrap this component or its ancestor in a <BoxContractProvider>"
    );
  }

  return context;
}
