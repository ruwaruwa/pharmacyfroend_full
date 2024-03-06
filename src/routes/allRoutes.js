import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
//
import EmployeeComp from "../pages/Employee/employeeCom"
import Cetegory from "../pages/category/category"
import item from "../pages/itmes/itme"
import subcategory from '../pages/subcategory/Subcategory'
import sels from '../pages/sels/Sels'
import user from '../pages/user/Users'
// Dashboard
import Dashboard from "../pages/Dashboard/index"
import { Form } from 'reactstrap';

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  //{ path: "/employee", component: EmployeeComp},
  { path: "/catgories", component: Cetegory},
  { path: "/item", component: item},
  { path: "/subcat", component:subcategory},
  { path: "/sels", component:sels},
  { path: "/users", component:user},
  // // //profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { userRoutes, authRoutes }
