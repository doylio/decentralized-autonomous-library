!['Logo'](Logo.png)
!['Blockchain Futurist Conference 2022 semi-finalist'](2022.png)
# D.A.L. - Decentralized Autonomous Library
Inter-Library Loans over The Blockchain
## Overview
Public Libraries using something called Inter-Library Loans.  This is when one Public Libary System requests an item from another Public Library System.  Any search done on membership info, item data, etc is done through and ILS (Integrated Library System). There only is a handful of ILS software providers.

These vendors often run on slow, expensive, and outdated software because they know they have a captive market. By querying these systems, we can start to track real-world assets on the blockchain.

This becomes especially handy when one library loans out their materials to another library. By using the DAL, we can allow these organizations to track an item's Title, Author, Availability, and other metadata along their supply chain.

When items are on chain, tracking the movement of these items can also help libraries gather useful statistics about items in their system.  It also allows them to provide access to their items on a much larger geographical scale to help boost their circulation numbers.

Due to their privacy-centric nature, libraries serve as a trust-point for their members and the larger community.
That's why membership data is stored off-chain in an ILS or Database.  Their record-keeping expertise also makes them ideal for KYC for future functionalities in this project idea.

Through our D.A.L. a Librarian:
 - will be able to search for a book and see it's status.
 - will be able to request an item if it isn't in their existing system already.
 - can respond to and fulfill any request for an item by another library.
 - earns fees for responding to requests from other libraries.

## FRONTEND
This is the interface that Librarian would use when:
 - Searching for items and their locally or on-chain
 - Respond to other libraries requests for items
 - Request items for their own library

## ILS API
This is a RESTful API that makes calls to an ILS, to get item information:
 - There are URIs for searching by ISBN(barcode), Author, Title
 - Used to verify item status (Available/Not Available/etc)

## WATCHER
Watches for events in the contracts on-chain and communicates with it.
 - Scans for blocks as they're mined for events from the contract
 - Parses events from the contract and serves them over an API
 - Detects a "RentalAccepted" event and adds the book to another library

## CONTRACTS
### Catalogue.sol
- Creates ERC1155 tokens 
- Uses book metadata for the token
### RentalManager.sol
- Creates requests for items/books
- Tracks item status for requests (offered, accepted, rejected, returned)
- Tracks renters, ISBN, and quantity
- Offers rentals of items based of ISBN, quantity, and a bond/fee offered by the requesters/offerers
- Accepts offers made for items listed in the catalogue


