require("dotenv").config();
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
    AccountCreateTransaction,
    ContractId,
} = require("@hashgraph/sdk");
const deployment = require("./deployment.json");
const fs = require("fs");
const path = require("path");

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID);
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_PVKEY);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
    const accounts = [];
    for (let i = 0; i < 2; i++) {
        const newAccountPrivateKey = await PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(10000))
            .execute(client);

        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;
        console.log("The new account ID is: " + newAccountId);
        const address = new AccountId(newAccountId).toSolidityAddress();
        console.log("The new account address is: " + address);
        accounts.push({
            id: newAccountId.toString(),
            key: newAccountPrivateKey.toStringRaw(),
            address: address,
        });

        const contractExecTx = await new ContractExecuteTransaction()
            .setContractId(deployment.ids.usdc)
            .setGas(100000)
            .setFunction(
                "mint",
                new ContractFunctionParameters().addUint256(
                    1000000000000000000000
                )
            );

        const submitExecTx = await contractExecTx.execute(client);

        //Get the receipt of the transaction
        const receipt2 = await submitExecTx.getReceipt(client);
        console.log(
            "The funding transaction status is " + receipt2.status.toString()
        );
    }

    fs.writeFileSync(
        path.join(__dirname, "accounts.json"),
        JSON.stringify(accounts)
    );
}

main();
