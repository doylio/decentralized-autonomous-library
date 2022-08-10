import React, { useState } from "react";
import { useSigner } from "wagmi";
import { getRentalManager } from "../web3/contracts";

const ViewOffers = () => {
  const { data: signer } = useSigner();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    handleGetOffers();
  }, []);

  const handleGetOffers = async () => {
    try {
      setLoading(true);
      const offers = await getOffers();
      setOffers(offers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const getOffers = async () => {
    return [
      {
        id: 1,
        title: "Harry Potter and the Sorcerer's Stone",
        isbn: 298347129838,
        quantity: 1,
        fee: 10,
        bond: 30,
      },
      {
        id: 2,
        title: "The Hobbit",
        isbn: 9238748932,
        quantity: 2,
        fee: 10,
        bond: 40,
      },
    ];
  };

  async function acceptOffer(offerId) {
    try {
      const rentalManager = getRentalManager();
      const tx = await rentalManager.connect(signer).acceptOffer(offerId);
      await tx.wait();
      window.location = "/accept-success";
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>View Available Offers</h1>
      <div>
        {(() => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (offers.length === 0) {
            return <div>No offers available</div>;
          }
          return offers.map((offer) => (
            <div
              key={offer.id}
              style={{ border: "1px solid black", padding: "5px 25px" }}
            >
              <button
                style={{ float: "right" }}
                onClick={() => acceptOffer(offer.id)}
              >
                Accept Offer
              </button>
              <h4>{offer.title}</h4>
              <div>
                <strong>ISBN:</strong> {offer.isbn}
              </div>
              <div>
                <strong>Quantity:</strong> {offer.quantity}
              </div>
              <div>
                <strong>Fee:</strong> {offer.fee}
              </div>
              <div>
                <strong>Bond:</strong> {offer.bond}
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

export default ViewOffers;
