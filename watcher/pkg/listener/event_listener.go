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
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/ethclient"
)

var rentalManagerAddress = common.HexToAddress("0xc01F341F646De5e7e9eE244Aa82cd4bF54f385Ec")
var ABI_Fname = "RentalManager.json"

func newClient(URL string) *ethclient.Client {
	client, e := ethclient.Dial(URL)
	if e != nil {
		log.Fatal("Error creating new client: e")
	}
	return client
}
func filterLogs(client *ethclient.Client, s *State, from int64, to int64) error {

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
		FromBlock: big.NewInt(from - 1000),
		ToBlock:   big.NewInt(to),
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
			newRequestCreated := RequestCreated{}
			newRequestCreated.ID = event[0].(*big.Int)
			newRequestCreated.Renter = event[1].(common.Address)
			newRequestCreated.ISBN = event[2].(*big.Int)
			newRequestCreated.Quantity = event[3].(*big.Int)
			s.Lock.Lock()
			s.RequestsCreated[newRequestCreated.ID.String()] = newRequestCreated
			s.Lock.Unlock()
			fmt.Println("OBJECT: ", newRequestCreated)
			continue
		}

		event, e = RentalManagerAbi.Unpack("RentalCreated", vLog.Data)
		if e == nil {
			fmt.Println("RentalCreated: ", event)
			newRentalCreated := RentalCreated{}
			newRentalCreated.ID = event[0].(*big.Int)
			newRentalCreated.RequestID = event[1].(*big.Int)
			newRentalCreated.Loaner = event[2].(common.Address)
			newRentalCreated.Quantity = event[3].(*big.Int)
			newRentalCreated.Bond = event[4].(*big.Int)
			newRentalCreated.Fee = event[5].(*big.Int)
			s.Lock.Lock()
			s.RentalsCreated[newRentalCreated.ID.String()] = newRentalCreated
			fmt.Println("OBJECT: ", newRentalCreated)
			continue
		}

		event, e = RentalManagerAbi.Unpack("RentalAccepted", vLog.Data)
		if e == nil {
			fmt.Println("RentalAccepted: ", event)
			newRentalAccepted := RentalAccepted{}
			newRentalAccepted.ID = event[0].(*big.Int)
			s.Lock.Lock()
			s.RentalsAccepted[newRentalAccepted.ID.String()] = newRentalAccepted
			s.Lock.Unlock()
			continue
		} else {
			fmt.Println("Error unpacking logs: ", e)
		}
	}

	return nil
}

func simWS(headers chan *types.Header, URL string) {
	client := newClient(URL)
	current_head, err := client.HeaderByNumber(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}
	headers <- current_head
	client.Close()

	for {
		client := newClient(URL)
		new_head, err := client.HeaderByNumber(context.Background(), nil)
		if err != nil {
			log.Fatal(err)
		}
		if new_head.Number.Int64() > current_head.Number.Int64() {
			headers <- new_head
			current_head = new_head
		}
		client.Close()
	}
}

func Start(URL string, s *State) {
	headers := make(chan *types.Header, 100)
	go simWS(headers, URL)

	for {
		select {
		// case err := <-sub.Err():
		// 	log.Fatal(err)
		case header := <-headers:
			client := newClient(URL)
			filterLogs(client, s, header.Number.Int64(), header.Number.Int64())
		}
	}
}
