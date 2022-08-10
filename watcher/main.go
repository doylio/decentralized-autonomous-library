package main

import (
	"log"
	"watcher/pkg/listener"

	"github.com/ethereum/go-ethereum/ethclient"
)

type State struct {
}

func main() {
	client, e := ethclient.Dial("https://stardust.metis.io/?owner=588")
	if e != nil {
		log.Fatal(e)
	}

	e = listener.Historical_Filter(client)
	if e != nil {
		log.Fatal(e)
	}
}
