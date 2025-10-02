import { Check, UserPlus, CheckSquare, Home, LogIn, LogOut } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/login", label: "Sign In", icon: LogIn },
    { href: "/signup", label: "Sign Up", icon: UserPlus },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
  ];

  return (
    <div className="shadow-sm mb-6 rounded-lg border border-gray-200 bg-white">
      <div className="py-3 px-4">
        <nav className="flex items-center justify-between">
          {/* Left nav items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Logout button */}
          {pathname === "/tasks" && (
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-100 transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Navbar