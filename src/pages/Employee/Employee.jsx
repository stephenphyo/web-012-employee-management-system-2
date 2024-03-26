import React, { useCallback, useEffect, useState } from 'react';

/*** CSS Imports ***/
import './Employee.css';

/*** Router Imports ***/
import { useNavigate } from 'react-router-dom';

/***  Hook Imports ***/
import useAxios from 'hooks/useAxios';

/*** Component Imports ***/
import Table from 'components/Common/Table/Table';
import TableControls from 'components/Common/Table/TableControls';
import SPButton from 'components/Common/SPButton/SPButton';
import Modal from 'components/Common/SPModal/SPModal';
import SPDialogBox from 'components/Common/SPDialogBox/SPDialogBox';

/*** Icon Imports ***/
import { FaEye, FaTrash } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';

/*** Package Imports ***/
import toast from 'react-hot-toast';

function Employee() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [deletedItems, setDeletedItems] = useState([]);

    /* Hooks */
    const { fetch, response, error } = useAxios();
    const { fetch: fetchDelete } = useAxios();

    /* Functions */
    const fetchData = useCallback((url) => {
        fetch(url);
    }, []);

    const handleDelete = useCallback((id) => {
        if (id) {
            fetchDelete(`/api/employee/${id}`, {
                method: 'DELETE'
            })
                .then(res => {
                    toast.success(
                        'Delete Successfully',
                        { duration: 5000 }
                    );
                    return fetch(`/api/employee`);
                })
                .catch(err => {
                    toast.error(
                        'Delete Error',
                        { duration: 5000 }
                    );
                })
        }
        setShowModal(false);
    }, []);

    const confirmDelete = (id) => {
        setShowModal(true);
        setDeletedItems(id);
    }

    const cancelDelete = () => {
        setShowModal(false);
        setDeletedItems(null);
    }

    /* useEffect */
    useEffect(() => {
        fetchData(`/api/employee?page=${currentPage}&pageSize=${currentPageSize}`);
    }, [currentPage, currentPageSize]);

    useEffect(() => {
        if (response) {
            setEmployees(response?.data?.data);
            setCurrentPageSize(response?.data?.pageSize);
            setTotalPages(response?.data?.totalPages);
            setTotalRecords(response?.data?.totalRecords);
        }

        if (error) console.log(error);
    }, [response, error]);

    return (
        <div className='employee'>
            <TableControls>
                <TableControls.NavBar
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageSize={currentPageSize}
                    setPageSize={setCurrentPageSize}
                    totalPages={totalPages}
                    totalRecords={totalRecords} />
                <div style={{ padding: '0.5rem 0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <SPButton onClick={() => navigate('/employee/new')}>
                        Create New Employee
                    </SPButton>
                </div>
            </TableControls>
            <Table
                headings={['No.', 'Employee ID', 'First Name', 'Last Name', 'Date of Birth', 'Joined Date', 'Email Address', 'Phone', 'Address', 'Actions']}
                numColumns={10}>
                {
                    employees?.map((employee, index) => (
                        <Table.Row key={index}>
                            <Table.Data>{(currentPage - 1) * currentPageSize + index + 1}</Table.Data>
                            <Table.Data>{employee?.employeeId}</Table.Data>
                            <Table.Data>{employee?.firstName}</Table.Data>
                            <Table.Data>{employee?.lastName}</Table.Data>
                            <Table.Data>{employee?.dateOfBirth}</Table.Data>
                            <Table.Data>{employee?.joinedDate}</Table.Data>
                            <Table.Data>{employee?.email}</Table.Data>
                            <Table.Data>{employee?.phone}</Table.Data>
                            <Table.Data>{employee?.address}</Table.Data>
                            <Table.Data>
                                <span className='d-flex gap-2'>
                                    <FaEye size={16} style={{ color: 'blue' }}
                                        onClick={() => navigate(`/employee/${employee?.id}`)} />
                                    <FiEdit size={16} style={{ color: 'orange' }} />
                                    <FaTrash size={16} style={{ color: 'red' }}
                                        onClick={() => confirmDelete(employee?.id)} />
                                </span>
                            </Table.Data>
                        </Table.Row>
                    ))
                }
            </Table>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <SPDialogBox>
                    <SPDialogBox.Header>
                        Confirm Delete?
                    </SPDialogBox.Header>
                    <SPDialogBox.Body variant='fit'>
                        Are you sure you want to delete?
                    </SPDialogBox.Body>
                    <SPDialogBox.Footer>
                        <SPButton variant='outlined'
                            onClick={() => cancelDelete()}>
                            Cancel
                        </SPButton>
                        <SPButton variant='filled'
                            onClick={() => handleDelete(deletedItems)}>
                            Delete
                        </SPButton>
                    </SPDialogBox.Footer>
                </SPDialogBox>
            </Modal>
        </div>
    );
}

export default Employee;