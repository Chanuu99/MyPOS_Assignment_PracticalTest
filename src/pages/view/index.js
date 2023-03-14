import React, { useEffect, useState } from 'react'


import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import './view.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function View() {

    document.title = "View Employees"
    document.body.style.overflow = "visible";

    const BASE_URI = process.env.REACT_APP_BASE_URI;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const Emp = BASE_URI + "api/v1.0/Employees/"
    const getDept = BASE_URI + "api/v1.0/Departments"

    const [employees, setEmployees] = useState([]);
    const [isActive, setIsActive] = useState("");
    const [status, setStatus] = useState("true");

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showEmp, setShowEmp] = useState(false);
    const handleCloseEmp = () => setShowEmp(false);
    const handleShowEmp = () => setShowEmp(true);

    useEffect(() => {
        async function getRecords() {
            const response = axios.get(Emp, {
                headers: {
                    "apiToken": API_KEY
                }
            })
            setEmployees(response.data);
        }
        getRecords();
    })

    //console.log(employees);

    //form validation
    const employeeSchema = Yup.object().shape({
        empNo: Yup.string()
            .max(15, 'Too Long!')
            .required('Required'),
        empName: Yup.string()
            .max(50, 'Too Long!')
            .required('Required'),
        empAddressLine1: Yup.string()
            .max(80, 'Too Long!')
            .required('Required'),
        empAddressLine2: Yup.string()
            .max(80, 'Too Long!'),
        empAddressLine3: Yup.string()
            .max(80, 'Too Long!'),
        departmentCode: Yup.string()
            .max(15, 'Too Long!')
            .required('Required'),
        dateOfJoin: Yup.date()
            .max(new Date(), "Date cannot be in the future")
            .required('Required'),
        dateOfBirth: Yup.date()
            .max(new Date(), "Date cannot be in the future")
            .required('Required'),
        basicSalary: Yup.number()
            .required('Required'),
    })

    //add function
    function handleSubmit(values) {
        if (status === "true") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        const data = {
            empNo: values.empNo,
            empName: values.empName,
            empAddressLine1: values.empAddressLine1,
            empAddressLine2: values.empAddressLine2,
            empAddressLine3: values.empAddressLine3,
            departmentCode: values.departmentCode,
            dateOfJoin: values.dateOfJoin,
            dateOfBirth: values.dateOfBirth,
            basicSalary: values.basicSalary,
            isActive: isActive
        }
        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Done !!',
            text: 'New Employee Added Successfully !!',
        })
        handleCloseAdd();
    }

    //edit function
    function handleEdit(values) {
        if (status === "true") {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        const data = {
            empNo: values.empNo,
            empName: values.empName,
            empAddressLine1: values.empAddressLine1,
            empAddressLine2: values.empAddressLine2,
            empAddressLine3: values.empAddressLine3,
            departmentCode: values.departmentCode,
            dateOfJoin: values.dateOfJoin,
            dateOfBirth: values.dateOfBirth,
            basicSalary: values.basicSalary,
            isActive: isActive
        }
        console.log(data);

        Swal.fire({
            icon: 'success',
            title: 'Done !!',
            text: 'Employee Details Edited Successfully !!',
        })
        handleCloseEdit();
        handleCloseEmp();
    }

    //delete function
    async function handleDelete(id) {

        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',

                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Employee Details has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Employee Details is not deleted',
                    'info'
                )
            }
        })
    }


    return (

        <div>
            {/* Add Modal */}
            <Modal
                show={showAdd}
                onHide={handleCloseAdd}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            empNo: '',
                            empName: '',
                            empAddressLine1: '',
                            empAddressLine2: '',
                            empAddressLine3: '',
                            departmentCode: '',
                            dateOfJoin: '',
                            dateOfBirth: '',
                            basicSalary: '',
                            isActive: ''
                        }}
                        validationSchema={employeeSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            handleSubmit(values);
                        }}
                    >

                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empNo">Employee No</label>
                                        <Field name="empNo" type="text" className={'form-control' + (errors.empNo && touched.empNo ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empNo}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empName">Employee Name</label>
                                        <Field name="empName" type="text" className={'form-control' + (errors.empName && touched.empName ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empName}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine1">Address Line 1</label>
                                        <Field name="empAddressLine1" type="text" className={'form-control' + (errors.empAddressLine1 && touched.empAddressLine1 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine1}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine2">Address Line 2</label>
                                        <Field name="empAddressLine2" type="text" className={'form-control' + (errors.empAddressLine2 && touched.empAddressLine2 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine2}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine3">Address Line 3</label>
                                        <Field name="empAddressLine3" type="text" className={'form-control' + (errors.empAddressLine3 && touched.empAddressLine3 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine3}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="departmentCode">Department</label>
                                        <Field name="departmentCode" type="text" className={'form-control' + (errors.departmentCode && touched.departmentCode ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.departmentCode}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateOfJoin">Date of Join</label>
                                        <Field name="dateOfJoin" type="date" className={'form-control' + (errors.dateOfJoin && touched.dateOfJoin ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.dateOfJoin}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <Field name="dateOfBirth" type="date" className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.dateOfBirth}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="basicSalary">Basic Salary</label>
                                        <Field name="basicSalary" type="number" className={'fcontrolcontrol' + (errors.basicSalary && touched.basicSalary ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.basicSalary}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="isActive">Is Active</label>
                                        <br />
                                        <div className='controlcontrol mt-2'>
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <br />
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </div>
                            </Form>
                        )}


                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={showEdit}
                onHide={handleCloseEdit}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            empNo: '',
                            empName: '',
                            empAddressLine1: '',
                            empAddressLine2: '',
                            empAddressLine3: '',
                            departmentCode: '',
                            dateOfJoin: '',
                            dateOfBirth: '',
                            basicSalary: '',
                            isActive: ''
                        }}
                        validationSchema={employeeSchema}
                        onSubmit={values => {
                            // same shape as initial values
                            handleEdit(values);
                        }}
                    >

                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empNo">Employee No</label>
                                        <Field name="empNo" type="text" className={'form-control' + (errors.empNo && touched.empNo ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empNo}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empName">Employee Name</label>
                                        <Field name="empName" type="text" className={'form-control' + (errors.empName && touched.empName ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empName}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine1">Address Line 1</label>
                                        <Field name="empAddressLine1" type="text" className={'form-control' + (errors.empAddressLine1 && touched.empAddressLine1 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine1}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine2">Address Line 2</label>
                                        <Field name="empAddressLine2" type="text" className={'form-control' + (errors.empAddressLine2 && touched.empAddressLine2 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine2}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="empAddressLine3">Address Line 3</label>
                                        <Field name="empAddressLine3" type="text" className={'form-control' + (errors.empAddressLine3 && touched.empAddressLine3 ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.empAddressLine3}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="departmentCode">Department</label>
                                        <Field name="departmentCode" type="text" className={'form-control' + (errors.departmentCode && touched.departmentCode ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.departmentCode}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateOfJoin">Date of Join</label>
                                        <Field name="dateOfJoin" type="date" className={'form-control' + (errors.dateOfJoin && touched.dateOfJoin ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.dateOfJoin}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="dateOfBirth">Date of Birth</label>
                                        <Field name="dateOfBirth" type="date" className={'form-control' + (errors.dateOfBirth && touched.dateOfBirth ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.dateOfBirth}</div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="basicSalary">Basic Salary</label>
                                        <Field name="basicSalary" type="number" className={'fcontrolcontrol' + (errors.basicSalary && touched.basicSalary ? ' is-invalid' : '')} />
                                        <div className="invalid-feedback">{errors.basicSalary}</div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="isActive">Is Active</label>
                                        <br />
                                        <div className='controlcontrol mt-2'>
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mt-2">
                                    <br />
                                    <button type="submit" className="btn btn-primary mr-2">Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Modal */}
            <Modal
                show={showEmp}
                onHide={handleCloseEmp}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header className="viewHeader" closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Emplyee No - </p>
                    <p>Emplyee Name - </p>
                    <p>Emplyee Address - </p>
                    <p>Emplyee Department - </p>
                    <p>Emplyee Date of Join -</p>
                    <p>Emplyee Date of Birth -</p>
                    <p>Emplyee Basic Salary -</p>
                    <p>Emplyee Status -</p>

                    <div classname>
                        <Button className="buttonEdit" onClick={handleShowEdit}>Edit</Button>{' '}
                        <Button variant="danger" onClick={() => handleDelete(1)}>Delete</Button>{' '}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEmp}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="btnRow">
                <Button variant="primary" onClick={handleShowAdd}>Add New Employee</Button>{' '}
            </div>

            <div class="view">
                <Row xs="3">
                    <Col>
                        <div className="card">
                            <Card style={{ width: '22rem' }} >
                                <Card.Body>
                                    <Card.Title>Emp name</Card.Title>
                                    <Card.Text>
                                        Emp No -
                                        Date of Join -
                                    </Card.Text>
                                    <Button variant="primary" onClick={handleShowEmp}>View Employee Details</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
