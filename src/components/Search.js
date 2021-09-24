import React, { useState } from "react";

const baseUrl = "http://openlibrary.org";

export function searchBooks(query) {
  const url = new URL(baseUrl + "/search.json");
  url.searchParams.append("title", query);

  return fetch(url).then((response) => response.json());
}
const Search = () => {
  const [results, setResults] = useState(0);

  const searchHandle = (e) => {
    searchBooks(e.target.value).then((response) => {
      setResults(response.docs);
      console.log(response.docs);
    });
  };
  const resultsList = (results || []).map((book) => (
    <tr key={book.key}>
      <td>{book.title}</td>
      <td>{book.author_name && book.author_name.join(", ")}</td>
      <td>{book.first_publish_year}</td>
    </tr>
  ));
  return (
    <div>
      <div className="search-input">
        <input type="text" placeholder="Search" onChange={searchHandle}></input>
      </div>
      <h1>Search Results</h1>
      <div>
        <table>
          <thead>{resultsList}</thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default Search;
