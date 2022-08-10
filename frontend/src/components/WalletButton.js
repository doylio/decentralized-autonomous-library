import React from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export const WalletButton = () => {
  function connectToWallet() {}

  return <button onClick={() => connectToWallet()}>Connect Wallet</button>;
};
