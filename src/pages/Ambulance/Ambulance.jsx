
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import SectionTitle from '../Shared/SectionTitle/SectionTitle';

const Ambulance = () => {
    const { data: ambulance = [], refetch } = useQuery(['ambulance'], async () => {
        const res = await fetch('http://localhost:5000/admin/ambulance')
        if (!res.ok) {
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();

    })

    const handleDelete = (ambulance) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/admin/ambulance/delete/${ambulance._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `"${ambulance.serialNumber}" of "${ambulance.driverName}" has been deleted.`,
                                'success'
                            )
                        }
                    })
                
            }
        })
    }
    return (
        <div className='w-full mb-20'>
            <Helmet>
                <title>DocMeet || Ambulance</title>
            </Helmet>
            <SectionTitle heading={"Ambulance"}></SectionTitle>

            <div className="overflow-x-auto container mx-auto">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr className='text-md md:text-xl text-center'>
                            <td>#</td>
                            <td>Driver Name</td>
                            <td>Area</td>
                            <td>Ambulance No.</td>
                            <td>Status</td>
                            <td>Cell</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            ambulance.map((car, index) =>
                                <tr className="my-3 text-center text-2xl md:text-3xl"
                                    key={car._id}
                                >
                                    <th className="text-md md:text-lg"> {index + 1} </th>
                                    <td className="text-md md:text-lg">{car.driverName}</td>
                                    <td className="text-md md:text-lg">{car.area}</td>
                                    <td className="text-md md:text-lg">{car.serialNumber}</td>
                                    <td className="text-md md:text-lg">{car.isAvailable}</td>
                                    <td className="text-md md:text-lg">{car.phone}</td>

                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ambulance;