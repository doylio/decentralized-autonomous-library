package listener

import (
	"fmt"
	"log"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
)

var address_ils = map[common.Address]string{
	common.HexToAddress("0x9B22c7690C3d5278897A1731411566e49c2638Ee"): "http://localhost:3030",
	common.HexToAddress("0xE2c775639031329A0468e262eA7f91eD116Bbc34"): "http://localhost:8080",
}

func getBook(url string, isbn string) {
	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		log.Fatal(err)
	}
	q := req.URL.Query()
	q.Add("id", isbn)
	req.URL.RawQuery = q.Encode()

	fmt.Println(req.URL.String())
}

func addToILS(id *big.Int, s *State) error {
	s.Lock.Lock()
	ren := s.RentalsCreated[id.String()]
	req := s.RequestsCreated[ren.RequestID.String()]
	s.Lock.Unlock()

	renter_addr := req.Renter
	renter_ils := address_ils[renter_addr]

	isbn := req.ISBN

	getBook(renter_ils, isbn.String())
	return nil
}
