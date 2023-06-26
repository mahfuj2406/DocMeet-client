import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState("");
    const { logIn, googleLogIn } = useAuth();
    // redirecting work 
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    console.log("location :", location);

    const onSubmit = data => {

        logIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                reset();
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }

    const handlePasswordVisibility = () => { setPasswordVisible(!passwordVisible); };
    // google log in managed here
    const handleGoogleLogIn = () => {
        googleLogIn()
            .then((res) => {
                const user = res.user;
                console.log(user);
                const newUser = { name: user.displayName ? user.displayName : "", email: user.email, photoUrl: user.photoURL, role: "patient" }
                console.log("new User :", newUser);
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                console.log("from : ", from);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>DocMeet || Login</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={passwordVisible ? 'text' : 'password'} {...register("password", { required: true })} name='password' placeholder="password" className="input input-bordered" required />
                                <span className="cursor-pointer text-blue-300" onClick={handlePasswordVisibility}> {passwordVisible ? 'Hide' : 'Show'} </span>
                            </div>
                            <div className="form-control mt-6 ">
                                <button type="submit" className="btn bg-blue-300 border-0 hover:border hover:bg-blue-600 hover:text-white">Login</button>
                            </div></form>
                        <p className='text-red-400 p-2'> {error}</p>
                        <p className='text-center m-2'>or</p>
                        <div className="form-control ">

                            <button className="btn bg-white outline-slate-900 text-slate-900 hover:bg-blue-600 hover:text-white" onClick={handleGoogleLogIn}> <img src="https://i.ibb.co/FK4xtWJ/google-icon.png" className='h-full p-2' /> Login with Google</button>
                        </div>
                        <p className='font-bold mt-3 p-3'>Don't have an acccount? <Link to={'/register'}><span className='text-violet-400 ms-1 underline'>Register now</span></Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;