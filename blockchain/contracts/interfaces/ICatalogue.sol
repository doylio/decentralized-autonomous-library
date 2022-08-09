// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface ICatalogue is IERC1155 {
    function names(uint256 _ISBN) external view returns (string memory);
    function authors(uint256 _ISBN) external view returns (string memory);

    function createAndSupplyBooks(
        uint256[] calldata _ISBNs,
        string[] calldata _names,
        string[] calldata _authors,
        uint256[] memory _amounts
    ) external;

    function supplyBooks(uint256[] memory _ISBNs, uint256[] memory _amounts) external;

    function doesBookExist(uint256 _ISBN) external view returns (bool);
}
