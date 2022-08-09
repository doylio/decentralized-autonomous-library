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
    event RequestCreated(uint256 id, address renter, uint256 ISBN, uint256 quantity);

    mapping(uint256 => Rental) public rentals;
    uint256 public rentalCount;
    enum RentalStatus {
        Offered,
        Accepted,
        ShippedTo,
        ShippedBack,
        Rejected,
        Returned
    }
    struct Rental {
        uint256 requestId;
        address loaner;
        uint256 quantity;
        uint256 bond;
        uint256 fee;
        uint256 duration; // In days
        uint256 expires;
        RentalStatus status;
    }
    event RentalCreated(
        uint256 id,
        uint256 requestId,
        address loaner,
        uint256 quantity,
        uint256 bond,
        uint256 fee,
        uint256 duration,
        uint256 expires
    );

    event RentalAccepted(uint256 id);

    event RentalShippedTo(uint256 id, string verificationHash);

    event RentalShippedBack(uint256 id, string verificationHash);

    event RentalReturned(uint256 id);

    constructor(address _paymentToken, address _catalogue) {
        paymentToken = _paymentToken;
        catalogue = _catalogue;
    }

    function createRequest(uint256 _ISBN, uint256 _amount) external {
        require(ICatalogue(catalogue).doesBookExist(_ISBN), "Catalogue: book with this ISBN does not exist");
        uint256 requestId = requestCount++;
        requests[requestId] = Request(msg.sender, _ISBN, _amount);
        emit RequestCreated(requestId, msg.sender, _ISBN, _amount);
    }

    function offerRental(
        uint256 _requestId,
        uint256 _quantity,
        uint256 _bond,
        uint256 _fee,
        uint256 _duration,
        uint256 _expires
    ) external {
        require(_requestId < requestCount, "RentalManager: request with this id does not exist");
        Request memory request = requests[_requestId];
        require(
            ICatalogue(catalogue).balanceOf(msg.sender, request.ISBN) >= _quantity,
            "RentalManager: not enough books in catalogue"
        );
        uint256 rentalId = rentalCount++;
        rentals[rentalId] = Rental(
            _requestId,
            msg.sender,
            _quantity,
            _bond,
            _fee,
            _duration,
            _expires,
            RentalStatus.Offered
        );
        emit RentalCreated(rentalId, _requestId, msg.sender, _quantity, _bond, _fee, _duration, _expires);
    }

    function acceptOffer(uint256 _rentalId) external {
        (Request memory request, Rental memory rental) = _getRequestAndRental(_rentalId);

        _verifyRenter(request);
        require(rental.status == RentalStatus.Offered, "RentalManager: rental is not offered");
        require(rental.expires < block.timestamp, "RentalManager: this offer is expired");

        rentals[_rentalId].status = RentalStatus.Accepted;

        // transfer the fee & bond to this contract
        IERC20(paymentToken).transferFrom(request.renter, address(this), rental.fee + rental.bond);

        emit RentalAccepted(_rentalId);
    }

    function markShippedTo(uint256 _rentalId, string calldata _verificationHash) external {
        (Request memory request, Rental memory rental) = _getRequestAndRental(_rentalId);
        _verifyLoaner(rental);

        require(rental.status == RentalStatus.Accepted, "RentalManager: rental is not accepted");

        rentals[_rentalId].status = RentalStatus.ShippedTo;

        ICatalogue(catalogue).safeTransferFrom(rental.loaner, request.renter, request.ISBN, rental.quantity, "");

        emit RentalShippedTo(_rentalId, _verificationHash);
    }

    function markShippedBack(uint256 _rentalId, string calldata _verificationHash) external {
        (Request memory request, Rental memory rental) = _getRequestAndRental(_rentalId);
        _verifyRenter(request);

        require(rental.status == RentalStatus.ShippedBack, "RentalManager: rental has not been shipped from owner");

        rentals[_rentalId].status = RentalStatus.ShippedBack;

        ICatalogue(catalogue).safeTransferFrom(request.renter, rental.loaner, request.ISBN, rental.quantity, "");

        emit RentalShippedBack(_rentalId, _verificationHash);
    }

    function rentalReturned(uint256 _rentalId) external {
        require(_rentalId < rentalCount, "RentalManager: rental with this id does not exist");
        Rental memory rental = rentals[_rentalId];
        require(rental.status == RentalStatus.Accepted, "RentalManager: rental is not accepted");
        require(rental.loaner == msg.sender, "RentalManager: you are not the loaner");

        rentals[_rentalId].status = RentalStatus.Returned;

        // Return

        emit RentalReturned(_rentalId);
    }

    // INTERNAL FUNCTIONS

    function _getRequestAndRental(uint256 _rentalId)
        internal
        view
        returns (Request memory request, Rental memory rental)
    {
        require(_rentalId < rentalCount, "RentalManager: rental does not exist");
        rental = rentals[_rentalId];
        request = requests[rental.requestId];
        return (request, rental);
    }

    // Making these into modifiers would require multiple expensive storage retrievals
    function _verifyRenter(Request memory _request) internal view {
        require(_request.renter == msg.sender, "RentalManager: must be the renter");
    }

    function _verifyLoaner(Rental memory _rental) internal view {
        require(_rental.loaner == msg.sender, "RentalManager: must be the loaner");
    }
}
