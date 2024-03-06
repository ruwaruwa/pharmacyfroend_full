import React, { useState } from "react"
//import MetaTags from 'react-meta-tags';
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Col, Container, Row, Table, Button, Modal, Card, CardBody, CardTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import axios from "axios"
import { useEffect } from "react";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
//import useForm from 'react-hook-form'
//import React, { useState } from "react";


function Subcatgory() {
    const [catagory, setcagory] = useState([])
    const [rus, setrus] = useState(new Date());

    const [edit, setedit] = useState(false)
    const [editId, seteditId] = useState()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const [isOpen, setisOpen] = useState(false)
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }


    useEffect(() => {
        const catagorylist = async () => {
            const catagorlis = await axios.get('http://localhost:2000/subcat')

            //console.log(catagorlis.data)
            const xogta = await catagorlis.data
            setcagory(xogta)
            // console.log(xogta)
        }
        catagorylist()
    }, [rus])
    //pos
    const subsave = async (event) => {

        if (edit) {
            const urlupdate = `http://localhost:2000/subcat/${editId}`
            const additems = await axios.put(urlupdate, event)
            reset()
            setedit(false)
            console.log(additems)
            setrus(new Date())
            Swal.fire(
                'Done!',
                'Your data has been Updated.',
                'success'
            )

        }
        else {
            const additems = await axios.post('http://localhost:2000/subcat', event)
            console.log(additems)
            //console.log(newitem)
            if (additems.data.status == 'Success') {
                Swal.fire(
                    'Done!',
                    'Your data has been saved.',
                    'success'
                )
                reset()
                setrus(new Date())
                //setcagory([additems.data.info,...catagory])
            }
        };
    }

    //del
    const del = async (id) => {
        alert(id)
        const delet = await axios.delete(`http://localhost:2000/subcat/${id}`);
        console.log(delet)
        setrus(new Date())
        Swal.fire(
            'Done!',
            'Your data has been deleted.',
            'success'
        )
    }

    //
    function tog_standard() {
        setisOpen(!isOpen)

    }

    function CloseTog() {
        setisOpen(!isOpen)
        setedit(false)
        reset();

    }

    //update(
    const Catedit = async (Data) => {
        console.log(Data.subname)
        setValue("subname", Data.subname)
        setValue("describtion", Data.describtion)
        seteditId(Data._id)
        setedit(true)
        setisOpen(true)
    }
    //data table
    const data = {

        columns: [

            {
                label: "subname Name",
                field: "subname",
                sort: "asc",
                width: 300,

            },
            {
                label: "describtion",
                field: "describtion",
                sort: "asc",
                width: 200,
            },
            // {
            //     label: "Price",
            //     field: "price",
            //     sort: "asc",
            //     width: 200,
            // },
            {
                label: "sub Date",
                field: "createdAt",
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
        rows: catagory?.map(data => {
            data.action = (
                <div className="d-flex">
                    {/* <button onClick={() => HandleEdit(data)} className='btn btn-primary'>Edit</button> */}
                    <Button onClick={() => Catedit(data)} className="bg-primary ion ion-md-create text-white"></Button>
                    <Button onClick={() => del(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>

                </div>
            )



            return data
        })
    }
    //

    return (
        //     <div>
        //        <div className='alert alert-danger '>Subcatgory</div>
        //         <Container className='bg-body shadow p-3 mb-3 bg-body-tertiary rounded w-4 content-box me-5' style={{marginLeft:'20%',width:'40%'}}>
        //             <form onSubmit={handleSubmit(subsave)}>
        //                 <div class="form-row">
        //                     <div class="form-row">

        //                         <div class="form-group col-md-6">
        //                             <label for="inputAddress2"> subname</label>
        //                             <input type="text"   class="form-control" id="inputAddress2" placeholder="Enter Subcatagory Name" 
        //                              {...register("subname",{
        //                                 required:true
        //                              })}
        //                             />
        //                            {
        //                             errors.subname && <span className='text-danger'>faldan sogeli magac</span>
        //                            }
        //                         </div >  
        //                         <div class="form-group col-md-6">
        //                             <label for="inputAddress2">describtion</label>
        //                             <input type="text"   class="form-control" id="inputAddress2" placeholder="Enter Subcatagory description" 
        //                              {...register("describtion",{
        //                                 required:true
        //                              })}
        //                             />
        //                            {
        //                             errors.describtion && <span className='text-danger'>>faldan sogeli magac</span>
        //                            }
        //                         </div >


        //                     </div>


        //                 </div>
        //  {<button type="save"class="btn btn-primary mt-4" 
        //  style={{ marginLeft: '10px' }}>

        //     {edit ? "Update " : "Save"}
        //  </button> }
        //             </form>

        //             </Container>
        //         <Container style={{ marginTop: '40px' }}>
        //             <div className='row '>
        //                 <Table striped bordered hover size="sm" className='mt-4'>
        //                     <thead className='bg-primary'>
        //                         <tr>
        //                             <td>ID</td>
        //                         <th>sub_name</th>
        //                         <th>describtion</th>
        //  <th>update</th>
        //     <th>Delete</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         { catagory?.map((xogta,index)=> {
        //                             return (
        //                                 <tr key={index}>
        //                                     <td>{xogta._id}</td>
        //                                     <td>{xogta.subname}</td>
        //                                     <td>{xogta.describtion}</td>
        //     <td> <Button onClick={()=>Catedit(xogta)} className='btn btn-info btn-sm'>
        //                 update</Button></td>
        //      <td> <Button onClick={()=>del(xogta._id)} className='btn btn-danger btn-sm'>Delete</Button></td>
        //                                 </tr>
        //                             )

        //                         })}
        //                     </tbody>
        //                 </Table>

        //             </div>
        //              </Container>
        //     </div>
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Sels</title>
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
                                <form onSubmit={handleSubmit(subsave)}>
                                    <div class="form-row">
                                        <div class="form-row">

                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2"> subname</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter Subcatagory Name"
                                                    {...register("subname", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.subname && <span className='text-danger'>faldan sogeli magac</span>
                                                }
                                            </div >
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">describtion</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter Subcatagory description"
                                                    {...register("describtion", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.describtion && <span className='text-danger'>faldan sogeli magac</span>
                                                }
                                            </div >


                                        </div>


                                    </div>
                                    {<button type="save" class="btn btn-primary mt-4"
                                        style={{ marginLeft: '10px' }}>

                                        {edit ? "Update " : "Save"}
                                    </button>}
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
                                <button onClick={handleSubmit(subsave)} type="submit" className={`btn   ${edit ? `btn-success` : `btn-primary`}`}>{
                                    edit ? 'Update' : 'Save'
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
                                                <Button onClick={() => tog_standard()} className="btn bg-primary ms-4 text-white mb-2">Add Subcagry</Button>
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
    );

}
export default Subcatgory