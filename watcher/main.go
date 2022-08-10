package main

import (
	"sync"
	"watcher/pkg/listener"
)

var RPC_URL = "https://stardust.metis.io/?owner=588"

func main() {

	s := listener.State{}
	s.RentalsAccepted = make(map[string]listener.RentalAccepted)
	s.RentalsCreated = make(map[string]listener.RentalCreated)
	s.RequestsCreated = make(map[string]listener.RequestCreated)

	var wg sync.WaitGroup

	wg.Add(1)
	go listener.Start(RPC_URL, &s)
	wg.Wait()
}
