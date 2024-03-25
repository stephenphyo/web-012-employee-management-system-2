import React, { useEffect } from 'react';

/*** CSS Imports ***/
import './TableControls.css';

/*** Icon Imports ***/
import { MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from 'react-icons/md';

function TableControls(props) {
    return (
        <div className='table_controls'>
            {props.children}
        </div>
    );
}

/*** Nav Bar ***/
function NavBar({
    currentPage = 0, setCurrentPage,
    pageSize, setPageSize,
    totalPages = 0,
    totalRecords = 0, selectedRecords = 0
}) {

    /* Functions */
    const handlePageInput = (page) => {
        if (page > totalPages) { setCurrentPage(totalPages) }
        else if (page <= 0) { setCurrentPage(1) }
        else { setCurrentPage(page) }
    };

    /* useEffect */
    useEffect(() => {
        if (totalRecords !== 0) {
            if (currentPage > Math.ceil(totalRecords / pageSize)) {
                setCurrentPage(Math.ceil(totalRecords / pageSize));
            }
        }
    }, [pageSize]);

    return (
        <div className='table_navbar row'>
            <div className='table_navbar_status col-12 col-md-6'>
                <span>{`${currentPage} out of ${totalPages} pages`}</span>
                <span>{`(${selectedRecords} selected out of ${totalRecords} total records)`}</span>
            </div>
            <div className='table_navbar_control col-12 col-md-6'>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}>
                    <option value={5}>5 rows</option>
                    <option value={10}>10 rows</option>
                    <option value={20}>20 rows</option>
                    <option value={30}>30 rows</option>
                    <option value={50}>50 rows</option>
                </select>
                <div className='table_navbar_control_page'>
                    <MdKeyboardDoubleArrowLeft
                        onClick={() => setCurrentPage(currentPage - 5 <= 0 ? 1 : currentPage - 5)} />
                    <MdKeyboardArrowLeft
                        onClick={() => setCurrentPage(currentPage - 1 === 0 ? 1 : currentPage - 1)} />
                    <input
                        type='text' value={currentPage}
                        onFocus={(e) => e.target.select()}
                        onChange={(e) => handlePageInput(e.target.value)} />
                    <MdKeyboardArrowRight
                        onClick={() => setCurrentPage(
                            currentPage + 1 > totalPages ? totalPages : currentPage + 1)} />
                    <MdKeyboardDoubleArrowRight
                        onClick={() => setCurrentPage(
                            currentPage + 5 > totalPages ? totalPages : currentPage + 5)} />
                </div>
            </div>
        </div>
    );
}

TableControls.NavBar = NavBar;

export default TableControls;