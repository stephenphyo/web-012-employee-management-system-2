import React, { useCallback, useEffect, useState } from 'react';

/*** CSS Imports ***/
import './EmployeeInfo.css';

/*** Router Imports***/
import { useNavigate, useParams } from 'react-router-dom';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';
import Form from 'components/Common/Form/Form/Form';
import SPFormInputText from 'components/Common/Form/SPFormInputText/SPFormInputText';
import FormButton from 'components/Common/Form/FormButton/FormButton';
import SPFormSelect from 'components/Common/Form/SPFormSelect/SPFormSelect';

/*** Package Imports ***/
import toast from 'react-hot-toast';

function EmployeeInfo() {

    /* Initialization */
    const initEmployeeData = {
        firstName: '', lastName: '', email: '', phone: '', address: ''
    }

    /* useState */
    const [employee, setEmployee] = useState(initEmployeeData);
    const [departments, setDepartments] = useState([]);
    const [selDepartment, setSelDepartment] = useState(null);
    const [units, setUnits] = useState([]);
    const [isEditable, setIsEditable] = useState(false);

    /* Router */
    const { id } = useParams();
    const navigate = useNavigate();

    /* Hooks */
    const { fetch: fetchGet, response: responseGet, error: errorGet } = useAxios();
    const { fetch: fetchCreate, response: responseCreate, error: errorCreate, isLoading: isLoadingCreate } = useAxios();
    const { fetch: fetchUpdate, response: responseUpdate, error: errorUpdate, isLoading: isLoadingUpdate } = useAxios();
    const { fetch: fetchGetDepartments, response: responseGetDepartments, error: errorGetDepartments, isLoading: isLoadingGetDepartments } = useAxios();
    const { fetch: fetchGetUnits, response: responseGetUnits, error: errorGetUnits, isLoading: isLoadingGetUnits } = useAxios();

    /* useCallback */
    const handleCreate = useCallback(() => {
        fetchCreate(`/api/employee`, {
            method: 'POST',
            body: employee
        });
    }, [employee]);

    const handleEdit = useCallback(() => {
        if (employee?.id) {
            fetchUpdate(`/api/employee/${employee.id}`, {
                method: 'PUT',
                body: employee
            });
        }
    }, [employee]);

    /* useEffect */
    useEffect(() => {
        if (id === 'new') setIsEditable(true);
        else fetchGet(`/api/employee/${id}`);
    }, []);

    useEffect(() => {
        fetchGetDepartments('/api/department');
    }, []);

    useEffect(() => {
        if (responseGet) setEmployee(responseGet?.data);
        if (errorGet) console.log(errorGet);
    }, [responseGet, errorGet]);

    useEffect(() => {
        if (responseGetDepartments) setDepartments(responseGetDepartments?.data?.data);
        if (errorGetDepartments) console.log(errorGetDepartments);
    }, [responseGetDepartments, errorGetDepartments]);

    useEffect(() => {
        if (responseCreate) {
            toast.success(
                'Created Successfully',
                { duration: 5000 }
            );
            navigate('/employee');
        }
        if (errorCreate) {
            toast.error(
                'Create Error',
                { duration: 5000 }
            );
        }
    }, [responseCreate, errorCreate, isLoadingCreate]);

    useEffect(() => {
        if (responseUpdate) {
            toast.success(
                'Updated Successfully',
                { duration: 5000 }
            );
            setIsEditable(false);
        }
        if (errorUpdate) {
            toast.error(
                'Update Error',
                { duration: 5000 }
            );
        }
    }, [responseUpdate, errorUpdate, isLoadingUpdate]);

    useEffect(() => {
        if (selDepartment) {
            fetchGetUnits(`/api/department/${selDepartment}/units`)
        }
    }, [selDepartment]);

    useEffect(() => {
        if (responseGetUnits) setUnits(responseGetUnits?.data.data);
    }, [responseGetUnits, errorGetUnits, isLoadingGetUnits]);

    return (
        <div className='employeeInfo d-flex flex-column'>
            <Form
                headers={{
                    large: 'Employee Information',
                    small: 'View and Manage Employee Information'
                }}>
                <Form.Body>
                    <SPFormInputText className='col-12 col-md-2' label='Employee ID'
                        value={employee?.employeeId}
                        onChange={(e) => setEmployee(
                            { ...employee, employeeId: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-5' label='First Name'
                        value={employee?.firstName}
                        onChange={(e) => setEmployee(
                            { ...employee, firstName: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-5' label='Last Name'
                        value={employee?.lastName}
                        onChange={(e) => setEmployee(
                            { ...employee, lastName: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-6' label='Email Address'
                        value={employee?.email}
                        onChange={(e) => setEmployee(
                            { ...employee, email: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <div className='col-0 col-md-6'></div>
                    <SPFormInputText className='col-12 col-md-4' label='Phone Number'
                        value={employee?.phone}
                        onChange={(e) => setEmployee(
                            { ...employee, phone: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-8' label='Address'
                        value={employee?.address}
                        onChange={(e) => setEmployee(
                            { ...employee, address: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormSelect className='col-12 col-md-6'
                        label='Department'
                        onChange={(e) => setSelDepartment(e.target.value)}
                        disabled={!isEditable}>
                        <SPFormSelect.Option hidden>Select Department</SPFormSelect.Option>
                        {
                            departments.map((dept, index) => (
                                <SPFormSelect.Option key={index}
                                    value={dept?.id}>
                                    {dept?.departmentName}
                                </SPFormSelect.Option>
                            ))
                        }
                    </SPFormSelect>

                    <SPFormSelect className='col-12 col-md-6'
                        label='Unit'
                        disabled={!isEditable || !selDepartment}>
                        <SPFormSelect.Option hidden>Select Unit</SPFormSelect.Option>
                        {
                            units?.map((unit, index) => (
                                <SPFormSelect.Option key={index}
                                    value={unit?.id}>
                                    {unit?.unitName}
                                </SPFormSelect.Option>
                            ))
                        }
                    </SPFormSelect>
                </Form.Body>
                <Form.Footer>
                    {
                        id === 'new'
                            ?
                            <>
                                <FormButton className='col-12 col-md-6'
                                    onClick={() => navigate(-1)}>
                                    Back
                                </FormButton>
                                <FormButton
                                    className='col-12 col-md-6'
                                    onClick={() => handleCreate()}>
                                    Create Employee
                                </FormButton>
                            </>
                            :
                            !isEditable
                                ?
                                <>
                                    <FormButton className='col-12 col-md-6'
                                        onClick={() => navigate(-1)}>
                                        Back
                                    </FormButton>
                                    <FormButton
                                        className='col-12 col-md-6'
                                        onClick={() => setIsEditable(true)}>
                                        Edit Employee
                                    </FormButton>
                                </>
                                :
                                <>
                                    <FormButton className='col-12 col-md-6'
                                        onClick={() => setIsEditable(false)}>
                                        Cancel
                                    </FormButton>
                                    <FormButton
                                        className='col-12 col-md-6'
                                        onClick={() => handleEdit()}>
                                        {/* disabled={!isEditable || isLoadingUpdate ? true : false}> */}
                                        Save
                                        {/* {
                            isLoading
                                ? <Bars visible height='30' width='30'
                                    color='#FFFFFF' />
                                : 'Save'
                        } */}
                                    </FormButton>
                                </>
                    }
                </Form.Footer>
            </Form>
        </div>
    );
}

export default EmployeeInfo;