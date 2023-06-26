import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaEye } from "react-icons/fa";

const MyAppointments = () => {
    const {user} = useAuth();

    const { data: appointments = [], refetch } = useQuery(['appointments'], async () => {
        const res = await fetch(`http://localhost:5000/patient/appointments/${user.email}`)
        if(!res.ok){
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    return (
        <div className='container mx-auto search-page py-10'>
        <Helmet>
            <title>DocMeet || My Appointments</title>
        </Helmet>
        <SectionTitle heading={"Appointments"}></SectionTitle>
        <h1 className='bg-slate-300 inline-block px-3 py-1 rounded'>Total appointments : {appointments.length}</h1>

        <div className="overflow-x-auto">
            <table className="table table-pin-rows table-pin-cols">
                <thead>
                    <tr className='text-md md:text-xl text-center'>
                        <td>#</td>
                        <td>Patient Info</td>
                        <td>Doctor Info</td>
                        <td>Date and time</td>
                        <td>action</td>
                    </tr>
                </thead>
                <tbody className=''>
                    {
                        appointments.map((appointment, index) =>
                            <tr className="my-3 text-center text-2xl md:text-3xl"
                                key={user._id}
                            >
                                <th className="text-md md:text-lg"> {index + 1} </th>

                                <td className="text-md md:text-lg">{appointment.patientName} {'('} {appointment.age}  {')'} <br /> {appointment.patientEmail} <br /> {appointment.phone} </td>

                                <td className="text-md md:text-lg">{appointment.doctorName} {'('} {appointment.doctorEmail} {')'} </td>

                                <td className="text-md md:text-lg">{appointment.appointmentDate} {'('} {appointment.scheduledTime} {')'} </td>

                                <td className="text-md md:text-lg">
                                <button className="btn btn-ghost btn-sm bg-yellow-500 hover:bg-yellow-600 text-white"> <FaEye></FaEye> View Advice</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyAppointments;