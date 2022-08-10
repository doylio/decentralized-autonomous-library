import { useSigner } from "wagmi";

const ViewOffers = () => {
  const { data: signer } = useSigner();

  async function acceptOffer(offerId) {
    try {
      const rentalManager = getRentalManager();
      const tx = await rentalManager.connect(signer).acceptOffer(offerId);
      await tx.wait();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>View Available Books for Offer</h1>
    </div>
  );
};

export default ViewOffers;
