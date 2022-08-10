package listener

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

var rentalManagerAddress = common.HexToAddress("0xc01F341F646De5e7e9eE244Aa82cd4bF54f385Ec")
var ABI_Fname = "RentalManager.json"

func Historical_Filter(client *ethclient.Client) error {

	f, e := os.Open(ABI_Fname)
	if e != nil {
		log.Fatal("error opening exchange abi file", e)
	}

	RentalManagerAbi, e := abi.JSON(f)
	if e != nil {
		log.Fatal("error loading abi json: ", e)
	}

	block, e := client.BlockByNumber(context.Background(), nil)
	if e != nil {
		return e
	}

	fmt.Println(block.Number())

	filter := ethereum.FilterQuery{
		FromBlock: big.NewInt(block.Number().Int64() - 1000),
		ToBlock:   big.NewInt(block.Number().Int64()),
		Addresses: []common.Address{
			rentalManagerAddress,
		},
	}

	logs, err := client.FilterLogs(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Found %d logs created between blocks %d -> %d by %s\n", len(logs), filter.FromBlock, filter.ToBlock, filter.Addresses)

	for _, vLog := range logs {

		event, e := RentalManagerAbi.Unpack("RequestCreated", vLog.Data)
		if e == nil {
			fmt.Println("RequestCreated: ", event)
			continue
		}

		event, e = RentalManagerAbi.Unpack("RentalCreated", vLog.Data)
		if e == nil {
			fmt.Println("RentalCreated: ", event)
			continue
		}

		event, e = RentalManagerAbi.Unpack("RentalAccepted", vLog.Data)
		if e == nil {
			fmt.Println("RentalAccepted: ", event)
			continue
		} else {
			fmt.Println("Error unpacking logs: ", e)
		}
	}

	return nil
}
