import React, { useState } from "react";
import { useBoxContract } from "./providers/BoxContractProvider";

export default function App() {
  return (
    <>
      <ConnectWalletButton />
      <hr />
      <ValueDisplay />
      <hr />
      <StoreValueForm />
    </>
  )
}

function ValueDisplay() {
  const { retrieveValue } = useBoxContract()
  
  const [fetchedValue, setFetchedValue] = useState("(not yet retrieved)")

  async function onRetrieveValue() {
    try {
      // This comes out as a BigInt because it's a uint256 which is bigger than the native JS number type
      // so risks overflow if we don't do this.
      const res = await retrieveValue()
      console.log("onRetrieveValue: res=", res)

      setFetchedValue(res.toString());
    } catch (e) {
      if (e.message === "contract is undefined") {
        // This means the `contract` state variable is 
        alert("Please connect your wallet first!")
      }
    }
  }

  return (
    <div>
      <button onClick={onRetrieveValue}>Retrieve value</button>
      <p>`value` is currently: {fetchedValue}</p>
    </div>
  )
}

function StoreValueForm() {
  const { storeValue } = useBoxContract()

  async function onStoreValueSubmit(e) {
    e.preventDefault()
    console.log("e", e)

    const newValue = e.target.newValue.valueAsNumber
    const res = await storeValue(newValue)

    console.log(res)
  }

  return (
    <form onSubmit={onStoreValueSubmit}>
      <input name="newValue" type="number" />
      <input type="submit" value="Submit" />
    </form>
  )
}

function ConnectWalletButton() {
  const { signer, connectWallet } = useBoxContract()

  if (signer) return <div>Connected with <code>{signer.provider.provider.selectedAddress}</code></div>

  return (<button onClick={connectWallet}>Connect Wallet</button>)
}
