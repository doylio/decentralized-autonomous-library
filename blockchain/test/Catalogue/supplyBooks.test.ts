import { expect } from "chai";
import { ethers } from "hardhat";
import { Catalogue } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Catalogue - supplyBooks", function () {
    let lib1: SignerWithAddress;
    let lib2: SignerWithAddress;
    let catalogue: Catalogue;

    beforeEach(async () => {
        [lib1, lib2] = await ethers.getSigners();
        catalogue = await (
            await ethers.getContractFactory("Catalogue")
        ).deploy();
        await catalogue.deployed();
    });

    it("should allow a user to supply books", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov", "Cixin Liu"];
        const ISBNs = [12341231, 928374823, 87224123];
        const lib1Amounts = [5, 10, 15];
        const lib2Amounts = [10, 15, 20];

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, lib1Amounts);

        await catalogue.connect(lib2).supplyBooks(ISBNs, lib2Amounts);

        for (let i = 0; i < ISBNs.length; i++) {
            expect(await catalogue.balanceOf(lib1.address, ISBNs[i])).to.equal(
                lib1Amounts[i]
            );
            expect(await catalogue.balanceOf(lib2.address, ISBNs[i])).to.equal(
                lib2Amounts[i]
            );
        }
    });

    it("should revert if the book doesn't exist", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov", "Cixin Liu"];
        const ISBNs = [12341231, 928374823, 87224123];
        const lib1Amounts = [5, 10, 15];

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, lib1Amounts);

        const lib2ISBNs = [...ISBNs, 777777];
        const lib2Amounts = [...lib1Amounts, 100];

        const tx = catalogue.connect(lib2).supplyBooks(lib2ISBNs, lib2Amounts);

        await expect(tx).to.be.reverted;
    });

    it("should revert if the array lengths are unequal", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov", "Cixin Liu"];
        const ISBNs = [12341231, 928374823, 87224123];
        const lib1Amounts = [5, 10, 15];
        const lib2Amounts = [10, 15];

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, lib1Amounts);

        const tx = catalogue.connect(lib2).supplyBooks(ISBNs, lib2Amounts);

        await expect(tx).to.be.reverted;
    });
});
