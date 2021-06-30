import React, { useState } from "react";
import ReactDOM from "react-dom";

import { ContractProvider, useContract } from "./providers/BoxContractProvider";

function App() {
  const [fetchedValue, setFetchedValue] = useState();
  const { boxContract, signer, chainId } = useContract();

  async function onRetrieveValue() {
    const res = await boxContract.retrieveValue();
    console.log("res!", res);
    setFetchedValue(res.toString());
  }

  return (
    <div>
      <div>
        <code>Connected to chainId {chainId}</code>
      </div>
      <hr />
      <ConnectWallet />
      <hr />
      <button onClick={onRetrieveValue}>Retrieve fetchedValue</button>{" "}
      (fetchedValue is here:) {fetchedValue}
      <img src={fetchedValue} />
      <StoreValueForm />
    </div>
  );
}

function StoreValueForm() {
  const { boxContract } = useContract();
  const [newValue, setNewValue] = useState("");

  function onNewValueFormSubmit(e) {
    e.preventDefault();
    console.log("e.target", e.target);

    console.log("about to invoke storeValue!");
    const res = boxContract.storeValue(newValue);
  }

  function onNewValueChange(e) {
    const enteredValue = e.target.value;
    setNewValue(enteredValue);
  }

  return (
    <form onSubmit={onNewValueFormSubmit}>
      <input
        name="newValue"
        type="number"
        value={newValue}
        onChange={onNewValueChange}
      />
      <input type="submit" value="Submit transaction" />
    </form>
  );
}

function ConnectWallet() {
  const { connectWallet, signer } = useContract();

  async function onConnectWalletClick() {
    await connectWallet();
    console.log("signer is", signer);
  }

  if (signer)
    return (
      <p>
        Connected with: <code>{signer.provider.provider.selectedAddress}</code>
      </p>
    );

  return <button onClick={onConnectWalletClick}>Connect Wallet</button>;
}

ReactDOM.render(
  <ContractProvider>
    <App />
  </ContractProvider>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */) {
  undefined /* [snowpack] import.meta.hot */
    .accept();
}
