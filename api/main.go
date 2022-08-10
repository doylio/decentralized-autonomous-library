package main

import (
	"api/pkg/ILS"
	"sync"
)

func main() {

	var wg sync.WaitGroup

	wg.Add(1)
	go ILS.StartAPI("8080", "books0.json")

	wg.Add(1)
	go ILS.StartAPI("3030", "books1.json")
	wg.Wait()
}
