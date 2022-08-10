import { createClient } from "wagmi";
import { ethers } from "ethers";
import env from "../env.json";
import { getCatalogue } from "./contracts";

export const provider = new ethers.providers.JsonRpcProvider(env.RPC_URL);

export const client = createClient({
  autoConnect: true,
  provider,
});

export const getTitleFromCatalogue = async (isbn) => {
  const catalogue = getCatalogue();
  const res = await catalogue.connect(provider).names(Number(isbn));
  return res;
};
