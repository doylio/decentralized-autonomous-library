import React from "react";

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
    function searchArray(keyData) {
      const results = keyData.filter((book)=> book.author.match(author_name))
      console.log(results)
      this.setState({results})
    }
    fetch(apiAuthorUrl+``)
      .then((response) => response.json())
      .then((data) => console.log(
        searchArray(
          Object.values(data)
          //data
        )
        )
        );
  }
  render() {
    return (
    <div>
    <h1>my Component has Mounted, Check the browser 'console' </h1>
    {this.state.results}
    </div>
    );
  }
}
export default bookAuthor;
