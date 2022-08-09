package listener

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

func log_helper(client *ethclient.Client, filter *ethereum.FilterQuery) error {
	contractAbi, err := abi.JSON(strings.NewReader(string(store.StoreABI)))
	if err != nil {
		log.Fatal(err)
	}

	logs, e := client.FilterLogs(context.Background(), *filter)
	if e != nil {
		fmt.Println("error filtering logs: ", e)
		return e
	}

	for _, vLog := range logs {
		event, err := contractAbi.Unpack(&event, "ItemSet", vLog.Data)
		if err != nil {
			log.Fatal(err)
		}

		fmt.Println(string(event.Key[:]))   // foo
		fmt.Println(string(event.Value[:])) // bar
	}

}

// scans historical blocks for events
// needs to be started before
func Historical_Filter(client *ethclient.Client) {

}

func Sub_Events(client *ethclient.Client) {
	contractAddress := common.HexToAddress("0x147B8eb97fD247D06C4006D269c90C1908Fb5D54")
	query := ethereum.FilterQuery{
		Addresses: []common.Address{contractAddress},
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
