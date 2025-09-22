import React from 'react'
import PropTypes from 'prop-types'

const DataTable = ({
  columns,
  data,
  sortConfig,
  onSort,
  isLoading,
  renderEmptyState,
  showSearch = true,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearch,
  showItemsPerPage = true,
  itemsPerPage = 10,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20],
  tableClassName = "min-w-full bg-gray-800 border border-gray-700 rounded-lg",
  headerClassName = "py-3 px-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider border-b border-gray-700 cursor-pointer hover:bg-gray-700",
  rowClassName = "hover:bg-gray-700 transition-colors duration-200",
  cellClassName = "py-3 px-4 text-gray-200 border-b border-gray-700",
  containerClassName = "space-y-4"
}) => {
  // Render sort arrow
  const renderSortArrow = (key) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽'
    }
    return null
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  return (
    <div className={containerClassName}>
      {/* Search and Items per page controls */}
      {(showSearch || showItemsPerPage) && (
        <div className="mb-4 flex justify-between items-center">
          {showSearch && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearch?.(e.target.value)}
              className="border border-gray-700 bg-gray-800 rounded py-2 px-3 w-64 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          )}
          {showItemsPerPage && (
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
              className="border border-gray-700 bg-gray-800 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            >
              {itemsPerPageOptions.map(option => (
                <option key={option} value={option}>{option} per page</option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className={tableClassName}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && onSort?.(column.key)}
                  className={`${headerClassName} ${column.sortable ? 'cursor-pointer' : ''}`}
                  style={{ width: column.width }}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && renderSortArrow(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {(!data || !Array.isArray(data) || data.length === 0)
            ? <tbody>
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-400">No data available</td>
              </tr>
            </tbody>
            : <tbody>
              {Array.isArray(data) && data.map((item, rowIndex) => (
                <tr key={item.id || rowIndex} className={rowClassName}>
                  {columns.map((column) => (
                    <td key={column.key} className={cellClassName}>
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>}
        </table>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc'])
  }),
  onSort: PropTypes.func,
  isLoading: PropTypes.bool,
  renderEmptyState: PropTypes.func,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  onSearch: PropTypes.func,
  showItemsPerPage: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  onItemsPerPageChange: PropTypes.func,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  tableClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  cellClassName: PropTypes.string,
  containerClassName: PropTypes.string
}

export default DataTable