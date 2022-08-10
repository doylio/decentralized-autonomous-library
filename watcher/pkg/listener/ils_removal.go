package listener

import "math/big"

func getBook(id *big.Int, s *State) error {
	s.Lock.Lock()
	ren := s.RentalsCreated[id.String()]
	req := s.RequestsCreated[ren.RequestID.String()]
	s.Lock.Unlock()

	isbn := req.ISBN

	_ = isbn
	return nil
}
