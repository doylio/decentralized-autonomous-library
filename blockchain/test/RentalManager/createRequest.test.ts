import { expect } from "chai";
import { ethers } from "hardhat";
import { Catalogue, RentalManager } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { getTestCatalogue } from "./utils";

describe("RentalManager - createRequest", function () {
    let lib1: SignerWithAddress;
    let lib2: SignerWithAddress;
    let catalogue: Catalogue;
    let rentalManager: RentalManager;
    const lib1Books = getTestCatalogue(0);
    const lib2Books = getTestCatalogue(1);

    beforeEach(async () => {
        [lib1, lib2] = await ethers.getSigners();

        catalogue = await (
            await ethers.getContractFactory("Catalogue")
        ).deploy();
        await catalogue.deployed();

        rentalManager = await (
            await ethers.getContractFactory("RentalManager")
        ).deploy();
        await rentalManager.deployed();

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(
                lib1Books.ISBNs,
                lib1Books.names,
                lib1Books.authors,
                lib1Books.quantities
            );

        await catalogue
            .connect(lib2)
            .createAndSupplyBooks(
                lib2Books.ISBNs,
                lib2Books.names,
                lib2Books.authors,
                lib2Books.quantities
            );
    });

    it("should allow a user to request a book", async () => {
        const ISBN = lib1Books.ISBNs[0];
        const quantity = 1;

        await rentalManager.connect(lib2).createRequest(ISBN, quantity);

        expect(await rentalManager.requestCount()).to.eq(1);
        const request = await rentalManager.requests(0);
        expect(request.ISBN).to.eq(ISBN);
        expect(request.renter).to.eq(lib2.address);
        expect(request.quantity).to.eq(quantity);
    });
});
