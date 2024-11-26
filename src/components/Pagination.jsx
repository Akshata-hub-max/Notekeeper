import React from "react";

const Pagination = ({ currentPage, totalNotes, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalNotes / pageSize);

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };



  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
    let endPage = currentPage + 2 < totalPages ? currentPage + 2 : totalPages;

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Previous
      </button>

      <div className="page-numbers">
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-number ${currentPage === pageNumber ? "active" : ""}`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
