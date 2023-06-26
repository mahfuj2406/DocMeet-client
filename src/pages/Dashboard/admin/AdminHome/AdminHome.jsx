
import { Helmet } from 'react-helmet';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { RiLiveFill } from "react-icons/ri";
import { FaBed, FaStethoscope, FaUserAlt, FaUserShield, FaUsers,  } from 'react-icons/fa';

const AdminHome = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        if (!res.ok) {
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    const patients = users.filter(patient => patient.role ==='patient');
    const doctors = users.filter(doctor => doctor.role ==='doctor');
    const admins = users.filter(admin => admin.role ==='admin');
    const liveNow = users.filter(user=>user.role=== 'doctor' && user.liveStatus == 'online');
    
    return (
        <div className='container mx-auto search-page py-10'>
            <Helmet>
                <title>DocMeet || Admin Home</title>
            </Helmet>
            <SectionTitle heading={"Admin home"}></SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                <div className="card bg-blue-200 shadow-xl">
                    <div className="card-body flex items-center">
                        <p className='md:text-6xl text-2xl text-green-600'>{liveNow.length}</p>
                        <div className='text-blue-700 md:text-5xl'>
                        <RiLiveFill></RiLiveFill>
                        </div>
                        <h2 className="card-title font-bold">Onlne</h2>
                    </div>
                </div>
                <div className="card bg-blue-200 shadow-xl">
                    <div className="card-body flex items-center">
                        <p className='md:text-6xl text-2xl text-green-600'>{users.length}</p>
                        <div className='text-blue-700 md:text-5xl'>
                        <FaUsers></FaUsers>
                        </div>
                        <h2 className="card-title font-bold">Totl Users</h2>
                    </div>
                </div>
                <div className="card bg-blue-200 shadow-xl">
                    <div className="card-body flex items-center">
                        <p className='md:text-6xl text-2xl text-green-600'>{patients.length}</p>
                        <div className='text-blue-700 md:text-5xl'>
                        <FaBed></FaBed>
                        </div>
                        <h2 className="card-title font-bold">Totl Patients</h2>
                    </div>
                </div>
                <div className="card bg-blue-200 shadow-xl">
                    <div className="card-body flex items-center">
                        <p className='md:text-6xl text-2xl text-green-600'>{doctors.length}</p>
                        <div className='text-blue-700 md:text-5xl'>
                        <FaStethoscope></FaStethoscope>
                        </div>
                        <h2 className="card-title font-bold">Totl Doctors</h2>
                    </div>
                </div>
                <div className="card bg-blue-200 shadow-xl">
                    <div className="card-body flex items-center">
                        <p className='md:text-6xl text-2xl text-green-600'>{admins.length}</p>
                        <div className='text-blue-700 md:text-5xl'>
                        <FaUserShield></FaUserShield>
                        </div>
                        <h2 className="card-title font-bold">Totl Admins</h2>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;