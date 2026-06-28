// src/components/SearchBar.jsx

const SearchBar = ({
  searchText,
  setSearchText,
  onOpenFilter,
  onClearFilters,
  isFilterApplied,
}) => {
  return (
    <div className="search-container">

      <input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
      />

      <button
        className="filter-btn"
        onClick={onOpenFilter}
      >
        Filter
      </button>

      {isFilterApplied && (
        <button
          className="clear-btn"
          onClick={onClearFilters}
        >
          Clear Filter
        </button>
      )}

    </div>
  );
};

export default SearchBar;