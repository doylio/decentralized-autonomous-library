// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../interfaces/ICatalogue.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RentalManager {
    address public paymentToken;
    address public catalogue;

    mapping(uint256 => Request) public requests;
    uint256 public requestCount;
    struct Request {
        address renter;
        uint256 ISBN;
        uint256 quantity;
    }
    event RequestCreated(
        uint256 id,
        address renter,
        uint256 ISBN,
        uint256 quantity
    );

    mapping(uint256 => Rental) public rentals;
    uint256 public rentalCount;
    enum RentalStatus {
        Offered,
        Accepted,
        Rejected,
        Returned
    }
    struct Rental {
        uint256 requestId;
        address loaner;
        uint256 quantity;
        uint256 bond;
        uint256 fee;
        RentalStatus status;
    }
    event RentalCreated(
        uint256 id,
        uint256 requestId,
        address loaner,
        uint256 quantity,
        uint256 bond,
        uint256 fee
    );

    event RentalAccepted(
        uint256 id
    );

    event RentalReturned(
        uint256 id
    );

    constructor(address _paymentToken, address _catalogue) {
        paymentToken = _paymentToken;
        catalogue = _catalogue;
    }

    function createRequest(uint256 _ISBN, uint256 _amount) external {
        require(ICatalogue(catalogue).doesBookExist(_ISBN), "Catalogue: book with this ISBN does not exist");
        uint256 requestId = requestCount++;
        requests[requestId] = Request(
            msg.sender,
            _ISBN,
            _amount
        );
        emit RequestCreated(
            requestId,
            msg.sender,
            _ISBN,
            _amount
        );
    }

    function offerRental(uint256 _requestId, uint256 _quantity, uint256 _bond, uint256 _fee) external {
        require(_requestId < requestCount, "RentalManager: request with this id does not exist");
        Request memory request = requests[_requestId];
        require(ICatalogue(catalogue).balanceOf(msg.sender, request.ISBN) >= _quantity, "RentalManager: not enough books in catalogue");
        uint256 rentalId = rentalCount++;
        rentals[rentalId] = Rental(
            _requestId,
            msg.sender,
            _quantity,
            _bond,
            _fee,
            RentalStatus.Offered
        );
        emit RentalCreated(
            rentalId,
            _requestId,
            msg.sender,
            _quantity,
            _bond,
            _fee
        );
    }

    function acceptOffer(uint256 _rentalId) external {
        require(_rentalId < rentalCount, "RentalManager: rental with this id does not exist");
        Rental memory rental = rentals[_rentalId];
        require(rental.status == RentalStatus.Offered, "RentalManager: rental is not offered");
        Request memory request = requests[rental.requestId];
        require(request.renter == msg.sender, "RentalManager: you are not the renter");

        rentals[_rentalId].status = RentalStatus.Accepted;

        // transfer the books from the catalogue to the renter
        ICatalogue(catalogue).safeTransferFrom(
            rental.loaner,
            request.renter,
            request.ISBN,
            rental.quantity,
            ""
        );
        // transfer the fee & bond to this contract
        IERC20(paymentToken).transferFrom(request.renter, address(this), rental.fee + rental.bond);

        emit RentalAccepted(
            _rentalId
        );
    }
}
