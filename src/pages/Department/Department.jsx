import React, { useCallback, useEffect, useState } from 'react';

/*** CSS Imports ***/
import './Department.css';

/*** Router Imports ***/
import { useNavigate } from 'react-router-dom';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

/*** Component Imports ***/
import Table from 'components/Common/Table/Table';
import TableControls from 'components/Common/Table/TableControls';
import Modal from 'components/Common/SPModal/SPModal';
import SPDialogBox from 'components/Common/SPDialogBox/SPDialogBox';
import SPButton from 'components/Common/SPButton/SPButton';

/*** Icon Imports ***/
import { FiEdit } from 'react-icons/fi';
import { FaEye, FaTrash } from 'react-icons/fa6';

/*** Package Imports ***/
import toast from 'react-hot-toast';

function Department() {

    /* useState */
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [deletedItems, setDeletedItems] = useState(null);

    /* Hooks */
    const { fetch, response, error } = useAxios();
    const { fetch: fetchDelete, response: responseDelete, error: errorDelete } = useAxios();

    /* Router */
    const navigate = useNavigate();

    /* Functions */
    const fetchData = useCallback((url) => {
        fetch(url);
    }, []);

    const handleDelete = useCallback((id) => {
        if (id) {
            fetchDelete(`/api/department/${id}`, {
                method: 'DELETE'
            })
                .then(res => {
                    toast.success(
                        'Delete Successfully',
                        { duration: 5000 }
                    );
                    return fetch(`/api/department`);
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
        fetchData(`/api/department`);
    }, [fetchData]);

    useEffect(() => {
        if (response) {
            setDepartments(response?.data?.data);
            setCurrentPageSize(response?.data?.pageSize);
            setTotalPages(response?.data?.totalPages);
            setTotalRecords(response?.data?.totalRecords);
        }
        if (error) console.log(error);
    }, [response, error]);

    useEffect(() => {
        if (responseDelete && responseDelete?.status === 200) {
            console.log('Delete OK')
        }
        if (errorDelete) console.log(errorDelete);
    }, [responseDelete, errorDelete]);

    useEffect(() => {
        console.log(`Deleted Items: ${deletedItems}`);
    }, [deletedItems]);

    return (
        <div className='department'>
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
                headings={['No.', 'Department Code', 'Department Name', 'Head of Department', 'Actions']}
                numColumns={5}>
                {
                    departments.map((department, index) => (
                        <Table.Row key={index}>
                            <Table.Data>{(currentPage - 1) * currentPageSize + index + 1}</Table.Data>
                            <Table.Data>{department?.departmentCode}</Table.Data>
                            <Table.Data>{department?.departmentName}</Table.Data>
                            <Table.Data>
                                <a href={`/employee/${department?.headOfDepartment?.id}`}>
                                    {`${department?.headOfDepartment?.firstName} ${department?.headOfDepartment?.lastName}`}
                                </a>
                            </Table.Data>
                            <Table.Data>
                                <span className='d-flex gap-2'>
                                    <FaEye size={16} style={{ color: 'blue', cursor: 'pointer' }}
                                        onClick={() => navigate(`/department/${department?.id}`)} />
                                    <FiEdit size={16} style={{ color: 'orange', cursor: 'pointer' }} />
                                    <FaTrash size={16} style={{ color: 'red', cursor: 'pointer' }}
                                        onClick={() => confirmDelete(department?.id)} />
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

export default Department;