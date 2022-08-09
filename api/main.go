package main

import (
	"api/pkg/ILS"
	"sync"
)

func main() {

	var wg sync.WaitGroup

	wg.Add(1)
	go ILS.StartAPI()
	wg.Wait()
}
