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

2.1 Follow https://www.snowpack.dev/tutorials/react

2.2 Write `frontend/providers/EthereumProvider.js`.
