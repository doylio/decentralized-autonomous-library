import env from "./env.json";

export const getBooks = async () => {
  const res = await fetch(`${env.API_URL}/books`);
  const booksObj = await res.json();
  const books = Object.values(booksObj);
  return books;
};

export const getOffers = async () => {
  const res = await fetch(`${env.WATCHER_URL}/RentalCreated`);
  const offerObj = await res.json();
  const offers = Object.values(offerObj);
  return offers;
};

export const getRequests = async () => {
  const res = await fetch(`${env.WATCHER_URL}/RequestCreated`);
  const requestObj = await res.json();
  const requests = Object.values(requestObj);
  return requests;
};

export const getAccepts = async () => {
  const res = await fetch(`${env.WATCHER_URL}/RentalAccepted`);
  const acceptObj = await res.json();
  const accepts = Object.values(acceptObj);
  return accepts;
};
