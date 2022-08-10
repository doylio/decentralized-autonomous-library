package listener

import (
	"math/big"
	"sync"

	"github.com/ethereum/go-ethereum/common"
)

type State struct {
	RequestsCreated map[string]RequestCreated
	RentalsCreated  map[string]RentalCreated
	RentalsAccepted map[string]RentalAccepted
	Lock            sync.RWMutex
}

type RequestCreated struct {
	ID       *big.Int
	Renter   common.Address
	ISBN     *big.Int
	Quantity *big.Int
}

type RentalCreated struct {
	ID        *big.Int
	RequestID *big.Int
	Loaner    common.Address
	Quantity  *big.Int
	Bond      *big.Int
	Fee       *big.Int
}

type RentalAccepted struct {
	ID *big.Int
}
