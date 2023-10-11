import React, { useState } from 'react';

function DoctorAppsTable(props) {
    const { headers, data, itemsPerPageOptions } = props;

    // State for pagination
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    // Calculate the index of the first and last item to display based on pagination

    const currentItems = data;

    // Change the current page
    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };

    // // Change the number of items per page
    // const handleItemsPerPageChange = (e) => {
    //     setItemsPerPage(parseInt(e.target.value, 10));
    //     setCurrentPage(1); // Reset to the first page when changing items per page
   // };

    return (
        <>
            <table className={`table table-striped table-bordered table-hover mx-2 my-2 ${props.className}`}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`col${index}`} scope="col">{header}</th>
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
    DoctorAppsTable
}