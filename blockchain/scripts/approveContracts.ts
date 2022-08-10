import { ethers } from "hardhat";
import {
    RentalManager__factory,
    Catalogue__factory,
    TestToken__factory,
} from "../typechain-types";
import addresses from "./addresses.json";

async function main() {
    const [lib1, lib2] = await ethers.getSigners();
    const rentalManager = RentalManager__factory.connect(
        addresses.rentalManager,
        ethers.provider
    );
    const usdc = TestToken__factory.connect(addresses.usdc, ethers.provider);
    const catalogue = Catalogue__factory.connect(
        addresses.catalogue,
        ethers.provider
    );

    console.log(`Library 1 approving catalogue...`);
    let tx = await catalogue
        .connect(lib1)
        .setApprovalForAll(rentalManager.address, true);
    await tx.wait();

    console.log(`Library 2 approving catalogue...`);
    tx = await catalogue
        .connect(lib2)
        .setApprovalForAll(rentalManager.address, true);
    await tx.wait();

    console.log(`Library 1 approving USDC...`);
    tx = await usdc
        .connect(lib1)
        .approve(rentalManager.address, ethers.constants.MaxUint256);
    await tx.wait();

    console.log(`Library 2 approving USDC...`);
    tx = await usdc
        .connect(lib2)
        .approve(rentalManager.address, ethers.constants.MaxUint256);
    await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
