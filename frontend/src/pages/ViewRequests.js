import React, { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { getCatalogue, getRentalManager } from "../web3/contracts";
import { ethers } from "ethers";
import { getBooks, getRequests } from "../api";

const ViewRequests = () => {
  const { data: signer } = useSigner();
  const { data: account } = useAccount();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [bond, setBond] = useState();
  const [fee, setFee] = useState();
  const [hasCreatedTokens, setHasCreatedTokens] = useState(false);

  React.useEffect(() => {
    handleGetRequests();
  }, []);

  const handleGetRequests = async () => {
    try {
      setLoading(true);
      const requests = await getRequests();
      const relevantRequests = await parseAndFilterRequests(requests);
      setRequests(relevantRequests);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const parseAndFilterRequests = async (requests) => {
    const books = await getBooks();

    let parsedRequests = [];
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].Renter === account) {
        // Skip our own requests
        continue;
      }
      const book = books.find((b) => b.id === requests[i].ISBN.toString());
      if (!book) {
        continue;
      }
      parsedRequests.push({
        id: requests[i].ID,
        isbn: requests[i].ISBN,
        quantity: requests[i].Quantity,
        author: book.author,
        title: book.title,
      });
    }
    return parsedRequests;
  };

  const offerRental = async () => {
    try {
      const request = requests.find((r) => r.id === selectedRequestId);
      setSaving(true);

      const tx = await getRentalManager()
        .connect(signer)
        .offerRental(
          request.id,
          request.quantity,
          ethers.utils.parseEther(bond),
          ethers.utils.parseEther(fee)
        );
      await tx.wait();
      setSaving(false);
      window.location = "/offer-success";
    } catch (err) {
      setSaving(false);
      console.error(err);
    }
  };

  const createTokens = async () => {
    try {
      const catalogue = getCatalogue();
      const request = requests.find((r) => r.id === selectedRequestId);
      const tokenExists = await catalogue
        .connect(signer)
        .doesBookExist(request.isbn);
      let tx;
      if (tokenExists) {
        tx = await addSupply(request);
      } else {
        tx = await createAndSupply(request);
      }
      setSaving(true);
      await tx.wait();
      setSaving(false);
      setHasCreatedTokens(true);
    } catch (err) {
      setSaving(false);
      console.error(err);
    }
  };

  const createAndSupply = async (request) => {
    const catalogue = getCatalogue();
    return catalogue
      .connect(signer)
      .createAndSupplyBooks(
        [request.isbn],
        [request.title],
        [request.author],
        [request.quantity]
      );
  };

  const addSupply = async (request) => {
    const catalogue = getCatalogue();
    console.log(request);
    return catalogue
      .connect(signer)
      .supplyBooks([request.isbn], [request.quantity]);
  };

  return (
    <div>
      <h1>Requests for books from other libraries</h1>
      <div>
        {(() => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (requests.length === 0) {
            return <p>No requests</p>;
          }
          return requests.map((request) => {
            const isSelected = selectedRequestId === request.id;
            return (
              <div
                key={request.id}
                style={{
                  border: "1px solid black",
                  padding: "5px 15px",
                  backgroundColor: isSelected ? "lightblue" : "white",
                }}
              >
                <button
                  style={{ float: "right" }}
                  onClick={() => setSelectedRequestId(request.id)}
                >
                  Make Offer
                </button>
                <p>Title: {request.title}</p>
                <p>ISBN: {request.isbn}</p>
                <p>Quantity: {request.quantity}</p>
              </div>
            );
          });
        })()}
      </div>
      {(() => {
        if (!selectedRequestId) return null;
        if (!signer) {
          return <p>Connect wallet to make an offer</p>;
        }
        if (!hasCreatedTokens) {
          return (
            <div>
              <h2>
                To make an offer on this request, register your books on chain
              </h2>
              {saving ? (
                "Saving..."
              ) : (
                <button onClick={createTokens}>Create Tokens</button>
              )}
            </div>
          );
        }
        return (
          <div>
            <h2>Make an offer for this request</h2>
            <label for="isbn">Bond: </label>
            <input
              type="text"
              id="bond"
              name="bond"
              value={bond}
              onChange={(ev) => setBond(ev.target.value)}
            ></input>
            <br />
            <label for="quantity">Fee: </label>
            <input
              type="text"
              id="fee"
              name="fee"
              value={fee}
              onChange={(ev) => setFee(ev.target.value)}
            ></input>
            <br />
            <button onClick={() => offerRental()}>Offer Rental</button>
          </div>
        );
      })()}
    </div>
  );
};

export default ViewRequests;
