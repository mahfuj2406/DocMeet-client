import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const AvailableNow = () => {

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/popular-doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, []);
    console.log("doctors:", doctors);
    const liveNow = doctors.filter(doctor =>doctor.liveStatus === 'online');

    return (
        <div className="w-full">
            <SectionTitle heading={"Now Available"}></SectionTitle>
            <div className="md:container mx-auto px-10 md:px-5 my-10">
                <div className="md:container mx-auto grid md:grid-cols-3 gap-4 grid-cols-1 px-10 md:px-5">
                    {liveNow.map(doctor =>
                        <div className="card border flex-row bg-base-100 shadow-xl"
                            key={doctor._id}>
                            <span className="absolute top-2 right-2 bg-green-500 px-4 rounded ">Online</span>
                            <img src={`${doctor.photoURL}`} className="rounded-lg w-[120px] md:w-[200px]" alt="Shoes" />
                            <div className="card-body">
                                <h2 className="card-title font-bold text-lg md:text-3xl"> {doctor.name} <span className="font-mono text-sm md:text-lg text-slate-500 font-bold"> {doctor.speciality} </span></h2>
                                <p className="font-mono text-sm md:text-2xl">ID:  {doctor.doctorUniqueId} </p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm bg-blue-400 hover:bg-blue-600 font-serif">Book Appoinment</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};
export default AvailableNow;