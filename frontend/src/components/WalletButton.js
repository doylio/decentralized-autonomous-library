import React from "react";
import { useAccount } from "wagmi";

export const WalletButton = () => {
  function connectToWallet() {}

  return <button onClick={() => connectToWallet()}>Connect Wallet</button>;
};
