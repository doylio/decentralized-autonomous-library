import { ethers } from "hardhat";
import {
    RentalManager__factory,
    Catalogue__factory,
    TestToken__factory,
} from "../typechain-types";
import addresses from "./addresses.json";

async function main() {
    const [lib1, lib2] = await ethers.getSigners();
    const usdc = TestToken__factory.connect(addresses.usdc, ethers.provider);

    console.log(`Funding account 1...`);
    let tx = await usdc.connect(lib1).mint(ethers.utils.parseEther("10000"));
    await tx.wait();

    console.log(`Funding account 2...`);
    tx = await usdc.connect(lib2).mint(ethers.utils.parseEther("10000"));
    await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
