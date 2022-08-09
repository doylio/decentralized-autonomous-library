// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../interfaces/ICatalogue.sol";

contract Catalogue is ERC1155, ICatalogue {
    mapping(uint256 => string) public names;
    mapping(uint256 => string) public authors;

    constructor() ERC1155("") {}

    function createAndSupplyBooks(
        uint256[] calldata _ISBNs,
        string[] calldata _names,
        string[] calldata _authors,
        uint256[] memory _amounts
    ) external {
        require(
            _names.length == _ISBNs.length && _ISBNs.length == _authors.length && _authors.length == _amounts.length,
            "Catalogue: arrays must be of equal length"
        );
        for (uint256 i = 0; i < _names.length; i++) {
            _createBookCollection(_ISBNs[i], _names[i], _authors[i]);
        }
        _mintBatch(msg.sender, _ISBNs, _amounts, "");
    }

    function supplyBooks(uint256[] memory _ISBNs, uint256[] memory _amounts) external {
        for (uint256 i = 0; i < _ISBNs.length; i++) {
            if (!doesBookExist(_ISBNs[i])) {
                revert("Catalogue: book with ISBN does not exist");
            }
        }
        _mintBatch(msg.sender, _ISBNs, _amounts, "");
    }

    function _createBookCollection(
        uint256 _ISBN,
        string calldata _name,
        string calldata _author
    ) internal {
        require(!doesBookExist(_ISBN), "Catalogue: book with this ISBN already exists");
        names[_ISBN] = _name;
        authors[_ISBN] = _author;
    }

    function doesBookExist(uint256 _ISBN) public view returns (bool) {
        return bytes(names[_ISBN]).length > 0;
    }
}
