/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Catalogue,
  CatalogueInterface,
} from "../../../contracts/implementations/Catalogue";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "authors",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ISBNs",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "_names",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "_authors",
        type: "string[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "createAndSupplyBooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ISBN",
        type: "uint256",
      },
    ],
    name: "doesBookExist",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "names",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_ISBNs",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_amounts",
        type: "uint256[]",
      },
    ],
    name: "supplyBooks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060200160405280600081525062000033816200003a60201b60201c565b506200016b565b80600290805190602001906200005292919062000056565b5050565b828054620000649062000135565b90600052602060002090601f016020900481019282620000885760008555620000d4565b82601f10620000a357805160ff1916838001178555620000d4565b82800160010185558215620000d4579182015b82811115620000d3578251825591602001919060010190620000b6565b5b509050620000e39190620000e7565b5090565b5b8082111562000102576000816000905550600101620000e8565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200014e57607f821691505b6020821081141562000165576200016462000106565b5b50919050565b6131f2806200017b6000396000f3fe608060405234801561001057600080fd5b50600436106100ce5760003560e01c80634622ab031161008c578063a22cb46511610066578063a22cb46514610247578063dc72f81214610263578063e985e9c514610293578063f242432a146102c3576100ce565b80634622ab03146101cb5780634e1273f4146101fb5780639d18c5111461022b576100ce565b8062fdd58e146100d357806301ffc9a7146101035780630e89341c146101335780632eb2c2d6146101635780633d0518ca1461017f5780633db804da1461019b575b600080fd5b6100ed60048036038101906100e89190611bb0565b6102df565b6040516100fa9190611bff565b60405180910390f35b61011d60048036038101906101189190611c72565b6103a8565b60405161012a9190611cba565b60405180910390f35b61014d60048036038101906101489190611cd5565b61048a565b60405161015a9190611d9b565b60405180910390f35b61017d60048036038101906101789190611fba565b61051e565b005b61019960048036038101906101949190612089565b6105bf565b005b6101b560048036038101906101b09190611cd5565b610660565b6040516101c29190611d9b565b60405180910390f35b6101e560048036038101906101e09190611cd5565b610700565b6040516101f29190611d9b565b60405180910390f35b610215600480360381019061021091906121c4565b6107a0565b60405161022291906122fa565b60405180910390f35b610245600480360381019061024091906123cd565b6108b9565b005b610261600480360381019061025c91906124de565b610a14565b005b61027d60048036038101906102789190611cd5565b610a2a565b60405161028a9190611cba565b60405180910390f35b6102ad60048036038101906102a8919061251e565b610a55565b6040516102ba9190611cba565b60405180910390f35b6102dd60048036038101906102d8919061255e565b610ae9565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610350576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034790612667565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061047357507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610483575061048282610b8a565b5b9050919050565b606060028054610499906126b6565b80601f01602080910402602001604051908101604052809291908181526020018280546104c5906126b6565b80156105125780601f106104e757610100808354040283529160200191610512565b820191906000526020600020905b8154815290600101906020018083116104f557829003601f168201915b50505050509050919050565b610526610bf4565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061056c575061056b85610566610bf4565b610a55565b5b6105ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105a29061275a565b60405180910390fd5b6105b88585858585610bfc565b5050505050565b60005b8251811015610640576105ee8382815181106105e1576105e061277a565b5b6020026020010151610a2a565b61062d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106249061281b565b60405180910390fd5b80806106389061286a565b9150506105c2565b5061065c33838360405180602001604052806000815250610f1e565b5050565b6004602052806000526040600020600091509050805461067f906126b6565b80601f01602080910402602001604051908101604052809291908181526020018280546106ab906126b6565b80156106f85780601f106106cd576101008083540402835291602001916106f8565b820191906000526020600020905b8154815290600101906020018083116106db57829003601f168201915b505050505081565b6003602052806000526040600020600091509050805461071f906126b6565b80601f016020809104026020016040519081016040528092919081815260200182805461074b906126b6565b80156107985780601f1061076d57610100808354040283529160200191610798565b820191906000526020600020905b81548152906001019060200180831161077b57829003601f168201915b505050505081565b606081518351146107e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107dd90612925565b60405180910390fd5b6000835167ffffffffffffffff81111561080357610802611dc2565b5b6040519080825280602002602001820160405280156108315781602001602082028036833780820191505090505b50905060005b84518110156108ae5761087e8582815181106108565761085561277a565b5b60200260200101518583815181106108715761087061277a565b5b60200260200101516102df565b8282815181106108915761089061277a565b5b602002602001018181525050806108a79061286a565b9050610837565b508091505092915050565b86869050858590501480156108d357508282905087879050145b80156108e25750805183839050145b610921576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610918906129b7565b60405180910390fd5b60005b858590508110156109ae5761099b8888838181106109455761094461277a565b5b9050602002013587878481811061095f5761095e61277a565b5b905060200281019061097191906129e6565b8787868181106109845761098361277a565b5b905060200281019061099691906129e6565b61114b565b80806109a69061286a565b915050610924565b50610a0b33888880806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f820116905080830192505050505050508360405180602001604052806000815250610f1e565b50505050505050565b610a26610a1f610bf4565b83836111e1565b5050565b600080600360008481526020019081526020016000208054610a4b906126b6565b9050119050919050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610af1610bf4565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff161480610b375750610b3685610b31610bf4565b610a55565b5b610b76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6d9061275a565b60405180910390fd5b610b83858585858561134e565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b8151835114610c40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3790612abb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610cb0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ca790612b4d565b60405180910390fd5b6000610cba610bf4565b9050610cca8187878787876115ea565b60005b8451811015610e7b576000858281518110610ceb57610cea61277a565b5b602002602001015190506000858381518110610d0a57610d0961277a565b5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610dab576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da290612bdf565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e609190612bff565b9250508190555050505080610e749061286a565b9050610ccd565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610ef2929190612c55565b60405180910390a4610f088187878787876115f2565b610f168187878787876115fa565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610f8e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8590612cfe565b60405180910390fd5b8151835114610fd2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc990612abb565b60405180910390fd5b6000610fdc610bf4565b9050610fed816000878787876115ea565b60005b84518110156110a65783818151811061100c5761100b61277a565b5b602002602001015160008087848151811061102a5761102961277a565b5b6020026020010151815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461108c9190612bff565b92505081905550808061109e9061286a565b915050610ff0565b508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161111e929190612c55565b60405180910390a4611135816000878787876115f2565b611144816000878787876115fa565b5050505050565b61115485610a2a565b15611194576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118b90612d90565b60405180910390fd5b83836003600088815260200190815260200160002091906111b6929190611a65565b5081816004600088815260200190815260200160002091906111d9929190611a65565b505050505050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611250576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161124790612e22565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113419190611cba565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614156113be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113b590612b4d565b60405180910390fd5b60006113c8610bf4565b905060006113d5856117e1565b905060006113e2856117e1565b90506113f28389898585896115ea565b600080600088815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905085811015611489576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161148090612bdf565b60405180910390fd5b85810360008089815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508560008089815260200190815260200160002060008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461153e9190612bff565b925050819055508773ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628a8a6040516115bb929190612e42565b60405180910390a46115d1848a8a86868a6115f2565b6115df848a8a8a8a8a61185b565b505050505050505050565b505050505050565b505050505050565b6116198473ffffffffffffffffffffffffffffffffffffffff16611a42565b156117d9578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b815260040161165f959493929190612ecf565b602060405180830381600087803b15801561167957600080fd5b505af19250505080156116aa57506040513d601f19601f820116820180604052508101906116a79190612f4c565b60015b611750576116b6612f86565b806308c379a0141561171357506116cb612fa8565b806116d65750611715565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161170a9190611d9b565b60405180910390fd5b505b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611747906130b0565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146117d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ce90613142565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff811115611800576117ff611dc2565b5b60405190808252806020026020018201604052801561182e5781602001602082028036833780820191505090505b50905082816000815181106118465761184561277a565b5b60200260200101818152505080915050919050565b61187a8473ffffffffffffffffffffffffffffffffffffffff16611a42565b15611a3a578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b81526004016118c0959493929190613162565b602060405180830381600087803b1580156118da57600080fd5b505af192505050801561190b57506040513d601f19601f820116820180604052508101906119089190612f4c565b60015b6119b157611917612f86565b806308c379a01415611974575061192c612fa8565b806119375750611976565b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161196b9190611d9b565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119a8906130b0565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611a38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a2f90613142565b60405180910390fd5b505b505050505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b828054611a71906126b6565b90600052602060002090601f016020900481019282611a935760008555611ada565b82601f10611aac57803560ff1916838001178555611ada565b82800160010185558215611ada579182015b82811115611ad9578235825591602001919060010190611abe565b5b509050611ae79190611aeb565b5090565b5b80821115611b04576000816000905550600101611aec565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611b4782611b1c565b9050919050565b611b5781611b3c565b8114611b6257600080fd5b50565b600081359050611b7481611b4e565b92915050565b6000819050919050565b611b8d81611b7a565b8114611b9857600080fd5b50565b600081359050611baa81611b84565b92915050565b60008060408385031215611bc757611bc6611b12565b5b6000611bd585828601611b65565b9250506020611be685828601611b9b565b9150509250929050565b611bf981611b7a565b82525050565b6000602082019050611c146000830184611bf0565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b611c4f81611c1a565b8114611c5a57600080fd5b50565b600081359050611c6c81611c46565b92915050565b600060208284031215611c8857611c87611b12565b5b6000611c9684828501611c5d565b91505092915050565b60008115159050919050565b611cb481611c9f565b82525050565b6000602082019050611ccf6000830184611cab565b92915050565b600060208284031215611ceb57611cea611b12565b5b6000611cf984828501611b9b565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611d3c578082015181840152602081019050611d21565b83811115611d4b576000848401525b50505050565b6000601f19601f8301169050919050565b6000611d6d82611d02565b611d778185611d0d565b9350611d87818560208601611d1e565b611d9081611d51565b840191505092915050565b60006020820190508181036000830152611db58184611d62565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b611dfa82611d51565b810181811067ffffffffffffffff82111715611e1957611e18611dc2565b5b80604052505050565b6000611e2c611b08565b9050611e388282611df1565b919050565b600067ffffffffffffffff821115611e5857611e57611dc2565b5b602082029050602081019050919050565b600080fd5b6000611e81611e7c84611e3d565b611e22565b90508083825260208201905060208402830185811115611ea457611ea3611e69565b5b835b81811015611ecd5780611eb98882611b9b565b845260208401935050602081019050611ea6565b5050509392505050565b600082601f830112611eec57611eeb611dbd565b5b8135611efc848260208601611e6e565b91505092915050565b600080fd5b600067ffffffffffffffff821115611f2557611f24611dc2565b5b611f2e82611d51565b9050602081019050919050565b82818337600083830152505050565b6000611f5d611f5884611f0a565b611e22565b905082815260208101848484011115611f7957611f78611f05565b5b611f84848285611f3b565b509392505050565b600082601f830112611fa157611fa0611dbd565b5b8135611fb1848260208601611f4a565b91505092915050565b600080600080600060a08688031215611fd657611fd5611b12565b5b6000611fe488828901611b65565b9550506020611ff588828901611b65565b945050604086013567ffffffffffffffff81111561201657612015611b17565b5b61202288828901611ed7565b935050606086013567ffffffffffffffff81111561204357612042611b17565b5b61204f88828901611ed7565b925050608086013567ffffffffffffffff8111156120705761206f611b17565b5b61207c88828901611f8c565b9150509295509295909350565b600080604083850312156120a05761209f611b12565b5b600083013567ffffffffffffffff8111156120be576120bd611b17565b5b6120ca85828601611ed7565b925050602083013567ffffffffffffffff8111156120eb576120ea611b17565b5b6120f785828601611ed7565b9150509250929050565b600067ffffffffffffffff82111561211c5761211b611dc2565b5b602082029050602081019050919050565b600061214061213b84612101565b611e22565b9050808382526020820190506020840283018581111561216357612162611e69565b5b835b8181101561218c57806121788882611b65565b845260208401935050602081019050612165565b5050509392505050565b600082601f8301126121ab576121aa611dbd565b5b81356121bb84826020860161212d565b91505092915050565b600080604083850312156121db576121da611b12565b5b600083013567ffffffffffffffff8111156121f9576121f8611b17565b5b61220585828601612196565b925050602083013567ffffffffffffffff81111561222657612225611b17565b5b61223285828601611ed7565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61227181611b7a565b82525050565b60006122838383612268565b60208301905092915050565b6000602082019050919050565b60006122a78261223c565b6122b18185612247565b93506122bc83612258565b8060005b838110156122ed5781516122d48882612277565b97506122df8361228f565b9250506001810190506122c0565b5085935050505092915050565b60006020820190508181036000830152612314818461229c565b905092915050565b600080fd5b60008083601f84011261233757612336611dbd565b5b8235905067ffffffffffffffff8111156123545761235361231c565b5b6020830191508360208202830111156123705761236f611e69565b5b9250929050565b60008083601f84011261238d5761238c611dbd565b5b8235905067ffffffffffffffff8111156123aa576123a961231c565b5b6020830191508360208202830111156123c6576123c5611e69565b5b9250929050565b60008060008060008060006080888a0312156123ec576123eb611b12565b5b600088013567ffffffffffffffff81111561240a57612409611b17565b5b6124168a828b01612321565b9750975050602088013567ffffffffffffffff81111561243957612438611b17565b5b6124458a828b01612377565b9550955050604088013567ffffffffffffffff81111561246857612467611b17565b5b6124748a828b01612377565b9350935050606088013567ffffffffffffffff81111561249757612496611b17565b5b6124a38a828b01611ed7565b91505092959891949750929550565b6124bb81611c9f565b81146124c657600080fd5b50565b6000813590506124d8816124b2565b92915050565b600080604083850312156124f5576124f4611b12565b5b600061250385828601611b65565b9250506020612514858286016124c9565b9150509250929050565b6000806040838503121561253557612534611b12565b5b600061254385828601611b65565b925050602061255485828601611b65565b9150509250929050565b600080600080600060a0868803121561257a57612579611b12565b5b600061258888828901611b65565b955050602061259988828901611b65565b94505060406125aa88828901611b9b565b93505060606125bb88828901611b9b565b925050608086013567ffffffffffffffff8111156125dc576125db611b17565b5b6125e888828901611f8c565b9150509295509295909350565b7f455243313135353a2061646472657373207a65726f206973206e6f742061207660008201527f616c6964206f776e657200000000000000000000000000000000000000000000602082015250565b6000612651602a83611d0d565b915061265c826125f5565b604082019050919050565b6000602082019050818103600083015261268081612644565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806126ce57607f821691505b602082108114156126e2576126e1612687565b5b50919050565b7f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60008201527f6572206e6f7220617070726f7665640000000000000000000000000000000000602082015250565b6000612744602f83611d0d565b915061274f826126e8565b604082019050919050565b6000602082019050818103600083015261277381612737565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f436174616c6f6775653a20626f6f6b2077697468204953424e20646f6573206e60008201527f6f74206578697374000000000000000000000000000000000000000000000000602082015250565b6000612805602883611d0d565b9150612810826127a9565b604082019050919050565b60006020820190508181036000830152612834816127f8565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061287582611b7a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156128a8576128a761283b565b5b600182019050919050565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b600061290f602983611d0d565b915061291a826128b3565b604082019050919050565b6000602082019050818103600083015261293e81612902565b9050919050565b7f436174616c6f6775653a20617272617973206d757374206265206f662065717560008201527f616c206c656e6774680000000000000000000000000000000000000000000000602082015250565b60006129a1602983611d0d565b91506129ac82612945565b604082019050919050565b600060208201905081810360008301526129d081612994565b9050919050565b600080fd5b600080fd5b600080fd5b60008083356001602003843603038112612a0357612a026129d7565b5b80840192508235915067ffffffffffffffff821115612a2557612a246129dc565b5b602083019250600182023603831315612a4157612a406129e1565b5b509250929050565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b6000612aa5602883611d0d565b9150612ab082612a49565b604082019050919050565b60006020820190508181036000830152612ad481612a98565b9050919050565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612b37602583611d0d565b9150612b4282612adb565b604082019050919050565b60006020820190508181036000830152612b6681612b2a565b9050919050565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b6000612bc9602a83611d0d565b9150612bd482612b6d565b604082019050919050565b60006020820190508181036000830152612bf881612bbc565b9050919050565b6000612c0a82611b7a565b9150612c1583611b7a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612c4a57612c4961283b565b5b828201905092915050565b60006040820190508181036000830152612c6f818561229c565b90508181036020830152612c83818461229c565b90509392505050565b7f455243313135353a206d696e7420746f20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000612ce8602183611d0d565b9150612cf382612c8c565b604082019050919050565b60006020820190508181036000830152612d1781612cdb565b9050919050565b7f436174616c6f6775653a20626f6f6b20776974682074686973204953424e206160008201527f6c72656164792065786973747300000000000000000000000000000000000000602082015250565b6000612d7a602d83611d0d565b9150612d8582612d1e565b604082019050919050565b60006020820190508181036000830152612da981612d6d565b9050919050565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b6000612e0c602983611d0d565b9150612e1782612db0565b604082019050919050565b60006020820190508181036000830152612e3b81612dff565b9050919050565b6000604082019050612e576000830185611bf0565b612e646020830184611bf0565b9392505050565b612e7481611b3c565b82525050565b600081519050919050565b600082825260208201905092915050565b6000612ea182612e7a565b612eab8185612e85565b9350612ebb818560208601611d1e565b612ec481611d51565b840191505092915050565b600060a082019050612ee46000830188612e6b565b612ef16020830187612e6b565b8181036040830152612f03818661229c565b90508181036060830152612f17818561229c565b90508181036080830152612f2b8184612e96565b90509695505050505050565b600081519050612f4681611c46565b92915050565b600060208284031215612f6257612f61611b12565b5b6000612f7084828501612f37565b91505092915050565b60008160e01c9050919050565b600060033d1115612fa55760046000803e612fa2600051612f79565b90505b90565b600060443d1015612fb85761303b565b612fc0611b08565b60043d036004823e80513d602482011167ffffffffffffffff82111715612fe857505061303b565b808201805167ffffffffffffffff811115613006575050505061303b565b80602083010160043d03850181111561302357505050505061303b565b61303282602001850186611df1565b82955050505050505b90565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b600061309a603483611d0d565b91506130a58261303e565b604082019050919050565b600060208201905081810360008301526130c98161308d565b9050919050565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b600061312c602883611d0d565b9150613137826130d0565b604082019050919050565b6000602082019050818103600083015261315b8161311f565b9050919050565b600060a0820190506131776000830188612e6b565b6131846020830187612e6b565b6131916040830186611bf0565b61319e6060830185611bf0565b81810360808301526131b08184612e96565b9050969550505050505056fea2646970667358221220e82deae66c784bfb1e4aae13d675e04977ca2c609f886a7e1579205a99485dfc64736f6c63430008090033";

type CatalogueConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CatalogueConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Catalogue__factory extends ContractFactory {
  constructor(...args: CatalogueConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Catalogue> {
    return super.deploy(overrides || {}) as Promise<Catalogue>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Catalogue {
    return super.attach(address) as Catalogue;
  }
  override connect(signer: Signer): Catalogue__factory {
    return super.connect(signer) as Catalogue__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CatalogueInterface {
    return new utils.Interface(_abi) as CatalogueInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Catalogue {
    return new Contract(address, _abi, signerOrProvider) as Catalogue;
  }
}
