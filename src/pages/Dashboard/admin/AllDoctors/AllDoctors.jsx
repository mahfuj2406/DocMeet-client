import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const AllDoctors = () => {
    
    const { data: doctors = [], refetch } = useQuery(['doctors'], async () => {
        const res = await fetch('http://localhost:5000/admin/doctors')
        if(!res.ok){
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    
    console.log("users", doctors);
    return (
        <div className='container mx-auto search-page py-10'>
        <Helmet>
            <title>DocMeet || Manage Users</title>
        </Helmet>
        <SectionTitle heading={"All Doctors"}></SectionTitle>
        <h1 className='bg-slate-300 inline-block px-3 py-1 rounded'>Total Doctor : {doctors.length}</h1>

        <div className="">
            <table className="table table-pin-rows table-pin-cols">
                <thead>
                    <tr className='text-md md:text-xl text-center'>
                        <td>#</td>
                        <td>Unique ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Division</td>
                        <td>Specialty</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        doctors.map((user, index) =>
                            <tr className="my-3 text-center text-2xl md:text-3xl"
                                key={user._id}
                            >
                                <th className="text-md md:text-lg"> {index + 1} </th>
                                <td className="text-md md:text-lg">{user.doctorUniqueId}</td>
                                <td className="text-md md:text-lg">{user.name}</td>
                                <td className="text-md md:text-lg">{user.email}</td>
                                <td className="text-md md:text-lg">{user.area}</td>
                                <td className="text-md md:text-lg">{user.speciality}</td>
                                <td className="text-md md:text-lg text-center"> 
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

export default AllDoctors;