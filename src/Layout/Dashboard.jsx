import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaWallet } from 'react-icons/fa';
import { LuBookPlus } from "react-icons/lu";
import { ImBooks, ImExit } from "react-icons/im";
import { BiSelectMultiple } from "react-icons/bi";
import { IoIosAlbums } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { Helmet } from "react-helmet";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useRole from "../hooks/useRole";

const Dashboard = () => {
    const [toggleMenu, setToggleMenu] = useState(true);
    const { user, logOut } = useAuth();

    const [role, setRole] = useState("");
    useEffect(()=>{
        fetch(`http://localhost:5000/users/role/${user.email}`)
        .then(res =>res.json())
        .then(data =>setRole(data.role))
    },[user])

    console.log(role);

    // const isAdmin = false;
    // const [isAdmin] = useAdmin();
    // console.log("is Admin state : ", isAdmin);
    // const [isInstructor] = useInstructor();

    console.log("Toggle 1: ", toggleMenu);

    const toggleFunction = () => {
        if (toggleMenu) {
            setToggleMenu(false);
        }
        else {
            setToggleMenu(true)
        }
        console.log("Toggle 3: ", toggleMenu);
    }

    console.log("Toggle 2: ", toggleMenu);

    return (
        <div className="">
            <Helmet>
                <title>DocMeet || Dashboard</title>
            </Helmet>
            <label onClick={() => toggleFunction()} className="btn bg-blue-300 lg:hidden">
                {
                    toggleMenu ?
                        <GrClose></GrClose>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                }
            </label>
            <div className="flex">
                <div className={`bg-blue-200 md:pt-10 md:mt-10 w-6/12 md:w-2/12 border z-10 relative ${toggleMenu ? "" : "hidden"}`}>
                <h1 className="text-center mt-10 md:mt-0">{user.displayName}</h1>
                {
                    role==="admin" && <span className="px-2 border rounded bg-yellow-500 absolute top-2 end-2">admin</span>
                }
                    <ul className="menu p-4 w-60 ">
                        {
                            role==="admin" ? <>
                                <li><NavLink to="/dashboard/home"><FaHome></FaHome> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/allUsers"><FaUsers></FaUsers> Manage Users</NavLink></li>
                                <li><NavLink to="/dashboard/allDoctors"><FaUsers></FaUsers> All Doctors</NavLink></li>
                                <li><NavLink to="/dashboard/allPatients"><FaUsers></FaUsers> All Patients</NavLink></li>
                                <li><NavLink to="/dashboard/allAmbulances"><FaUsers></FaUsers> Ambulance List</NavLink></li>
                                <li><NavLink to="/dashboard/bloodDonors"><FaUsers></FaUsers> Blood Donors</NavLink></li>

                            </>
                                :
                                role==="doctor" ? <>
                                    <li><NavLink to="/dashboard/doctor/my-patients"><LuBookPlus></LuBookPlus> My Patients</NavLink></li>
                                    <li><NavLink to="/dashboard/doctor/goOnline"><ImBooks></ImBooks> Go Online</NavLink></li>
                                    <li><NavLink to={`/dashboard/doctor/profile-update/${user.email}`}><BiSelectMultiple></BiSelectMultiple>Update My Profile</NavLink></li>
                                    <li><NavLink to={`/dashboard/doctor/schedule-update/${user.email}`}><BiSelectMultiple></BiSelectMultiple>Schedule & Fees</NavLink></li>
                                </>
                                    :
                                    role==="patient" ?
                                        <>
                                            <li><NavLink to={`/dashboard/patient/profile-update/${user.email}`}><BiSelectMultiple></BiSelectMultiple>Update My Profile</NavLink></li>
                                            <li><NavLink to="/dashboard/patient/my-appointments"><IoIosAlbums></IoIosAlbums>My appointments</NavLink></li>
                                            <li><NavLink to="/dashboard/paymentHistory"><FaWallet></FaWallet>Test Reports</NavLink></li>
                                            <li><NavLink to="/dashboard/patient/paymentHistory"><FaWallet></FaWallet>Payment History</NavLink></li>
                                        </> :
                                        <>Loading</>
                        }

                        <div className="divider"></div>
                        <li><NavLink to="/"><FaHome></FaHome>DocMeet Home</NavLink> </li>
                        <div className="divider"></div>
                        <li className=""><a className="border w-1/2 bg-blue-500 text-white" onClick={logOut}>Logout <ImExit></ImExit> </a></li>
                    </ul>

                </div>
                <div className="w-full px-5 md:px-1">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;