import React,{useState} from "react"
import MetaTags from 'react-meta-tags';
import servicesIcon1 from "../../assets/images/services-icon/01.png";
import servicesIcon2 from "../../assets/images/services-icon/02.png";
import servicesIcon3 from "../../assets/images/services-icon/03.png";
import servicesIcon4 from "../../assets/images/services-icon/04.png";
import { Col, Container, Row,Card ,CardBody , Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"
import axios from "axios";
import { Link } from "react-router-dom"
import {useEffect } from "react";

const Dashboard = () => {
  const [menu, setMenu] = useState(false)
  // const toggle = () => {
  //   setMenu(!menu)
  // }
  const [dashbuardsumary,setdashbuardsumary]=useState([])
  const[leatestsels,setleatest]=useState([])
  useEffect(() => {
   async function onload () {
     try {
       const epiEndPoint = "http://localhost:2000";
      //const epiEndPoint = process.env.REACT_APP_ENDPOINT
      const {data} = await axios.get(`${epiEndPoint}/sumary`)
      console.log("data",data)
      setdashbuardsumary(data)
      const {data:dates } = await axios.get(`${epiEndPoint}/sels`)
      // console.log("data",data)
      //setdashbuardsumary(data)
      setleatest(dates)
     } catch (error) {
      console.log(error.message)
     }
    }
    onload()
  }, [])
  
//   const data = {

//     columns: [

//         {
//             label: "Customer Name",
//             field: "customerka",
//             sort: "asc",
//             width: 300,

//         },
//         {
//             label: "Quantity",
//             field: "qty",
//             sort: "asc",
//             width: 200,
//         },
//         {
//             label: "Price",
//             field: "price",
//             sort: "asc",
//             width: 200,
//         },
//         {
//             label: "Sales Date",
//             field: "createdAt",
//             sort: "asc",
//             width: 100,
//         },
        
       
//         {
//             label: "Action",
//             field: "action",
//             sort: "asc",
//             width: 150,
//         },
//     ],
//     rows: leatestsels?.map(data => {
//         data.action = (
//             <div className="d-flex">
//                 {/* <button onClick={() => HandleEdit(data)} className='btn btn-primary'>Edit</button> */}
//                 <Button onClick={() => Selsedit(data)} className="bg-primary ion ion-md-create text-white"></Button>
//                 <Button onClick={() => deletes(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>

//             </div>
//         )



//         return data
//     })
// }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          <div className="page-title-box">
            <Row className="align-items-center">
              <Col md={8}>
                <h6 className="page-title">Dashboard</h6>
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active fs-2 text-dark">Welcome to Pharcmacy System</li>
                </ol>
              </Col>

              <Col md="4">
                <div className="float-end d-none d-md-block">
                
                </div>
              </Col>
            </Row>
            {/* //// dashbord */}
            <Row>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-success text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon1} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                   total of  sels
                    </h5>
                    <h4 className="fw-medium font-size-24">
                     {dashbuardsumary.numselsdata}
                     
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    {/* <div className="mini-stat-label bg-success">
                      <p className="mb-0">+ 12%</p>
                    </div> */}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>
                    <p className="text-white-50 mb-0 mt-1">Since last sels</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-success text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon2} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      tootal of price
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {"$"+dashbuardsumary.price}
                      <i className="mdi mdi-arrow-down text-danger ms-2"></i>
                    </h4>
                    {/* <div className="mini-stat-label bg-danger">
                      <p className="mb-0">- 28%</p>
                    </div> */}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last price</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4} md={6}>
              <Card className="mini-stat bg-success text-white">
                <CardBody>
                  <div className="mb-4">
                    <div className="float-start mini-stat-img me-4">
                      <img src={servicesIcon3} alt="" />
                    </div>
                    <h5 className="font-size-16 text-uppercase mt-0 text-white-50">
                      total of Quantity
                    </h5>
                    <h4 className="fw-medium font-size-24">
                    {"$"+dashbuardsumary.qty}
                      <i className="mdi mdi-arrow-up text-success ms-2"></i>
                    </h4>
                    {/* <div className="mini-stat-label bg-info">
                      <p className="mb-0"> 00%</p>
                    </div> */}
                  </div>
                  <div className="pt-2">
                    <div className="float-end">
                      <Link to="#" className="text-white-50">
                        <i className="mdi mdi-arrow-right h5"></i>
                      </Link>
                    </div>

                    <p className="text-white-50 mb-0 mt-1">Since last Quantity</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
           
          </Row>
          <Row>
            <Col xl={12}>
            <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Latest Transaction</h4>
                  <div className="table-responsive">
                    <table className="table table-hover table-centered table-nowrap mb-0">
                      <thead className="bg-success fs-1">
                        <tr className="fs-2">
                        <th scope="col">ID</th>
                          <th scope="col">price</th>
                          <th scope="col">qty</th>
                          <th scope="col">customerka</th>
                          <th scope="col">createdAt</th>
                          {/* <th scope="col" colSpan="2">
                            Status
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <th scope="row">#14256</th>
                          <td>
                            <div>
                              
                              Philip Smead
                            </div>
                          </td>
                          <td>15/1/2018</td>
                          <td>$94</td>
                          <td>
                            <span className="badge bg-success">
                              Delivered
                            </span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr> */}
                        {/* <tr>
                          <th scope="row">#14257</th>
                          <td>
                            <div>
                              <img
                                src={user3}
                                alt=""
                                className="avatar-xs rounded-circle me-2"
                              />{" "}
                              Brent Shipley
                            </div>
                          </td>
                          <td>16/1/2019</td>
                          <td>$112</td>
                          <td>
                            <span className="badge bg-warning">Pending</span>
                          </td>
                          <td>
                            <div>
                              <Link to="#" className="btn btn-primary btn-sm">
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr> */}
                        {leatestsels?.map((dates)=>{
                          return <tr>
                            <td>{dates._id}</td>
                            <td>{dates.price}</td>
                            <td>{dates.qty}</td>
                            <td>{dates.customerka}</td>
                            <td>{dates.createdAt}</td>
                          </tr>
                        })}
                        
                       
                        
                      </tbody>
                    </table>
                  </div>
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

export default Dashboard