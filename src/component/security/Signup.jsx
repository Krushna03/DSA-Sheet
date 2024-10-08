import React, {useState} from 'react'
import authService from '../../Appwrite/Authenticatioon.js'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../../store/authSlice.js'
import {Button, Input} from '../index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import LoaderBtn from '../Loading/LoaderBtn.jsx'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


const create = async(data) => {
    setLoading(true)
    setError("")
    try {
        const userData = await authService.createAccount(data)
        if (userData) {
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(login(userData));
            navigate("/")
        }
    } catch (error) {
        setError(error.message)
    }
    finally{
        setLoading(false)
    }
}

  return (
    <div className="mt-10 mb-10 flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-2xl p-10 border border-black/15 shadow-lg`}>
        
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-2 mb-2 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />

                        <div className="relative">
                        <Input
                        label="Password: "
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})}
                        />
                        <button
                        type="button"
                        className="absolute inset-x-55 inset-y-14 right-0 flex items-center px-3 focus:outline-none"
                        onClick={togglePasswordVisibility}
                        >
                         {showPassword ? <HiEyeOff className="text-gray-400" /> : <HiEye className="text-gray-400" />}    
                        </button>
                        </div>

                        <Button type="submit" className="w-full">
                          {loading ? <LoaderBtn /> : 'Create Account'} 
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup