import React from "react";
import JSONViewer from 'react-json-viewer';


class bookAuthor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results:[]}
  }


  componentDidMount() {
    const qs = new URLSearchParams(window.location.search);
    const apiAuthorUrl = "http://localhost:8080/books";
    const apiBarcodeUrl = "http://localhost:8080/bookByBarcode";
    const apiTitleUrl = "http://localhost:8080/bookByTitle";
    const author_name = qs.get("author")
    const searchArray = (keyData) => {
      const results_array = keyData.filter((book)=> book.author.match(author_name))
      console.log(results_array)
      this.setState({results:results_array})
    }
  
    fetch(apiAuthorUrl+``)
      .then((response) => response.json())
      .then((data) => console.log(
        searchArray(
          Object.values(data), data
        )
        )
        );
  }
  
  render() {
    console.log(this.state.results)
    const json_data = this.state.results.map(
      book => ({
        Author: book.author,
        Title: book.title,
        Status: book.status_codes,
        Location: book.location,
        ISBN: book.barcode
      })
    )
    return (
    <div>
    <h1>Search Results</h1>
    
    <JSONViewer
        json={json_data}
      />
    <h2>No Results? <a href="http://localhost:3000/createrequest">Request Books</a></h2>
    <h2>No Results? <a href="http://localhost:3000/viewoffers">View Book Offers</a></h2>

    </div>
    );
  }
}
export default bookAuthor;
