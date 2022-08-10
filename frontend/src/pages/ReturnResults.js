import React from "react";
import JSONViewer from "react-json-viewer";
import { getBooks } from "../api";

class BookAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  async componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const author_name = qs.get("author");

    const books = await getBooks();
    const matchingBooks = books.filter((book) =>
      book.author.match(author_name)
    );
    this.setState({ results: matchingBooks });
  }

  render() {
    if (this.state.results.length === 0) {
      return (
        <div>
          <h2>No Results Found </h2>
          <a href="/createrequest">Request Books from DAL</a>
        </div>
      );
    }

    const json_data = this.state.results.map((book) => ({
      Author: book.author,
      Title: book.title,
      Status: book.status_codes,
      Location: book.location,
      ISBN: book.barcode,
    }));
    return (
      <div>
        <h1>Search Results</h1>

        <JSONViewer json={json_data} />
      </div>
    );
  }
}
export default BookAuthor;
