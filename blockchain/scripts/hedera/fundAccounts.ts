require("dotenv").config();
import {
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
} from "@hashgraph/sdk";
import deployment from "./deployment.json";

// Configure accounts and client
const operatorId = AccountId.fromString(process.env.HEDERA_OPERATOR_ID!);
const operatorKey = PrivateKey.fromString(process.env.HEDERA_OPERATOR_PVKEY!);

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
    const contractExecTx = await new ContractExecuteTransaction()
        .setContractId(deployment.ids.usdc)
        .setGas(100000)
        //Set the contract function to call
        .setFunction("mint", new ContractFunctionParameters().addUint256());

    //Submit the transaction to a Hedera network and store the response
    const submitExecTx = await contractExecTx.execute(client);

    //Get the receipt of the transaction
    const receipt2 = await submitExecTx.getReceipt(client);

    //Confirm the transaction was executed successfully
    console.log("The transaction status is " + receipt2.status.toString());

    //Query the contract for the contract message
    const contractCallQuery = new ContractCallQuery()
        //Set the ID of the contract to query
        .setContractId(newContractId)
        //Set the gas to execute the contract call
        .setGas(100000)
        //Set the contract function to call
        .setFunction("get_message")
        //Set the query payment for the node returning the request
        //This value must cover the cost of the request otherwise will fail
        .setQueryPayment(new Hbar(10));

    //Submit the transaction to a Hedera network
    const contractUpdateResult = await contractCallQuery.execute(client);

    //Get the updated message at index 0
    const message2 = contractUpdateResult.getString(0);

    //Log the updated message to the console
    console.log("The updated contract message: " + message2);
}

main();
