const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("deployer.address: ", deployer.address);

  const Box = await ethers.getContractFactory("Box");
  const box = await Box.deploy();

  await box.deployed();

  console.log("Contract is now deployed! ", box.address);
}

main();
