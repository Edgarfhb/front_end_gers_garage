import UserLogin from "../layouts/Login/UserLogin.jsx";
import AdminLogin from "../layouts/Login/AdminLogin.jsx";
import UserDashboard from "../layouts/Dashboard/UserDashboard.jsx";
import AdminDashboard from "../layouts/Dashboard/AdminDashboard.jsx";
import HomeScreen from "../layouts/HomeScreen/HomeScreen.jsx"

var indexRoutes = [
  {
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard
  },
  {
    path: "/userdashboard",
    name: "UserDashboard",
    component: UserDashboard
  },
  {
    path: "/adminlogin",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/userlogin",
    name: "UserLogin",
    component: UserLogin
  },
  {
    path: "/",
    name: "Home",
    component: HomeScreen
  }
];

export default indexRoutes;
