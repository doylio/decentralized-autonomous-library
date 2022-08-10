import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import InternalSearch from "./pages/InternalSearch";
import ReturnResults from "./pages/ReturnResults";
import ViewOffers from "./pages/ViewOffers";
import ViewRequests from "./pages/ViewRequests";
import CreateRequest from "./pages/CreateRequest";
import MarkReturn from "./pages/MarkReturn";
import CreateRequestSuccess from "./pages/CreateSuccess";
import OfferSuccess from "./pages/OfferSuccess";
import AcceptSuccess from "./pages/AcceptSuccess";
import NoPage from "./pages/NoPage";
import { WagmiConfig } from "wagmi";
import { client } from "./web3";

export default function App() {
  return (
    <WagmiConfig client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="internalsearch" element={<InternalSearch />} />
            <Route path="returnresults" element={<ReturnResults />} />
            <Route path="viewoffers" element={<ViewOffers />} />
            <Route path="viewrequests" element={<ViewRequests />} />
            <Route path="createrequest" element={<CreateRequest />} />
            <Route path="markreturn" element={<MarkReturn />} />
            <Route
              path="create-request-success"
              element={<CreateRequestSuccess />}
            />
            <Route path="offer-success" element={<OfferSuccess />} />
            <Route path="accept-success" element={<AcceptSuccess />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
