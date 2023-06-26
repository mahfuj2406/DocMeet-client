
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

const Register = () => {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    // useTitle('Register');
    const { createUser, updateUserProfileName } = useAuth();

    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {

                const user = result.user;
                console.log('created user', user);

                updateUserProfileName(data.name)
                    .then(() => {
                        const newUser = { name: data.name, email: data.email, role: "patient" }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(newUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data);
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1600
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>DocMeet || Register</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-blue-500">Register to DocMeet!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="enter your name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="enter your email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                })} name='password' placeholder="password" className="input input-bordered" />
                                {/* {errors.password?.type === 'required' && <p className="text-red-600">required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password is less than 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase and one special character</p>} */}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" {...register("cPassword", {
                                    required: true, validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Your passwords do no match";
                                        }
                                    }
                                })} name='cPassword' placeholder="confirm password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6 ">
                                <button type='submit' className="btn bg-blue-300 border-0 hover:border hover:bg-blue-600 hover:text-white">Register</button>
                            </div>
                            <p className='text-red-400'> </p>
                            <p className='font-bold mt-3 p-3'>Already member? <Link to={'/login'}><span className='text-violet-400 ms-1 underline'>Login now</span></Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;