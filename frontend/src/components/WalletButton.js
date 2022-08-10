import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export const WalletButton = () => {
  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  if (address)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <div>Connected to {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return <button onClick={() => connect()}>Connect Wallet</button>;
};
