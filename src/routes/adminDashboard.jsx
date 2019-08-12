import Roster from "../views/Roster/Roster";
import Invoices from "../views/Invoices/Invoices";
import UsersBookings from "../views/UsersBookings/UsersBookings";

var adminDashRoutes = [

  {
    path: "/admindashboard/usersbookings",
    name: "Users Bookings",
    icon: "nc-icon nc-settings",
    component: UsersBookings
  },
  {
    path: "/admindashboard/workersroster",
    name: "workers Roster",
    icon: "nc-icon nc-badge",
    component: Roster
  },
  {
    path: "/admindashboard/invoices",
    name: "Invoices",
    icon: "nc-icon nc-money-coins",
    component: Invoices
  },
  {
    redirect: true,
    path: "/admindashboard",
    pathTo: "/admindashboard/usersbookings",
    name: "Users Bookings"
  }
];
export default adminDashRoutes;
