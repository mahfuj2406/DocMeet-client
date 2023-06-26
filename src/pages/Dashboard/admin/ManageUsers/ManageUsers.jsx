import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';
import useAuth from '../../../../hooks/useAuth';

const ManageUsers = () => {
    const {deleteAnUser} = useAuth();

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch('http://localhost:5000/users')
        if(!res.ok){
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    
    console.log("users", users);


    const roleChange = (user, role) => {
        console.log(user._id);
        fetch(`http://localhost:5000/users/admin/${user.email}`, {
            method: 'PATCH',
            body: JSON.stringify({ role }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is now ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div className='container mx-auto search-page py-10'>
            <Helmet>
                <title>DocMeet || Manage Users</title>
            </Helmet>
            <SectionTitle heading={"All Users"}></SectionTitle>
            <h1>Total users : {users.length}</h1>

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
                            users.map((user, index) =>
                                <tr className="my-3 text-center text-2xl md:text-3xl"
                                    key={user._id}
                                >
                                    <th className="text-md md:text-lg"> {index + 1} </th>
                                    <td className="text-md md:text-lg">{user.name}</td>
                                    <td className="text-md md:text-lg">{user.email}</td>
                                    <td className="text-md md:text-lg">{user.role}</td>
                                    <td className="text-md md:text-lg text-start"> {
                                        user.role === 'doctor' || user.role === 'admin' ?
                                            <button className="btn btn-ghost  btn-sm bg-blue-600 text-white" disabled>Make Doctor</button>
                                            :
                                            <button onClick={() => roleChange(user, "doctor")} className="btn btn-ghost  btn-sm bg-blue-500  hover:bg-blue-600 text-white">Make Doctor</button>
                                    } </td>

                                    <td className="text-md md:text-lg text-start"> {
                                        user.role === 'admin' ?
                                            <button className="btn btn-ghost btn-sm bg-yellow-600 text-white" disabled>Make Admin</button>
                                            :
                                            <button onClick={() => roleChange(user, "admin")} className="btn btn-ghost btn-sm bg-yellow-500 hover:bg-yellow-600 text-white">Make Admin</button>
                                    } </td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;