import { createClient } from "wagmi";
import { ethers } from "ethers";
import env from "../env.json";

export const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL);

export const client = createClient({
  autoConnect: true,
  provider,
});
