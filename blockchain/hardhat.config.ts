import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        hardhat: {},
        metis: {
            url: "https://stardust.metis.io/?owner=588",
            accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
        },
    },
};

export default config;
