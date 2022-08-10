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

    const ISBN = Math.floor(Math.random() * 100000000);
    const name = "NAME";
    const author = "AUTHOR";
    const bond = ethers.utils.parseEther("10");
    const fee = ethers.utils.parseEther("5");

    const requestId = await rentalManager.requestCount();
    console.log(`Library 1 making request...`);
    let tx = await rentalManager.connect(lib1).createRequest(ISBN, 1);

    console.log(`Library 2 adding to catalogue...`);
    tx = await catalogue
        .connect(lib2)
        .createAndSupplyBooks([ISBN], [name], [author], [1]);
    await tx.wait();

    // console.log(`Library 2 approving book for transfers...`);
    // tx = await catalogue
    //     .connect(lib2)
    //     .setApprovalForAll(rentalManager.address, true);
    // await tx.wait();

    console.log(`Library 2 making offer on request...`);
    const rentalId = await rentalManager.rentalCount();
    tx = await rentalManager.connect(lib2).offerRental(requestId, 1, bond, fee);
    await tx.wait();

    // console.log(`Library 1 approved USDC...`);
    // tx = await usdc
    //     .connect(lib1)
    //     .approve(rentalManager.address, ethers.constants.MaxUint256);
    // await tx.wait();

    console.log(`Library 1 accepts request...`);
    tx = await rentalManager.connect(lib1).acceptOffer(rentalId);
    await tx.wait();

    // console.log(`Library 1 approving book for transfers...`);
    // tx = await catalogue
    //     .connect(lib1)
    //     .setApprovalForAll(rentalManager.address, true);
    // await tx.wait();

    console.log(`Library 2 marks the book as returned...`);
    tx = await rentalManager.connect(lib2).rentalReturned(rentalId);
    await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
