import { ethers } from "ethers";

export async function requestAccount() {
  if (window.ethereum == null) throw new Error("Please install MetaMask!");

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return signer;
}
