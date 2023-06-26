import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const ManageBloodDonors = () => {

    const { data: donors = [], refetch } = useQuery(['donors'], async () => {
        const res = await fetch('http://localhost:5000/admin/donors')
        if(!res.ok){
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    return (
        <div className='container mx-auto search-page py-10'>
        <Helmet>
            <title>DocMeet || Blood Donors</title>
        </Helmet>
        <SectionTitle heading={"Blood Donors"}></SectionTitle>
        <h1 className='bg-slate-300 inline-block px-3 py-1 rounded'>Total Count : {donors.length}</h1>

        <div className="overflow-x-auto">
            <table className="table table-pin-rows table-pin-cols">
                <thead>
                    <tr className='text-md md:text-xl text-center'>
                        <td>#</td>
                        <td>Donor Name</td>
                        <td>Blood Group</td>
                        <td>last donation date</td>
                        <td>Email</td>
                        <td>Cell</td>
                        <td>Address</td>
                        <td colSpan="2">Action</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        donors.map((user, index) =>
                            <tr className="my-3 text-center text-2xl md:text-3xl"
                                key={user._id}
                            >
                                <th className="text-md md:text-lg"> {index + 1} </th>
                                <td className="text-md md:text-lg">{user.name}</td>
                                <td className="text-md md:text-lg">{user.bloodGroup}</td>
                                <td className="text-md md:text-lg">{user.lastDonationDate}</td>
                                <td className="text-md md:text-lg">{user.email}</td>
                                <td className="text-md md:text-lg">{user.phone}</td>
                                <td className="text-md md:text-lg">{user.address}</td>
                                <td className="text-md md:text-lg text-start"> 
                                    <Link><button className="btn btn-ghost btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">Update Info</button></Link>
                                </td>

                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ManageBloodDonors;