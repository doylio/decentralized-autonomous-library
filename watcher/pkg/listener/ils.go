package listener

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/big"
	"net/http"

	"github.com/ethereum/go-ethereum/common"
)

var address_ils = map[common.Address]string{
	common.HexToAddress("0x9B22c7690C3d5278897A1731411566e49c2638Ee"): "http://localhost:8080",
	common.HexToAddress("0xE2c775639031329A0468e262eA7f91eD116Bbc34"): "http://localhost:3030",
}

func getBook(ils_url string, isbn string) []byte {

	resp, err := http.Get(ils_url + "/bookByID/" + isbn)

	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(string(body))
	return body
}

func postBook(ils_url string, b []byte) {
	isbn := "6134427"
	getBook(ils_url, isbn)

	var jsonMap map[string]string
	json.Unmarshal(b, &jsonMap)
	// // fmt.Println(jsonMap)
	// // fmt.Println(jsonMap["id"])

	// data := url.Values{
	// 	"id":           {jsonMap["id"]},
	// 	"location":     {jsonMap["location"]},
	// 	"status_codes": {jsonMap["status_codes"]},
	// 	"barcode":      {jsonMap["barcode"]},
	// 	"title":        {jsonMap["title"]},
	// 	"author":       {jsonMap["author"]},
	// }

	// fmt.Println(data)

	// data := url.Values{
	// 	"book": {string(book)},
	// }

	resp, err := http.Post(ils_url+"/postBook", "application/json", bytes.NewBuffer(b))
	// resp, err := http.NewRequest("POST", ils_url+"/postBook", bytes.NewBuffer(b))
	resp.Header.Set("Content-Type", "application/json")
	if err != nil {
		log.Fatal(err)
	}

	var res map[string]interface{}

	json.NewDecoder(resp.Body).Decode(&res)

	fmt.Println(res["form"])
	getBook(ils_url, isbn)

}

func addToILS(id *big.Int, s *State) error {
	s.Lock.Lock()
	ren := s.RentalsCreated[id.String()]
	req := s.RequestsCreated[ren.RequestID.String()]
	s.Lock.Unlock()

	renter_addr := req.Renter
	renter_ils := address_ils[renter_addr]

	isbn := req.ISBN

	book_byte := getBook(renter_ils, isbn.String())
	if renter_ils == "http://localhost:3030" {
		postBook("http://localhost:8080", book_byte)
	} else {
		postBook("http://localhost:3030", book_byte)
	}
	return nil
}
