import React, { useState } from "react";
import { useAccount, useSigner, useProvider } from "wagmi";
import { getRentalManager } from "../web3/contracts";
import { getAccepts, getBooks, getOffers, getRequests } from "../api";
import { getTitleFromCatalogue } from "../web3";
import { BigNumber, ethers } from "ethers";

const ViewOffers = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    handleGetOffers();
  }, []);

  const handleGetOffers = async () => {
    try {
      setLoading(true);
      const offers = await getOffers();
      const requests = await getRequests();
      const accepts = await getAccepts();
      const parsedOffers = await parseAndFilterOffers(
        requests,
        offers,
        accepts
      );
      setOffers(parsedOffers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const parseAndFilterOffers = (requests, offers, accepts) => {
    const myRequests = requests.filter(
      (req) => req.Renter.toLowerCase() === address.toLowerCase()
    );
    const myOffers = offers.filter((offer) =>
      myRequests.some((req) => req.ID === offer.RequestID)
    );
    const myUnfulfilledOffers = myOffers.filter(
      (offer) => !accepts.some((accept) => accept.ID === offer.ID)
    );
    const promises = myUnfulfilledOffers.map(async (offer) => {
      const request = myRequests.find((req) => req.ID === offer.RequestID);
      const title = await getTitleFromCatalogue(request.ISBN);
      return {
        id: offer.ID,
        isbn: request.ISBN,
        quantity: offer.Quantity,
        title,
        fee: ethers.utils.formatEther(offer.Fee.toString()),
        bond: ethers.utils.formatEther(offer.Bond.toString()),
      };
    });
    return Promise.all(promises);
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
                <strong>Fee:</strong> $ {offer.fee}
              </div>
              <div>
                <strong>Bond:</strong> $ {offer.bond}
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

export default ViewOffers;
