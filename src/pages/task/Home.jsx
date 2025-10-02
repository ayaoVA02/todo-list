import { Link } from "react-router-dom";
import Navbar from "./Navbar";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* Card */}
          <div className="w-full max-w-md shadow-sm rounded-2xl bg-white border border-gray-200">
            {/* Card Header */}
            <div className="text-center space-y-2 p-6 border-b border-blue-600">
              <h1 className="text-3xl font-black text-blue-600">TodoList App</h1>
              <p className="text-gray-500">
                Organize your tasks efficiently with our modern todo application
              </p>
            </div>
            
            {/* Card Content */}
            <div className="space-y-4 p-6">
              <div className="flex flex-col gap-3">
                {/* Sign in button */}
                <Link
                  to="/login"
                  className="w-full px-4 py-2 text-center rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Sign In to Your Account
                </Link>

                {/* Create account button */}
                <Link
                  to="/signup"
                  className="w-full px-4 py-2 text-center rounded-lg border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 transition"
                >
                  Create New Account
                </Link>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-400">Or</span>
                  </div>
                </div>

                {/* Try without account button */}
                <Link
                  to="/tasks"
                  className="w-full px-4 py-2 text-center rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                >
                  Try Without Account
                </Link>
              </div>
            </div>
          </div>
          {/* End Card */}
        </div>
      </div>
    </div>
  );
}
