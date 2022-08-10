import { Outlet, Link } from "react-router-dom";
import { WalletButton } from "../components/WalletButton";
import env from "../env.json";

const Layout = () => {
  return (
    <>
      <nav>
        <div style={{ float: "right" }}>
          <WalletButton />
        </div>
        <h1>{env.TITLE}</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/internalsearch">Internal Search</Link>
          </li>
          <li>
            <Link to="/returnresults">Return Results</Link>
          </li>
          <li>
            <Link to="/viewoffers">View Book Offers</Link>
          </li>
          <li>
            <Link to="/viewrequests">View Books Requested</Link>
          </li>
          <li>
            <Link to="/createrequest">Create Request for Book</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
