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
import NoPage from "./pages/NoPage";


export default function App() {
  return (
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
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);