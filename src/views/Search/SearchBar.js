import React from "react";

const SearchBar = ({ handleSearchInput }) => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Posts"
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
