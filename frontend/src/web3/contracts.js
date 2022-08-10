import CatalogueArtifacts from "./artifacts/contracts/implementations/Catalogue.sol/Catalogue.json";
import RentalManagerArtifacts from "./artifacts/contracts/implementations/RentalManager.sol/RentalManager.json";
import TestTokenArtifacts from "./artifacts/contracts/testUtils/TestToken.sol/TestToken.json";
import { provider } from "./";
import { ethers } from "ethers";
import env from "../env.json";

export const getCatalogue = () => {
  return new ethers.Contract(
    env.CATALOGUE_CONTRACT,
    CatalogueArtifacts.abi,
    provider
  );
};

export const getRentalManager = () => {
  return new ethers.Contract(
    env.RENTAL_MANAGER_CONTRACT,
    RentalManagerArtifacts.abi,
    provider
  );
};

export const getUSDC = () => {
  return new ethers.Contract(
    env.USDC_CONTRACT,
    TestTokenArtifacts.abi,
    provider
  );
};
