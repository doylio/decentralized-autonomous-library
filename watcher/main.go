package main

import (
	"sync"
	"watcher/pkg/api"
	"watcher/pkg/listener"
)

var RPC_URL = "https://stardust.metis.io/?owner=588"

func newState() *listener.State {
	s := listener.State{}
	s.RentalsAccepted = make(map[string]listener.RentalAccepted)
	s.RentalsCreated = make(map[string]listener.RentalCreated)
	s.RequestsCreated = make(map[string]listener.RequestCreated)
	return &s
}

func main() {

	state := newState()
	var wg sync.WaitGroup

	wg.Add(1)
	go listener.Start(RPC_URL, state)
	wg.Add(1)
	go api.StartAPI(state, "9000")
	wg.Wait()
}
