import React, { useEffect, useState } from 'react';

/*** CSS Imports ***/
import './Unit.css';

/*** Router Imports  ***/
import { useNavigate } from 'react-router-dom';

/***  Hook Imports ***/
import useAxios from 'hooks/useAxios';

/*** Component Imports ***/
import Table from 'components/Common/Table/Table';
import TableControls from 'components/Common/Table/TableControls';

/*** Icon Imports ***/
import { FaEye, FaTrash } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';

function Unit() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [units, setUnits] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    /* Hooks */
    const { fetch, response, error } = useAxios();

    /* Functions */


    /* useEffect */
    useEffect(() => {
        fetch(`api/unit?page=${currentPage}&pageSize=${currentPageSize}`);
    }, [currentPage, currentPageSize]);

    useEffect(() => {
        if (response) {
            setUnits(response?.data?.data);
            setCurrentPageSize(response?.data?.pageSize);
            setTotalPages(response?.data?.totalPages);
            setTotalRecords(response?.data?.totalRecords);
        }

        if (error) console.log(error);
    }, [response, error])

    return (
        <div className='unit'>
            <TableControls>
                <TableControls.NavBar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={currentPageSize}
                    setPageSize={setCurrentPageSize}
                    totalPages={totalPages}
                    totalRecords={totalRecords} />
            </TableControls>
            <Table
                headings={['No.', 'Unit Name', 'Description', 'Department', 'Actions']}
                numColumns={5}>
                {
                    units?.map((unit, index) => (
                        <Table.Row key={index}>
                            <Table.Data>{(currentPage - 1) * currentPageSize + index + 1}</Table.Data>
                            <Table.Data>{unit?.unitName}</Table.Data>
                            <Table.Data>{unit?.description}</Table.Data>
                            <Table.Data>
                                <a href={`/department/${unit?.department?.id}`}>
                                    {unit?.department?.departmentName}
                                </a>
                            </Table.Data>
                            <Table.Data>
                                <span className='d-flex gap-2'>
                                    <FaEye size={16} style={{ color: 'blue' }} />
                                    <FiEdit size={16} style={{ color: 'orange' }} />
                                    <FaTrash size={16} style={{ color: 'red' }} />
                                </span>
                            </Table.Data>
                        </Table.Row>
                    ))
                }
            </Table>
        </div>
    );
}

export default Unit;