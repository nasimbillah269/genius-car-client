import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const { signIn } = useContext(AuthContext);

    const { googleSignIn } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    let from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;

                const currentUser = {
                    email: user.email
                }
                console.log(currentUser);

                // get jwt token
                fetch('https://genius-car-server-coral.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // local storage is the easiest but not best wea
                        localStorage.setItem('genius-token', data.token)
                        navigate(from, { replace: true });
                    })

                toast.success('Successfully Login!');
            })
            .catch(error => {
                console.error('error', error)
                toast.error(error.message);
            })

    }

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(reslut => {
                const user = reslut.user;
                console.log(user);
                toast.success('Successfully created!');
            })
            .catch(error => {
                console.error('error', error)
                toast.error(error.message);
            })
    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">

                    <img className='w-3/4' src={img} alt="" />

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl text-center font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <p className='text-center font-bold text-orange-600'>OR</p>
                        <div>
                            <button onClick={handleGoogleSignIn} className="btn btn-outline  w-full text-3xl"> <FcGoogle className='mr-4 text-3xl'></FcGoogle>  Google</button>
                        </div>
                    </form>
                    <p className='text-center mb-12'>New Genius car <Link className='text-orange-600' to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;