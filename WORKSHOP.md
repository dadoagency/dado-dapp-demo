# WORKSHOP

Links to refer to:
- https://hardhat.org/getting-started/
- https://www.snowpack.dev/tutorials/react
- https://docs.ethers.io/v5/

## 0. Local blockchain setup
`
0.1 npm init

0.2 Install hardhat.
  ```sh
  npm install --save-dev hardhat
  ```

0.2 Setup hardhat (choose empty config)
  ```sh
  npx hardhat
  ```

  Set `chainId` in the config: https://hardhat.org/metamask-issue.html.

  Run a hardhat node in a different terminal
  ```sh
  npx hardhat node
  ```

0.3 Install ethers and add it to the hardhat config.
  ```sh
  npm i ethers @nomiclabs/hardhat-ethers
  ```

  Add `require("@nomiclabs/hardhat-ethers");` to the top of the config file.


## 1. Backend: Smart Contracts

1.1 Create a contracts/ directory and create a new file called `contracts/contracts/Box.sol`.

1.2 Write a basic contract with
  - uint256 value;
  and two functions to store and retrieve the value.

1.3 Write a deploy script in `contracts/scripts/deploy.js`

1.4 `npm i ethers @nomiclabs/hardhat-ethers` and , which the deploy script will use.

## 2. Frontend: React UI

2.1 Follow https://www.snowpack.dev/tutorials/react and setup React with Snowpack so you can run `npm start`.

2.2 Add the `npm i ethers` dependency.

2.3 Add `frontend/ethereum.js` and implement `requestSigner()`.

2.4 Write `frontend/providers/BoxContractProvider.js` and implement `connectWallet()`, which calls `requestSigner`, and expose wrapped versions of the contract's `storeValue()`, and `retrieveValue()` functions.
  - The provider should keep as state `signer` and `contract` and set these in `connectWallet()`.

2.5 These functions need access to an initialised contract (as a state variable). Import `Box` from `artifacts/...` after you mount `../contracts/artifacts` at `artifacts` in the snowpack config.

2.6 In `frontend/index.js`, wrap `<App />` in the `<BoxContractProvider>`.

2.7 Export the App component from `frontend/App.jsx`. Then write the app. Include a "Connect Wallet" button whose `onClick` triggers `walletConnect` from `useBoxContract()`. When there is a `signer`, show a button to retrieve the value and an input plus button to store the value.
