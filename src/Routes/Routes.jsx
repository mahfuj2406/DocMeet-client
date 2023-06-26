import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../pages/Shared/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers/ManageUsers";
import AllDoctors from "../pages/Dashboard/admin/AllDoctors/AllDoctors";
import AllPatients from "../pages/Dashboard/admin/AllPatients/AllPatients";
import SearchResults from "../pages/SearchResults/SearchResults";
import DoctorAppointment from "../pages/DoctorAppointment/DoctorAppointment";
import UpdateProfile from "../pages/Dashboard/patient/UpdateProfile/UpdateProfile";
import Medicine from "../pages/Medicine/Medicine";
import Blogs from "../pages/Blogs/Blogs";
import BloodDonors from "../pages/BloodDonors/BloodDonors";
import Ambulance from "../pages/Ambulance/Ambulance";
import ManageAmbulance from "../pages/Dashboard/admin/ManageAmbulance/ManageAmbulance";
import ManageBloodDonors from "../pages/Dashboard/admin/ManageBloodDonors/ManageBloodDonors";
import DoctorProfileUpdate from "../pages/Dashboard/doctor/DoctorProfileUpdate/DoctorProfileUpdate";
import GoOnline from "../pages/Dashboard/doctor/GoOnline/GoOnline";
import UpdateSchedule from "../pages/Dashboard/doctor/UpdateSchedule/UpdateSchedule";
import AdminHome from "../pages/Dashboard/admin/AdminHome/AdminHome";
import MyTotalPatients from "../pages/Dashboard/doctor/MyTotalPatients/MyTotalPatients";
import MyAppointments from "../pages/Dashboard/patient/MyAppointments/MyAppointments";
import PaymentSuccess from "../pages/Shared/PaymentSuccess/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/patient/PaymentHistory/PaymentHistory";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'doctor-appointment',
          element: <DoctorAppointment></DoctorAppointment>
      },
        {
            path: 'find-doctor/:area/:speciality',
            element: <SearchResults></SearchResults>
        },
        {
            path: 'medicine',
            element: <Medicine></Medicine>
        },
        {
            path: 'blogs',
            element: <Blogs></Blogs>
        },
        {
            path: 'ambulances',
            element: <Ambulance></Ambulance>
        },
        {
            path: 'blood-donors',
            element: <BloodDonors></BloodDonors>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        },
        {
            path: 'payment/success/:tranId',
            element: <PaymentSuccess></PaymentSuccess>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path:'home',
          element:<AdminHome></AdminHome>
        },
        {
          path:'allUsers',
          element:<ManageUsers></ManageUsers>
        },
        {
          path:'bloodDonors',
          element:<ManageBloodDonors></ManageBloodDonors>
        },
        {
          path:'allDoctors',
          element: <AllDoctors></AllDoctors>
        },
        {
          path:'allPatients',
          element: <AllPatients></AllPatients>
        },
        {
          path: 'allAmbulances',
          element: <ManageAmbulance></ManageAmbulance>
        },
        {
          path: 'patient/profile-update/:email',
          element: <UpdateProfile></UpdateProfile>
        },
        {
          path: 'doctor/profile-update/:email',
          element: <DoctorProfileUpdate></DoctorProfileUpdate>
        },
        {
          path: 'doctor/schedule-update/:email',
          element: <UpdateSchedule></UpdateSchedule>
        },
        {
          path: 'doctor/goOnline',
          element: <GoOnline></GoOnline>
        },
        {
          path: 'doctor/my-patients',
          element: <MyTotalPatients></MyTotalPatients>
        },
        {
          path: 'patient/my-appointments',
          element: <MyAppointments></MyAppointments>
        },
        {
          path: 'patient/paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        // {
        //   path: 'my-enrolled-classes',
        //   element: <MyEnrolledClasses></MyEnrolledClasses>
        // },
        // {
        //   path: 'addClass',
        //   element: <AddClass></AddClass>
        // },
        // {
        //   path: 'myClasses',
        //   element: <MyClasses></MyClasses>
        // }
      ]
    }
  ]);
  export default router;