import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";


const AllPatients = () => {

    const { data: patients = [], refetch } = useQuery(['patients'], async () => {
        const res = await fetch('http://localhost:5000/admin/patients')
        if(!res.ok){
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    return (
        <div className='container mx-auto search-page py-10'>
        <Helmet>
            <title>DocMeet || All Patients</title>
        </Helmet>
        <SectionTitle heading={"All Patients"}></SectionTitle>
        <h1 className='bg-slate-300 inline-block px-3 py-1 rounded'>Total Patients : {patients.length}</h1>

        <div className="overflow-x-auto">
            <table className="table table-pin-rows table-pin-cols">
                <thead>
                    <tr className='text-md md:text-xl text-center'>
                        <td>#</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td colSpan="2">Action</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        patients.map((user, index) =>
                            <tr className="my-3 text-center text-2xl md:text-3xl"
                                key={user._id}
                            >
                                <th className="text-md md:text-lg"> {index + 1} </th>
                                <td className="text-md md:text-lg">{user.name}</td>
                                <td className="text-md md:text-lg">{user.email}</td>
                                <td className="text-md md:text-lg">{user.role}</td>
                                <td className="text-md md:text-lg text-start"> 
                                    <Link><button className="btn btn-ghost btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">View Details</button></Link>
                                </td>

                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllPatients;