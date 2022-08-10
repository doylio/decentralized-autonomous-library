import React from "react";
import { useState } from 'react';
import ReactDOM from "react-dom/client";


const InternalSearch = () => {
  const [barcode, setBarcode] = useState("")
  const [itemtitle, setItemTitle] = useState("")
  const [authorname, setAuthorName] = useState("")
  console.log(barcode)
  console.log(itemtitle)
  console.log(authorname)
    return (
    <div><h1>Internal Search</h1>
    <br></br>
    <label for="barcode">Barcode : </label>
      <input type="text" id="barcode" name="barcode" value={barcode} onChange={ev=>setBarcode(ev.target.value)}></input>
      <br></br>
      <label for="item_title">Title : </label>
      <input type="text" id="itemtitle" name="itemtitle" value={itemtitle} onChange={ev=>setItemTitle(ev.target.value)}></input>
      <br></br>
      <label for="authorname">Author : </label>
      <input type="text" id="authorname" name="authorname" value={authorname} onChange={ev=>setAuthorName(ev.target.value)}></input>
      <br></br>
      <button
        type="button"
        onClick={setBarcode} //function to go to page results page
      >Search</button>
    </div>
    
    );
  };
  
  export default InternalSearch;