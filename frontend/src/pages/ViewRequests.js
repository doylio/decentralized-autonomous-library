import React, { useState } from "react";
import { useSigner } from "wagmi";
import { getRentalManager } from "../web3/contracts";
import env from "../env.json";

const ViewRequests = () => {
  const { data: signer } = useSigner();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [bond, setBond] = useState();
  const [fee, setFee] = useState();

  React.useEffect(() => {
    handleGetRequests();
  }, []);

  const handleGetRequests = async () => {
    try {
      setLoading(true);
      const requests = await getRequests();
      const relevantRequests = await filterRequestsInILS(requests);
      setRequests(requests);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const getRequests = async () => {
    return [
      {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        isbn: 298347129838,
        quantity: 1,
      },
      {
        id: 2,
        title: "The Hobbit",
        isbn: 9238748932,
        quantity: 2,
      },
    ];
  };

  const filterRequestsInILS = async (requests) => {
    const res = await fetch(`${env.API_URL}/books`);
    const books = await res.json();
    console.log(books);
    return requests;
  };

  const offerRental = async () => {
    try {
      const request = requests.find((r) => r.id === selectedRequestId);
      setLoading(true);
      const tx = await getRentalManager()
        .connect(signer)
        .offerRental(request.id, request.quantity, bond, fee);
      await tx.wait();
      setLoading(false);
      window.location = "/offer-success";
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
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
      {selectedRequestId && (
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
          {signer ? (
            <button onClick={() => offerRental()}>Offer Rental</button>
          ) : (
            <p>Connect wallet to make an offer</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewRequests;
