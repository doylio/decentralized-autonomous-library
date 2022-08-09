import { expect } from "chai";
import { ethers } from "hardhat";
import { Catalogue, RentalManager, TestToken } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getTestCatalogue } from "./utils";

describe("RentalManager - offerRental", function () {
    let lib1: SignerWithAddress;
    let lib2: SignerWithAddress;
    let catalogue: Catalogue;
    let rentalManager: RentalManager;
    let usdc: TestToken;

    beforeEach(async () => {
        [lib1, lib2] = await ethers.getSigners();

        // Setup Catalogues
        const CatalogueFactory = await ethers.getContractFactory("Catalogue");
        catalogue = await CatalogueFactory.deploy();
        await catalogue.deployed();

        const TokenFactory = await ethers.getContractFactory("TestToken");
        usdc = await TokenFactory.deploy();
        await usdc.deployed();

        await usdc.connect(lib1).mint(1000);
        await usdc.connect(lib2).mint(1000);

        const RentalManagerFactory = await ethers.getContractFactory(
            "RentalManager"
        );
        rentalManager = await RentalManagerFactory.deploy(
            usdc.address,
            catalogue.address
        );
    });

    it("should allow a user to offer a rental based on a request", async () => {
        const ISBN = 1298723874623;
        const quantity = 1;
        await rentalManager.connect(lib1).createRequest(ISBN, quantity);

        // await rentalManager.connect(lib2).offerRental();
    });
});
