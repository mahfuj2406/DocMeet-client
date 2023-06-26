import { useEffect, useState } from "react";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const PopularDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/popular-doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
    }, []);
    console.log("doctors:", doctors);
    const popularDoctors = doctors.sort((a, b) => b.totalPatients - a.totalPatients).slice(0, 6);
    console.log("Popular doctors : ", popularDoctors);

    return (
        <div className="w-full">
            <SectionTitle heading={"Popular Doctor"}></SectionTitle>
            <div className="md:container mx-auto px-10 md:px-5 my-10">
                <div className="md:container mx-auto grid md:grid-cols-3 gap-4 grid-cols-1 px-10 md:px-5">
                    {doctors.map(doctor =>
                        <div className="card border flex-row bg-base-100 shadow-xl"
                            key={doctor._id}>
                            <img src={`${doctor.photoURL}`} className="rounded-lg w-[120px] md:w-[200px]" alt="Shoes" />
                            <div className="card-body">
                                <h2 className="card-title font-bold text-lg md:text-2xl"> {doctor.name} <span className="font-mono text-sm md:text-sm text-slate-500 font-bold"> {doctor.speciality} </span></h2>
                                <p className="font-mono text-sm md:text-2xl">ID:  {doctor.doctorUniqueId} </p>
                                <p>email : {doctor.email} </p>
                                <div className="divider"><p className="flex justify-center">{'( thu - sat )'} </p></div>
                                
                                <div className="flex flex-wrap gap-2">
                                {doctor.schedules.map((s, index)=><p key={index} className="bg-slate-200 border rounded-lg px-5"> {s}</p>)}
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};

export default PopularDoctors;