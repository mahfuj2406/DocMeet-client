import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";


const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const DoctorProfileUpdate = () => {
    const { updateUserProfilePhoto } = useAuth();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();

    const image_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("image", data.photoURL[0]);
        fetch(image_hoisting_url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imageData) => {
                if (imageData.success) {
                    console.log("hosting image url : ", imageData.data.display_url);
                    const updateData = {
                        photoURL: imageData.data.display_url,
                        area: data.area,
                        age: data.age,
                        phone: data.phone,
                        birthDate: data.birthDate,
                        weight: data.weight,
                        bloodGroup: data.bloodGroup,
                        nid: data.nid,
                        bio: data.bio,
                        degree: data.degree,
                        speciality: data.speciality,
                    };
                    updateUserProfilePhoto(imageData.data.display_url)
                        .then(() => {
                            fetch(`http://localhost:5000/users/doctor/profile-update/${user.email}`, {
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
                                            title: 'Profile Updated Successfully!',
                                            showConfirmButton: false,
                                            timer: 1600
                                        });
                                    }
                                })
                        })
                        .catch(error => console.log(error))
                }
            })
    };
    const { user } = useAuth();
    return (
        <div className="w-full mt-10">
            <div className="card w-8/12 mx-auto  shadow-2xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className=" border bg-blue-200  p-10 rounded space-y-3 shadow"
                >
                    <h3 className="text-center text-2xl font-semibold"> Update Your Profile {'(as Doctor)'}</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input
                            defaultValue={user.displayName}
                            type="text"
                            disabled
                            className="input input-bordered"
                        />
                        {/* TODO: error and required message show incomplete */}
                    </div>
                    <div className="form-control w-full pb-3">
                        <label className="label">
                            <span className="label-text">Choose Profile Photo*</span>
                        </label>
                        <input
                            type="file"
                            className="file-input w-full "
                            {...register("photoURL", { required: true })}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="mb-3 form-control w-3/4">
                            <label className="label">
                                <span className="label-text">Email* </span>
                            </label>
                            <input
                                defaultValue={user.email}
                                type="email"
                                disabled
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Your Division</span>
                            </label>
                            <select
                                type="text"
                                name="area"
                                className="input input-bordered"
                                {...register("area", { required: true })}
                            >
                                <option value="dhaka">Dhaka</option>
                                <option value="barisal">Barisal</option>
                                <option value="khulna">Khulna</option>
                                <option value="sylhet">Sylhet</option>
                                <option value="rajshahi">Rahshahi</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Age*</span>
                            </label>
                            <input
                                type="text"
                                name='age'
                                className="input input-bordered"
                                {...register("age", { required: true })}
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="number"
                                name='phone'
                                placeholder="+8801xxxxxxxxx"
                                className="input input-bordered "
                                {...register("phone", { required: true })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Date of Birth*</span>
                            </label>
                            <input
                                type="date"
                                name='birthDate'
                                className="input input-bordered"
                                {...register("birthDate", { required: true })}
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Weight in kg</span>
                            </label>
                            <input
                                type="text"
                                name='weight'
                                className="input input-bordered "
                                {...register("weight", { required: true })}
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Blood Group</span>
                            </label>
                            <input
                                type="text"
                                name='bloodGroup'
                                placeholder="ex: B+"
                                className="input input-bordered "
                                {...register("bloodGroup", { required: true })}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Your Degree</span>
                            </label>
                            <input
                                type="text"
                                name="degree"
                                className="input input-bordered"
                                {...register("degree", { required: true })}
                            />
                        </div>
                        <div className="form-control w-1/3">
                            <label className="label">
                                <span className="label-text">Your fields</span>
                            </label>
                            <select
                                type="text"
                                name="speciality"
                                className="input input-bordered"
                                {...register("speciality", { required: true })}
                            >
                                <option value="cardiologist">Cardiologist</option>
                                <option value="dermatologist">Dermatologist</option>
                                <option value="neurologist">Neurologist</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">NID number</span>
                            </label>
                            <input
                                type="number"
                                name="nid"
                                className="input input-bordered"
                                {...register("nid", { required: true })}
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Bio</span>
                            </label>
                            <textarea className='input input-bordered'
                                name="bio"
                                cols="30"
                                rows="10"
                                {...register("bio", { required: true })}
                            ></textarea>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="btn bg-blue-500 hover:bg-blue-700 border text-white w-full font-bold p-2"
                        value="Update"
                    />
                </form>
            </div>

        </div>
    );
};

export default DoctorProfileUpdate;