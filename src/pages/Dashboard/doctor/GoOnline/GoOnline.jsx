import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";

const GoOnline = () => {
    const { user } = useAuth();


    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();


    const onSubmit = (data) => {
        const updateData = {
            liveLink: data.liveLink,
            liveStatus: data.status,
        };
        fetch(`http://localhost:5000/users/doctor/live-status-update/${user.email}`, {
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
                        title: 'Your Live status Updated Successfully!',
                        showConfirmButton: false,
                        timer: 1600
                    });
                }
            })

    };
    return (
        <div className="w-full mt-10">
            <SectionTitle heading={"Live Info Update"}></SectionTitle>
            <div className="card w-6/12 mx-auto  shadow-2xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" border bg-blue-200  p-10 rounded space-y-3 shadow"
                >
                    <h3 className="text-center text-2xl font-semibold"> Update Live Status {'(as Doctor)'}</h3>
                    <div className="form-control w-2/3">
                        <label className="label">
                            <span className="label-text">Google meet link </span>
                        </label>
                        <input
                            type="text"
                            name="liveLink"
                            className="input input-bordered"
                            {...register("liveLink", { required: true })}
                        />
                        {/* TODO: error and required message show incomplete */}
                    </div>
                    <div className="form-control w-1/3">
                        <label className="label">
                            <span className="label-text">Select live status</span>
                        </label>
                        <select
                            type="text"
                            name="status"
                            className="input input-bordered"
                            {...register("status", { required: true })}
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                        {/* TODO: error and required message show incomplete */}
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

export default GoOnline;