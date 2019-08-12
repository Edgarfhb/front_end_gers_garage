
import Bookings from "../views/Booking/Booking.jsx";

var userDashRoutes = [
  {
    path: "/userdashboard/bookings",
    name: "Bookings",
    icon: "nc-icon nc-paper",
    component: Bookings
  },
  {
    redirect: true,
    path: "/userdashboard",
    pathTo: "/userdashboard/bookings"
  }
];
export default userDashRoutes;
