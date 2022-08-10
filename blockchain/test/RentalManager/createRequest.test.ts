import { expect } from "chai";
import { ethers } from "hardhat";
import { Catalogue, RentalManager, TestToken } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("RentalManager - createRequest", function () {
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
        usdc = await TokenFactory.deploy("Test USDC", "USDC");
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

    it("should allow a user to request a book", async () => {
        const ISBN = 12039234762;
        const quantity = 1;

        await rentalManager.connect(lib2).createRequest(ISBN, quantity);

        expect(await rentalManager.requestCount()).to.eq(1);
        const request = await rentalManager.requests(0);
        expect(request.ISBN).to.eq(ISBN);
        expect(request.renter).to.eq(lib2.address);
        expect(request.quantity).to.eq(quantity);
    });
});
