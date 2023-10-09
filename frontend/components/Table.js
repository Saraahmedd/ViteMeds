import React, { useState } from 'react';

function Table(props) {
    const { headers, data } = props;

    const currentItems = data;

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
        </>
    );
}

module.exports = {
    Table
}