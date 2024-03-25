import React, { useCallback, useEffect, useState } from 'react';

/*** CSS Imports ***/
import './DepartmentInfo.css';

/*** Router Imports***/
import { useNavigate, useParams } from 'react-router-dom';

/*** Hook Imports ***/
import useAxios from 'hooks/useAxios';

/*** Component Imports ***/
import Form from 'components/Common/Form/Form/Form';
import SPFormInputText from 'components/Common/Form/SPFormInputText/SPFormInputText';
import FormButton from 'components/Common/Form/FormButton/FormButton';

/*** Package Imports ***/
import toast from 'react-hot-toast';

function DepartmentInfo() {

    /* Initialization */
    const initDepartmentData = {
        departmentCode: '', departmentName: ''
    }

    /* useState */
    const [department, setDepartment] = useState(initDepartmentData);
    const [isEditable, setIsEditable] = useState(false);

    /* Router */
    const navigate = useNavigate();
    const { id } = useParams();

    /* Hooks */
    const { fetch, response, error } = useAxios();
    const {
        fetch: fetchUpdate, response: responseUpdate,
        error: errorUpdate, isLoading: isLoadingUpdate
    } = useAxios();

    /* useCallback */
    const fetchData = useCallback((url) => {
        fetch(url);
    }, []);

    const handleSave = useCallback(() => {
        if (department?.id) {
            fetchUpdate(`/api/department/${department.id}`, {
                method: 'PUT',
                body: department
            })
        }
    }, [department]);

    /* useEffect */
    useEffect(() => {
        fetchData(`/api/department/${id}`);
    }, [fetchData, id]);

    useEffect(() => {
        if (response) setDepartment(response?.data);
        if (error) console.log(error);
    }, [response, error]);

    useEffect(() => {
        if (responseUpdate) {
            toast.success(
                'Updated Successfully',
                { duration: 5000 }
            );
        }
        if (errorUpdate) {
            toast.error(
                'Update Error',
                { duration: 5000 }
            );
        }
        setIsEditable(false);
    }, [responseUpdate, errorUpdate, isLoadingUpdate]);

    return (
        <div className='departmentInfo d-flex flex-column'>
            <Form
                headers={{
                    large: 'Department Information',
                    small: 'View and Manage Department Information'
                }}>
                <Form.Body>
                    <SPFormInputText className='col-12 col-md-6' label='Department Code'
                        value={department?.departmentCode}
                        onChange={(e) => setDepartment(
                            { ...department, departmentCode: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-6' label='Department Name'
                        value={department?.departmentName}
                        onChange={(e) => setDepartment(
                            { ...department, departmentName: e.target.value }
                        )}
                        disabled={!isEditable} />
                    <SPFormInputText className='col-12 col-md-6' label='Head of Department'
                        value={`${department?.headOfDepartment?.firstName} ${department?.headOfDepartment?.lastName}`}
                        disabled />
                </Form.Body>
                <Form.Footer>
                    {
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
                                    Edit Department
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
                                    onClick={() => handleSave()}
                                    disabled={!isEditable || isLoadingUpdate ? true : false}>
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

export default DepartmentInfo;