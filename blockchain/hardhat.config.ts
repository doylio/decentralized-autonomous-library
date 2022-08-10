import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const primaryPrivKey = process.env.PRIMARY_PRIVATE_KEY;
const secondaryPrivKey = process.env.SECONDARY_PRIVATE_KEY;

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    networks: {
        hardhat: {},
        metis: {
            url: "https://stardust.metis.io/?owner=588",
            accounts: [`0x${primaryPrivKey}`, `0x${secondaryPrivKey}`],
        },
    },
};

export default config;
