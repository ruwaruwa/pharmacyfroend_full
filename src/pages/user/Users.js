
import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Col, Container, Row, Table, Button, Modal, Card, CardBody, CardTitle, } from "reactstrap"
import axios from "axios"
import { useEffect } from "react";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function Users() {
    const [catagory, setcagory] = useState([])
    const [rus,setrus]= useState(new Date());
    //const [rus, setrus] = useState(new Date())
    const [isOpen, setisOpen] = useState(false)
const [edit, setedit]=useState(false)
const [editId,seteditId]=useState()
   const {register,handleSubmit,reset,setValue,formState:{errors}}=useForm()
    useEffect(() => {
        const catagorylist = async () => {
            const catagorlis = await axios.get('http://localhost:2000/users')

            //console.log(catagorlis.data)
            const xogta = await catagorlis.data
            setcagory(xogta)
            // console.log(xogta)
        }
        catagorylist()
    }, [rus])
//pos
// const catsave= async(event)=> {

// if(edit){
//     const urlupdate=`http://localhost:2000/users/${editId}`
// const additems=  await axios.put(urlupdate,event)
// reset()
// setedit(false)
//     console.log(additems)
//     setrus(new Date())
//     Swal.fire(
//         'Done!',
//         'Your data has been Updated.',
//         'success'
//       )

// }
// else{
//     const additems=  await axios.post('http://localhost:2000/users',event)
//     console.log(additems)
//      //console.log(newitem)
//      if(additems.data.status=='Success')
//      { 
//         Swal.fire(
//             'Done!',
//             'Your data has been saved.',
//             'success'
//           )
//           reset()
//           setrus(new Date())
//         //setcagory([additems.data.info,...catagory])
//      }
//     };
// }
const usersave= async(event)=> {

    if(edit){
        const urlupdate=`http://localhost:2000/users/${editId}`
       
    const additems=  await axios.put(urlupdate,event)
    reset()
    setedit(false)
        console.log(additems)
        setrus(new Date())
        reset()
        Swal.fire(
            'Done!',
            'Your data has been updated.',
            'success'
          )
    
    }
    else{
        const additems=  await axios.post('http://localhost:2000/users',event)
        console.log(additems)
         //console.log(newitem)
         if(additems.data.status=='Success')
         { 
            setrus(new Date())
            // reset()
            Swal.fire(
                'Done!',
                'Your data has been posted.',
                'success'
              )
              reset()
             
            //setcagory([additems.data.info,...catagory])
         }
        };
    }

//del
function tog_standard() {
    setisOpen(!isOpen)

}

function CloseTog() {
    setisOpen(!isOpen)
    setedit(false)
    reset();

}
    const del= async(id)=>{
    alert(id)
    const delet = await axios.delete(`http://localhost:2000/users/${id}`);
console.log(delet)
setrus(new Date())
reset()
Swal.fire(
    'Done!',
    'Your data has been deleted.',
    'success'
  )
    }
    
    //update(
    const Catedit= async(Data)=>{
    console.log(Data.username)
    setValue("username",Data.username)
    setValue("password",Data.password)
      setValue("userstatus",Data.userstatus)
seteditId(Data._id)
setedit(true)

    }

   ///
   const data = {

    columns: [

        {
            label: "UserName",
            field: "username",
            sort: "asc",
            width: 300,

        },
        {
            label: "password",
            field: "password",
            sort: "asc",
            width: 200,
        },
        {
            label: "userstatus",
            field: "userstatus",
            sort: "asc",
            width: 200,
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
                <Button onClick={() => Catedit(data)} className="bg-success ion ion-md-create text-white"></Button>
                <Button onClick={() => del(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>

            </div>
        )



        return data
    })
}
   ///

   return (
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
                            <form onSubmit={handleSubmit(usersave)}>
                                <div class="form-row">
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputAddress2">username</label>
                                            <input type="text" class="form-control" id="inputAddress2" placeholder="Enter username"
                                                {...register('username', {
                                                    required: true
                                                })}
                                            />
                                            {
                                                errors.username && <span className='text-danger'>faldan sogeli qimaha</span>
                                            }
                                        </div >
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputAddress2">password</label>
                                            <input type="text" class="form-control" id="inputAddress2" placeholder="Enter password"
                                                {...register("password", {
                                                    required: true
                                                })}
                                            />
                                            {
                                                errors.password && <span className='text-danger'>faldan sogeli quanty</span>
                                            }
                                        </div >
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputAddress2">userstatus</label>
                                            <input type="text" class="form-control" id="inputAddress2" placeholder="Enter userstatus"
                                                {...register("userstatus", {
                                                    required: true
                                                })}
                                            />
                                            {
                                                errors.userstatus && <span className='text-danger'>faldan sogeli magac</span>
                                            }
                                        </div >
                                    </div>
                                </div>
                                {/* {<button type="save" class="btn btn-primary mt-4"
                                    style={{ marginLeft: '10px' }}>
                                    {edit ? "Update " : "Save"}
                                </button>} */}
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
                            <button onClick={handleSubmit(usersave)} type="submit" className={`btn   ${edit ? `btn-success` : `btn-primary`}`}>{
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
                                            <Button onClick={() => tog_standard()} className="btn bg-primary ms-4 text-white mb-2">Add Sels</Button>
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
export default Users