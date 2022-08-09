import { expect } from "chai";
import { ethers } from "hardhat";
import { Catalogue } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Catalogue - createAndSupplyBooks", function () {
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

    it("should allow a user to create multiple new collections & supply books", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const ISBNs = [12341231, 928374823, 87224123];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov", "Cixin Liu"];
        const amounts = [5, 10, 15];

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, amounts);

        for (let i = 0; i < names.length; i++) {
            expect(await catalogue.doesBookExist(ISBNs[i])).to.equal(true);
            expect(await catalogue.names(ISBNs[i])).to.equal(names[i]);
            expect(await catalogue.authors(ISBNs[i])).to.equal(authors[i]);
            expect(await catalogue.balanceOf(lib1.address, ISBNs[i])).to.equal(
                amounts[i]
            );
        }
    });

    it("should revert if the array lengths are not the same", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const ISBNs = [12341231, 928374823, 87224123];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov"];
        const amounts = [5, 10];

        const tx = catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, amounts);

        await expect(tx).to.be.reverted;
        for (let i = 0; i < ISBNs.length; i++) {
            expect(await catalogue.doesBookExist(ISBNs[i])).to.equal(false);
        }
    });

    it("should revert if the book already exists", async () => {
        const names = ["The Hobbit", "Foundation", "The Three Body Problem"];
        const ISBNs = [12341231, 928374823, 87224123];
        const authors = ["J.R.R. Tolkien", "Isaac Asimov", "Cixin Liu"];
        const amounts = [5, 10, 15];

        await catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, amounts);
        const tx = catalogue
            .connect(lib1)
            .createAndSupplyBooks(ISBNs, names, authors, amounts);

        await expect(tx).to.be.reverted;
    });
});
