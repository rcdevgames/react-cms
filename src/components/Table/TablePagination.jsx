import React from 'react'
import PropTypes from 'prop-types'

const TablePagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20],
  className = "mt-4 flex justify-between items-center text-gray-300"
}) => {
  const safeTotalItems = typeof totalItems === 'number' ? totalItems : 0
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, safeTotalItems)

  return (
    <div className={className}>
      <div>
        Showing {indexOfFirstItem} to {indexOfLastItem} of {safeTotalItems} entries
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={indexOfLastItem >= safeTotalItems}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

TablePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string
}

export default TablePagination