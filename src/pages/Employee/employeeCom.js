import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Col, Container, Row, Modal, Card, CardBody, CardTitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import axios from "axios"
import { useEffect } from "react"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const EmployeeComp = () => {
  const [menu, setMenu] = useState(false)
  const [apiData, setapiData] = useState([])
  const [EditID, setEditID] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [isOpen, setisOpen] = useState(false)
  let endPoint = "http://localhost:8050/employee"
  const toggle = () => {
    setMenu(!menu)
  }

  const PayrollSchema = yup.object({

    Emp_Phone: yup.number().required("Please Enter Emolyee Phone"),
    Emp_Age: yup.number().required("Please Enter Employee Age"),
    Emp_Salary: yup.number().required("Please Enter Employee  salary"),
    Emp_Email: yup.string().email().required("Please Enter Employee Email"),
    Emp_Address: yup.string().required("Please Enter Employee Address"),
    Emp_JobTitle: yup.string().required("Please Enter Employee Job Title"),
    Emp_Name: yup.string().required("please enter Employee Name").min(3, 'Name must be atleat 4 chareccter')

  });


  const [tim, setTim] = useState(new Date())
  const { register, handleSubmit, setValue, reset, formState: { errors },
  } = useForm({
    resolver: yupResolver(PayrollSchema),
  });


  useEffect(() => {
    async function onload() {
      try {
        let endPoint = "http://localhost:8050/employee";
        const { data } = await axios.get(endPoint)
        setapiData(data)
        // console.log("data",data)

      } catch (error) {
        console.log(error.message)
      }
    }
    onload()
  }, [tim])



  function tog_standard() {
    setisOpen(!isOpen)

  }

  function CloseTog() {
    setisOpen(!isOpen)
    setIsEdit(false)
    reset();

  }

  const HandleSubmitka = async (event) => {
    try {
      if (isEdit) {
        const newEndPoint = `${endPoint}/${EditID}`
        let { data } = await axios.put(newEndPoint, event);
        console.log(data._id);
        toast.success(event.message)
        setTim(new Date())
        if (data.status === 'Success') {
          toast.success(data.message)
          reset();
        } else {
          toast.error(data.message)
          reset();
        }


        setIsEdit(false)
        reset();

        return data.message
      }
      else {
        console.log("event", event)
        let endPoint = "http://localhost:8050/employee"
        let { data } = await axios.post(endPoint, event);
        const xogta = await data.status
        console.log(xogta)
        if (xogta === 'Success') {
          toast.success(data.message);
          setapiData([data.info, ...apiData,])
          reset();
        } else {
          toast.error(data.message);
          reset();
        }
      }



    } catch (error) {
      toast.error(error.message);

    }


  }

  const HandleEdit = (data) => {
    setValue("Emp_Name", data.Emp_Name)
    setValue("Emp_Phone", data.Emp_Phone)
    setValue("Emp_Age", data.Emp_Age)
    setValue("Emp_Salary", data.Emp_Salary)
    setValue("Emp_Email", data.Emp_Email)
    setValue("Emp_Address", data.Emp_Address)
    setValue("Emp_JobTitle", data.Emp_JobTitle)
    setValue("Emp_Status", data.Emp_Status)
    setEditID(data._id)
    setIsEdit(true);
    setisOpen(true)
  }

  const Deleting = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const { data } = await axios.delete(`${endPoint}/${id}`);
        if (data.status === 'Success') {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          setTim(new Date());
        }
        else {
          Swal.fire(
            'Delete Error',
            'Your file has been deleted.',
            'danger'
          )
        }


      }
    })
  };

  const data = {

    columns: [

      {
        label: "Name",
        field: "Emp_Name",
        sort: "asc",
        width: 300,

      },
      {
        label: "Phone",
        field: "Emp_Phone",
        sort: "asc",
        width: 200,
      },
      {
        label: "Email",
        field: "Emp_Email",
        sort: "asc",
        width: 200,
      },
      {
        label: "Age",
        field: "Emp_Age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Job Title",
        field: "Emp_JobTitle",
        sort: "asc",
        width: 100,
      },
      {
        label: "Salary",
        field: "Emp_Salary",
        sort: "asc",
        width: 100,
      },
      {
        label: "Address",
        field: "Emp_Address",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "Emp_Status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 150,
      },
    ],
    rows: apiData?.map(data => {
      data.action = (
        <div className="d-flex">
          {/* <button onClick={() => HandleEdit(data)} className='btn btn-primary'>Edit</button> */}
          <Button onClick={() => HandleEdit(data)} className="bg-primary ion ion-md-create text-white"></Button>
          <Button onClick={() => Deleting(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>

        </div>
      )
      data.Emp_Name = (
        <Link to={`/Report/${data._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          {data.Emp_Name}
        </Link>
      )



      return data
    })
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Emplpoyee</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Modal
              isOpen={isOpen}
            // toggle={() => {
            //   tog_standard()
            // }}
            >
              <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                  Modal Heading
                </h5>
                <button
                  type="button"
                  onClick={() => CloseTog()}
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit(HandleSubmitka)} className='text-start'>
                  <div class="form-row">
                    <div class="form-row">
                      <div className="row">
                        <div class="form-group col-md-6 text-start">
                          <label for="inputEmail4">Name</label>
                          <input type="text" class="form-control" placeholder="Enter Employee Name"
                            {...register("Emp_Name")}
                          />
                          <p>
                            {errors.Emp_Name && (
                              <span className="text-danger">{errors.Emp_Name.message}</span>


                            )}

                          </p>

                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputnumber">Phone</label>
                          <input type="Phone" class="form-control" placeholder="Phone Number"

                            {...register("Emp_Phone")}
                          />
                          <p>
                            {errors.Emp_Phone && (
                              <span className="text-danger">{errors.Emp_Phone.message}</span>


                            )}

                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div className="row">
                        <div class="form-group col-md-6">
                          <label for="inputnumber">Employee Salary</label>
                          <input type="number" class="form-control" placeholder="Salary"

                            {...register("Emp_Salary")}
                          />
                          <p>
                            {errors.Emp_Salary && (
                              <span className="text-danger">{errors.Emp_Salary.message}</span>


                            )}

                          </p>
                        </div>

                        <div class="form-group col-md-6">
                          <label for="inputnumber">Age</label>
                          <input type="Number" class="form-control" id="inputnumber" placeholder="Enter Employee Age"

                            {...register("Emp_Age")}
                          />
                          <p>
                            {errors.Emp_Age && (
                              <span className="text-danger">{errors.Emp_Age.message}</span>


                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div className="row">
                        <div class="form-group col-md-6">
                          <label for="inputEmail4">Email</label>
                          <input type="email" class="form-control" id="inputAddress2" placeholder="Email"
                            {...register("Emp_Email")}
                          />
                          <p>
                            {errors.Emp_Email && (
                              <span className="text-danger">{errors.Emp_Email.message}</span>


                            )}

                          </p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputAddress2">Address</label>
                          <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"
                            {...register("Emp_Address")}
                          />
                          <p>
                            {errors.Emp_Address && (
                              <span className="text-danger">{errors.Emp_Address.message}</span>


                            )}

                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div className="row">
                        <div class="form-group col-md-6">
                          <label for="inputtext">Job Title</label>
                          <input type="text" class="form-control" id="inputAddress2" placeholder="Enter The Job Title"
                            {...register("Emp_JobTitle")}
                          />
                          <p>
                            {errors.Emp_JobTitle && (
                              <span className="text-danger">{errors.Emp_JobTitle.message}</span>


                            )}

                          </p>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputAddress2">Status</label>
                          <input type="text" class="form-control" id="inputAddress2" placeholder="Active , Suspended , Internaship"
                            {...register("Emp_Status")}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* <button type="submit" className={`btn  mt-4  ${isEdit ? `btn-success` : `btn-primary`}  `} style={{ marginLeft: '10px' }}>{
                    isEdit ? 'Update' : 'Save'
                  }</button> */}
                </form>
                {/* <ToastContainer /> */}



              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => CloseTog()}


                  className="btn btn-secondary waves-effect"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button onClick={handleSubmit(HandleSubmitka)} type="submit" className={`btn   ${isEdit ? `btn-success` : `btn-primary`}`}>{
                  isEdit ? 'Update' : 'Save'
                }</button>
              </div>
            </Modal>
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <Row>
                      <Col-10></Col-10>
                    </Row>
                    <CardTitle className="h4">Default Datatable </CardTitle>

                    <Row>
                      <Col className="col-10"></Col>
                      <Col className="col-2">
                        <Button onClick={() => tog_standard()} className="btn bg-primary ms-4 text-white mb-2">Add Employee</Button>
                      </Col>
                    </Row>
                    <MDBDataTable responsive bordered data={data} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EmployeeComp