import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BoxContractProvider, useBoxContract } from './providers/BoxContractProvider'

/* Add JavaScript code here! */
console.log("Hello World! You did it! Welcome to Snowpack :D");

function App() {
  const [value, setValue] = useState()
  const { retrieveValue } = useBoxContract()

  async function onRetrieveValue() {
    const res = await retrieveValue();
    setValue(res);
  }

  return (<div>
    <button onClick={onRetrieveValue}>Retrieve value</button> (value is here:) {value}
  </div>)
}

ReactDOM.render(
  <BoxContractProvider>
    <App />
  </BoxContractProvider>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
