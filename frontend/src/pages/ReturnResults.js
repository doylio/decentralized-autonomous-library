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
    return (
    <div>
    <h1>my Component has Mounted, Check the browser 'console' </h1>
    {this.state.results.toString()}
    </div>
    );
  }
}
export default bookAuthor;
