import React, { useState } from "react";

function DoctorAppsTable(props) {
  const { headers, data, itemsPerPageOptions } = props;

  const currentItems = data;

  return (
    <>
      <table
        className={`table table-striped table-bordered table-hover mx-2 my-2 ${props.className}`}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={`col${index}`} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, index) => (
            <tr key={`tr${index}`}>
              {Object.values(row).map((node, index2) => (
                <td key={`td${index}-${index2}`}>{node}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {/* <div className="pagination mx-2 my-2">
                <span>Items per page:</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {itemsPerPageOptions.map((option, index) => (
                        <option key={"opt" + index} value={option}>{option}</option>
                    ))}
                </select>

                <span>Page:</span>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <a
                        key={`page${index + 1}`}
                        onClick={() => handlePageChange(index + 1)}
                        className={`${currentPage === index + 1 ? 'active' : ''} mx-1`}
                    >
                        {index + 1}
                    </a>
                ))}
            </div> */}
    </>
  );
}

module.exports = {
  DoctorAppsTable,
};
