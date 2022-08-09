import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
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
          <li>
            <Link to="/markreturn">Mark a Book as Returned</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;