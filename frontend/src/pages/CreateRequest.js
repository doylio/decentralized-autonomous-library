import React from "react";
import { getRentalManager } from "../web3/contracts";
import { useSigner, useConnect } from "wagmi";

const CreateRequest = () => {
  const { data: signer } = useSigner();
  const [isbn, setISBN] = React.useState("");
  const [quantity, setQuantity] = React.useState();
  const [loading, setLoading] = React.useState(false);

  async function createRequest() {
    try {
      const rentalManager = getRentalManager();
      const _isbn = Number(isbn);
      const _quantity = Number(quantity);
      setLoading(true);
      const tx = await rentalManager
        .connect(signer)
        .createRequest(_isbn, _quantity);
      await tx.wait();
      setLoading(false);

      window.location.href = "/create-request-success";
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <h1>Create a Request for a Book to Loan</h1>
      <label for="isbn">ISBN: </label>
      <input
        type="text"
        id="isbn"
        name="isbn"
        value={isbn}
        onChange={(ev) => setISBN(ev.target.value)}
      ></input>
      <br />
      <label for="quantity">Quantity: </label>
      <input
        type="text"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(ev) => setQuantity(ev.target.value)}
      ></input>
      <br />
      <br />
      {(() => {
        if (!signer) {
          return <p>Connect wallet to create a request</p>;
        }
        if (loading) {
          return <p>Creating request...</p>;
        }
        return <button onClick={createRequest}>Create Request</button>;
      })()}
    </div>
  );
};

export default CreateRequest;
