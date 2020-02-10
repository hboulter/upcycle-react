import React from "react";

const SearchBar = ({ handleSearchInput }) => {
  return (
    <div className="search__container">
      <input
        // id="search-bar"
        className="search__input"
        type="text"
        placeholder="Search Posts"
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
