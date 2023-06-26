import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Shared/SectionTitle/SectionTitle';

const UpdateSchedule = () => {
    const {user} = useAuth();

    const schedules = [ '10:30am-12:30pm', '01:30pm-02:30pm', '03:30pm-05:40pm' ];
      schedules.map(s =>console.log(s));

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();


    const onSubmit = (data) => {
            const updateData = {
                schedules: data.schedules,
                fees: data.fees
            };
                    fetch(`http://localhost:5000/users/doctor/schedules-update/${user.email}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updateData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.modifiedCount) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your schedules has been Updated Successfully!',
                                    showConfirmButton: false,
                                    timer: 1600
                                });
                            }
                        })
        
    };
    return (
        <div className="w-full mt-10">
            <SectionTitle heading={"Schedule & fees Update"}></SectionTitle>
            <div className="card w-6/12 mx-auto  shadow-2xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" border bg-blue-200  p-10 rounded space-y-3 shadow"
                >
                     <div className="form-control">
                        <label className="label">
                            <span className="label-text">Visiting time {'( ex: 10:30am-12:30pm , 01:30pm-02:30pm )'}</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered"
                            name="schedules"
                            {...register("schedules", { required: true })}
                        />
                        {/* TODO: error and required message show incomplete */}
                    </div>
                    <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Visiting Fees {'( in BDT)'}</span>
                            </label>
                            <input
                                type="number"
                                name='fees'
                                placeholder="1500"
                                className="input input-bordered "
                                {...register("fees", { required: true })}
                            />
                    </div>
                    <input
                        type="submit"
                        className="btn bg-blue-500 hover:bg-blue-700 border text-white w-1/5 font-bold p-2"
                        value="Update"
                    />
                </form>
            </div>

        </div>
    );
};

export default UpdateSchedule;