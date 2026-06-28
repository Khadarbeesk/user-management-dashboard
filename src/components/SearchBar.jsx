// Search bar with filter options
const SearchBar = ({
  searchText,
  setSearchText,
  onOpenFilter,
  onClearFilters,
  isFilterApplied,
}) => {
  return (
    <div className="search-container">

      {/* Search input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
      />

      {/* Open filter popup */}
      <button
        className="filter-btn"
        onClick={onOpenFilter}
      >
        Filter
      </button>

      {/* Show Clear Filter button only when filters are applied */}
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