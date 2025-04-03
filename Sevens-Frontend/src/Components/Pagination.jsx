"use client"

import "../styles/Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Generate page numbers
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button className="pagination-btn previous" onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`pagination-btn page-number ${currentPage === number ? "active" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}

      <button className="pagination-btn next" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination

