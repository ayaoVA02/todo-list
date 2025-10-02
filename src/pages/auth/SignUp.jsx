import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Input from "../../components/ui/Input";
import Navbar from "../task/Navbar";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // error State 
  const [error, setError] = useState({})



  const validateForm = () => {
      const newErrors={};

      if(!name.trim()) newErrors.name="Name is required";
      if(!email.trim()) newErrors.email="Email is required";
      if(!password.trim()) newErrors.password="Password is required";
      if(!confirmPassword.trim()) newErrors.confirmPassword="Confirm Password is required";

      if(password  !== confirmPassword) newErrors.confirmPassword="Passwords do not match";


      setError(newErrors);

      // testing
      console.log("newErrors", newErrors);

      return Object.keys(newErrors).length === 0;
  }


  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = {
      name,
      email,
      password,
    }
    console.log("formData", formData);
    setIsLoading(true);

    // Simulate signup process
    // setTimeout(() => {
    // }, 1000);
    navigate("/tasks");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <Link
                  to="/"
                  className="p-2 rounded-md hover:bg-gray-100 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <h2 className="text-2xl font-black text-blue-600">
                  Create Account
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
                Sign up to start organizing your tasks efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}

              <Input
                id={'name'}
                label={'Enter your full name'}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error ={error.name}
                required
              />

              {/* Email */}
              <Input
                id={'email'}
                label={'Enter your email'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
                required
              />

              {/* Password */}

              <Input
                id={'password'}
                label={'Create a password'}
                type="password"
                value={password}
                error={error.password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Confirm Password */}


              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id={'confirmPassword'}
                error={error.confirmPassword}
                label={'Confirm your password'}
                required
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
