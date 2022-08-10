package main

import (
	"context"
	"fmt"
	"log"
	"math/big"
	"os"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var FactoryAddr = common.HexToAddress("0xA6e493c22e07611485D61FFe7856237acD138EC4")
var ABI_Fname = ""

func Sub_Events(client *ethclient.Client) {
	query := ethereum.FilterQuery{
		Addresses: []common.Address{FactoryAddr},
	}
	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(context.Background(), query, logs)
	if err != nil {
		log.Fatal(err)
	}

	for {
		select {
		case err := <-sub.Err():
			log.Fatal(err)
		case vLog := <-logs:
			fmt.Println(vLog)
		}
	}
}

func Historical_Filter(client *ethclient.Client) error {

	f, e := os.Open()
	if e != nil {
		log.Fatal("error opening exchange abi file", e)
	}

	abi, e := abi.JSON(f)
	if e != nil {
		log.Fatal("error loading abi json", e)
	}

	block, e := client.BlockByNumber(context.Background(), nil)
	if e != nil {
		return e
	}

	fmt.Println(block.Number())

	filter := ethereum.FilterQuery{
		FromBlock: big.NewInt(block.Number().Int64() - 100),
		ToBlock:   big.NewInt(block.Number().Int64()),
		Addresses: []common.Address{
			FactoryAddr,
		},
	}

	logs, err := client.FilterLogs(context.Background(), filter)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Found %d logs created between blocks %d -> %d by %s\n", len(logs), filter.FromBlock, filter.ToBlock, filter.Addresses)

	for _, vLog := range logs {
		fmt.Println(vLog.Topics)

		event, e := x.ABI.Unpack(x.EventName, vLog.Data)
		// if e != nil {
		// 	fmt.Println("error unpacking logs", e)
		// 	continue
		// }

	}

	return nil
}

func main() {
	client, e := ethclient.Dial("https://stardust.metis.io/?owner=588")
	if e != nil {
		log.Fatal(e)
	}

	e = Historical_Filter(client)
	if e != nil {
		log.Fatal(e)
	}
}
