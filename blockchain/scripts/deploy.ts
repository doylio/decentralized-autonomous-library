import { ethers } from "hardhat";
import fs from "node:fs";

async function main() {
    const [signer] = await ethers.getSigners();

    const ERC20Factory = await ethers.getContractFactory("TestToken");
    const usdc = await ERC20Factory.deploy("Test USDC", "USDC");
    await usdc.deployed();

    await usdc.connect(signer).mint(ethers.utils.parseEther("1000"));

    console.log(`USDC Deployed: ${usdc.address}`);

    const CatalogueFactory = await ethers.getContractFactory("Catalogue");
    const catalogue = await CatalogueFactory.deploy();
    await catalogue.deployed();

    console.log(`Catalogue deployed: ${catalogue.address}`);

    const RentalManagerFactory = await ethers.getContractFactory(
        "RentalManager"
    );
    const rentalManager = await RentalManagerFactory.deploy(
        usdc.address,
        catalogue.address
    );
    await rentalManager.deployed();

    console.log(`RentalFactory deployed: ${rentalManager.address}`);

    fs.writeFileSync(
        "./deploymentData.json",
        JSON.stringify(
            {
                rentalManager: rentalManager.address,
                usdc: usdc.address,
                catalogue: catalogue.address,
            },
            null,
            2
        )
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
