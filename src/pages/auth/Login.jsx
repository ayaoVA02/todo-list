import React, { useState } from 'react'
import Navbar from '../task/Navbar'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/ui/Input'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})

  const navigate = useNavigate()


  const validateForm = () => {
      const newErrors={};

 
      if(!email.trim()) newErrors.email="Email is required";
      if(!password.trim()) newErrors.password="Password is required";
     
      setError(newErrors);

      return Object.keys(newErrors).length === 0;
  }

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!validateForm()) return;
    setIsLoading(true)
    try {
      const formData = {
        email,
        password
      };
      console.log("formData: ", formData);

      // Send formData to the server ----- 

      setTimeout(() => {
        navigate('/tasks')
      }, 2000)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log('Login error: ', error);
    }

  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <Navbar />

        {/* Login Form  */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md bg-white eoounded-lg shadow-sm p-6">
            <div className="space-y-2 mb-6">
              <div className="flex gap-2 items-center">
                <Link to="/" className='p-2 rounded-lg hover:bg-gray-100 ' >
                  <ArrowLeft className='w-4 h-4' />
                </Link>
                <h1 className="text-2xl font-black text-blue-600">Welcome Back </h1>
              </div>
              <p className=' text-gray-500 text-sm'> Sign in to your account To countinue Your task.</p>
            </div>

            {/* FORM */}

            <form className='space-y-4' onSubmit={handleSubmit} noValidate>
              
              {/* Email */}
              <Input
                label={'Email'}
                id='email'
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                placeholder='Enter Your Email'
                error={error.email}
                required
              />
              {/* Password */}
              <Input
                label='Password'
                id='password'
                type="password"
                error={error.password}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder='Enter Your password'
                required
              />

              <button
                type='submit'
                className='w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer'
              >{isLoading ? 'Submitting...' : 'Sign In'}</button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-sm text-gray-500'>Don't have an account ?</p>
              <Link to="/signup" className='text-sm text-blue-500 hover:underline'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login