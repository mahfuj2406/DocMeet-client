import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const DoctorAppointment = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [doctor, setDoctor] = useState([]);
    const [formShow, setFormShow] = useState(false);

    

    const handleSearchAppointment = event => {
        event.preventDefault();
        const form = event.target;
        const docId = form.docId.value;

        const url = `http://localhost:5000/doctor/${docId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setDoctor(data);
                setFormShow(true);
            });
    }

    const handleAppointment = event => {
        event.preventDefault();
        const form = event.target;
        const patientName = form.patientName.value;
        const patientEmail = form.patientEmail.value;
        const age = form.age.value;
        const phone = form.phone.value;
        const doctorName = form.doctorName.value;
        const doctorEmail = form.doctorEmail.value;
        const scheduledTime = form.scheduledTime.value;
        const appointmentDate = form.appointmentDate.value;
        const fees = form.fees.value;
        const doctorId = doctor.doctorUniqueId;
        const newAppointment = { patientName, patientEmail, age, phone, doctorName, doctorEmail, scheduledTime, appointmentDate, fees, doctorId };
        console.log(newAppointment);
        fetch('http://localhost:5000/appointment/payment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAppointment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.replace(data.url);
                // if (data.insertedId) {
                //     reset();
                //     Swal.fire({
                //         position: 'top-end',
                //         icon: 'success',
                //         title: 'Your appointment has been booked successfully.',
                //         showConfirmButton: false,
                //         timer: 1600
                //     });
                //     // navigate('/dashboard');
                // }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="w-full">
            <div className="w-4/12 md:w-6/12 mx-auto">
                <form onSubmit={handleSearchAppointment}>

                    <p className="label-text text-center text-info ">Collect the <span className="text-green-500 font-bold">Doctor Code 805719</span> from find doctor section on Home*</p>
                    <div className="card-body w-6/12 mx-auto md:flex-row justify-between items-baseline">

                        <div className="form-control w-full">
                            <input
                                type="number"
                                name="docId"
                                placeholder="Enter Doctor Code"
                                className="input input-bordered "
                            />
                        </div>
                        <div className="form-control md:w-2/6">
                            <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 hover:text-white">Search</button>
                        </div>
                    </div>
                </form>
                {
                    formShow &&
                    <form
                        onSubmit={handleAppointment}
                        className=" border bg-blue-200  p-10 rounded space-y-3 shadow"
                    >
                        <h3 className="text-center text-2xl font-semibold"> Book an Appointment</h3>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input
                                defaultValue={user.displayName}
                                type="text"
                                name="patientName"
                                className="input input-bordered"
                            // {...register("patientName", { required: true })}
                            />
                        </div>

                        <div className="mb-3 form-control">
                            <label className="label">
                                <span className="label-text">Email* </span>
                            </label>
                            <input
                                defaultValue={user.email}
                                disabled
                                name="patientEmail"
                                type="email"
                                className="input input-bordered"
                            // defaultValue={user?.email}
                            // {...register("patientEmail", { required: true })}
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Age*</span>
                                </label>
                                <input
                                    type="text"
                                    name="age"
                                    className="input input-bordered"
                                // {...register("age", { required: true })}
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="+8801xxxxxxxxx"
                                    className="input input-bordered "
                                // {...register("phone", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="divider"><span className="">Doctor's Information</span></div>
                        <div className="flex gap-2">
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Doctor Name</span>
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    defaultValue={doctor.name}
                                    name="doctorName"
                                    className="input input-bordered"
                                // {...register("doctorName", { required: true })}
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    defaultValue={doctor.email}
                                    name="doctorEmail"
                                    className="input input-bordered"
                                // {...register("doctorEmail", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="form-control w-1/3">
                                <label className="label">
                                    <span className="label-text">Pick a date </span>
                                </label>
                                <input
                                    defaultValue={doctor.fees}
                                    type="date"
                                    name="appointmentDate"
                                    className="input input-bordered"
                                // {...register("appointmentDate", { required: true })}
                                />
                            </div>
                            <div className="form-control w-1/3">
                                <label className="label">
                                    <span className="label-text">Time Slot</span>
                                </label>
                                <select
                                    className="input input-bordered"
                                    name="scheduledTime"
                                // {...register("scheduledTime", { required: true })}
                                >
                                    {doctor.schedules.map((s, index) => <option key={index} value={`${s}`}>{s}</option>)}
                                </select>
                            </div>

                            <div className="form-control w-1/3">
                                <label className="label">
                                    <span className="label-text">Appointment Fee </span>
                                </label>
                                <input
                                    disabled
                                    defaultValue={doctor.fees}
                                    type="number"
                                    name="fees"
                                    placeholder="Enter enroll fee"
                                    className="input input-bordered"
                                // {...register("fees", { required: true })}
                                />
                            </div>
                        </div>
                        <input
                            type="submit"
                            className="btn bg-blue-500 hover:bg-blue-700 border text-white w-full font-bold p-2"
                            value="Submit"
                        />
                    </form>
                }
            </div>
        </div>
    );
};

export default DoctorAppointment;