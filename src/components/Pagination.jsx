import { PAGE_SIZES } from "../utils/constants";

// Pagination component for navigating user records
const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}) => {
  return (
    <div className="pagination">

      {/* Select number of rows per page */}
      <div className="page-size">

        <label>Rows :</label>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

      </div>

      {/* Previous and Next page controls */}
      <div className="page-buttons">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Previous
        </button>

        {/* Current page information */}
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Pagination;