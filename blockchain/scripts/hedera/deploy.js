require("dotenv").config();
const CatalogueArtifacts = require("../../artifacts/contracts/implementations/Catalogue.sol/Catalogue.json");
const RentalManagerArtifacts = require("../../artifacts/contracts/implementations/RentalManager.sol/RentalManager.json");
const TestTokenArtifacts = require("../../artifacts/contracts/testUtils/TestToken.sol/TestToken.json");

const {
    AccountId,
    PrivateKey,
    Client,
    ContractCreateFlow,
    FileCreateTransaction,
    ContractCreateTransaction,
    ContractFunctionParameters,
    ContractExecuteTransaction,
    ContractCallQuery,
    Hbar,
    ContractId,
} = require("@hashgraph/sdk");
const fs = require("fs");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
    // Deploy catalogue contract
    const contractCreateCatalogue = new ContractCreateFlow()
        .setGas(100000)
        .setBytecode(CatalogueArtifacts.bytecode);
    const txResponse = contractCreateCatalogue.execute(client);
    const receipt = (await txResponse).getReceipt(client);
    const catalogueId = (await receipt).contractId;
    const catalogueAddress = new ContractId(catalogueId).toSolidityAddress();
    console.log(`Catalogue contract created with ID: ${catalogueId}`);
    console.log(`Catalogue contract address: ${catalogueAddress}`);

    // Deploy test token contract
    const contractCreateTestToken = new ContractCreateFlow()
        .setGas(200000)
        .setBytecode(TestTokenArtifacts.bytecode)
        .setConstructorParameters(
            new ContractFunctionParameters()
                .addString("Test USDC")
                .addString("USDC")
        );
    const txResponse2 = contractCreateTestToken.execute(client);
    const receipt2 = (await txResponse2).getReceipt(client);
    const usdcId = (await receipt2).contractId;
    const usdcAddress = new ContractId(usdcId).toSolidityAddress();
    console.log(`Test token contract created with ID: ${usdcId}`);
    console.log(`Test token contract address: ${usdcAddress}`);

    // Deploy rental manager contract
    const contractCreateRentalManager = new ContractCreateFlow()
        .setGas(200000)
        .setBytecode(RentalManagerArtifacts.bytecode)
        .setConstructorParameters(
            new ContractFunctionParameters()
                .addAddress(usdcAddress)
                .addAddress(catalogueAddress)
        );
    const txResponse3 = contractCreateRentalManager.execute(client);
    const receipt3 = (await txResponse3).getReceipt(client);
    const rentalManagerId = (await receipt3).contractId;
    const rentalManagerAddress = new ContractId(
        rentalManagerId
    ).toSolidityAddress();
    console.log(`Rental manager contract created with ID: ${rentalManagerId}`);
    console.log(`Rental manager contract address: ${rentalManagerAddress}`);
}

main();
