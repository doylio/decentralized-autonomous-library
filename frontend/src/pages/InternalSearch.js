


const InternalSearch = () => {
    return (
    <div><h1>Internal Search</h1>
    <br></br>
    <label for="barcode">Barcode : </label>
      <input type="text" id="barcode" name="barcode"></input>
      <br></br>
      <label for="item_title">Title : </label>
      <input type="text" id="item_title" name="item_title"></input>
      <br></br>
      <label for="author_name">Author : </label>
      <input type="text" id="author_name" name="author_name"></input>
      <br></br>
      <input type="submit" value="Search"></input>
    </div>
    
    );
  };
  
  export default InternalSearch;