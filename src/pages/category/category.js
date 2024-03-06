//import React,{useState} from "react"
//import MetaTags from 'react-meta-tags';
import { Col, Button, Container, Table ,  Modal, Card, CardBody, CardTitle,Row,Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
//import axios from "axios"
//import {useEffect } from "react"
//import { Button, Container, Table } from 'react-bootstrap';
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact";

  function Catget() {
    const [catagory, setcagory] = useState([])
    const [rus,setrus]=useState(new Date());
    
const [edit, setedit]=useState(false)
const [editId,seteditId]=useState()

const [isOpen, setisOpen] = useState(false)
const [menu, setMenu] = useState(false)
const toggle = () => {
    setMenu(!menu)
  }

   const {register,handleSubmit,reset,setValue,formState:{errors}}=useForm()
    useEffect(() => {
        const catagorylist = async () => {
            const catagorlis = await axios.get('http://localhost:2000/catgories')

            //console.log(catagorlis.data)
            const xogta = await catagorlis.data
            setcagory(xogta)
            // console.log(xogta)
        }
        catagorylist()
    }, [rus])
//pos
const catsave= async(event)=> {

if(edit){
    const urlupdate=`http://localhost:2000/catgories/${editId}`
const additems=  await axios.put(urlupdate,event)
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
else{
    const additems=  await axios.post('http://localhost:2000/catgories',event)
    console.log(additems)
     //console.log(newitem)
     if(additems.data.status=='Success')
     { 
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

function tog_standard() {
    setisOpen(!isOpen)

  }

  function CloseTog() {
    setisOpen(!isOpen)
    setedit(false)
    reset();

  }
//del
    const del= async(id)=>{
    alert(id)
    const delet = await axios.delete(`http://localhost:2000/catgories/${id}`);
console.log(delet)
setrus(new Date())
Swal.fire(
    'Done!',
    'Your data has been deleted.',
    'success'
  )
    }
    
    //update(
    const Catedit= async(Data)=>{
    console.log(Data.name)
    setValue("name",Data.name)
seteditId(Data._id)
setedit(true)
setisOpen(true)
    }

    //data table
    const data = {

        columns: [

            {
                label: "Cat Name",
                field: "name",
                sort: "asc",
                width: 300,

            },
            {
                label: "Cat Date",
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
    //        <div className='alert alert-info '>Catagoreis</div>
    //         <Container className='bg-body shadow p-3 mb-3 bg-body-tertiary rounded w-4 content-box me-5' style={{marginLeft:'20%',width:'40%'}}>
    //             <form onSubmit={handleSubmit(catsave)}>
    //                 <div class="form-row">
    //                     <div class="form-row">
                       
    //                         <div class="form-group col-md-6">
    //                             <label for="inputAddress2">cat Name</label>
    //                             <input type="text"   class="form-control" id="inputAddress2" placeholder="Enter Subcatagory Name" 
    //                              {...register("name",{
    //                                 required:true
    //                              })}
    //                             />
    //                            {
    //                             errors.name && <span >faldan sogeli magac</span>
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
                            
    //                             <th>Catagory Name</th>
    //  <th>update</th>
    //     <th>Delete</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         { catagory?.map((xogta,index)=> {
    //                             return (
    //                                 <tr key={index}>
    //                                     <td>{xogta._id}</td>
    //                                     <td>{xogta.name}</td>
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
            <title>categor</title>
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
                    <form onSubmit={handleSubmit(catsave)}>
                    <div class="form-row">
                        <div class="form-row">
                       
                            <div class="form-group col-md-6">
                                <label for="inputAddress2">cat Name</label>
                                <input type="text"   class="form-control" id="inputAddress2" placeholder="Enter Subcatagory Name" 
                                 {...register("name",{
                                    required:true
                                 })}
                                />
                               {
                                errors.name && <span >faldan sogeli magac</span>
                               }
                            </div >  
                            
                            
                            
                        </div>
                       

                    </div>
     {/* {<button type="save"class="btn btn-primary mt-4" 
     style={{ marginLeft: '10px' }}>

        {edit ? "Update " : "Save"}
     </button> } */}
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
                        <button onClick={handleSubmit(catsave)} type="submit" className={`btn   ${edit ? `btn-success` : `btn-primary`}`}>{
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
                                        <Button onClick={() => tog_standard()} className="btn bg-primary ms-4 text-white mb-2">Add Catgory</Button>
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
//Subcatgory

export default Catget;
