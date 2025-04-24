import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/Qikberry logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="Qikberry Logo" 
                className="h-10"
              />
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/posts" 
                className={`text-sm font-medium ${location.pathname === '/posts' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              >
                Posts
              </Link>
              <Link 
                to="/photos" 
                className={`text-sm font-medium ${location.pathname === '/photos' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              >
                Photos
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Logged in as <span className="font-semibold">{user?.username || 'user'}</span>
                  </div>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-2 p-2 rounded-md text-gray-600 hover:text-blue-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <nav className="mt-4 md:hidden bg-white pb-2">
            <div className="flex flex-col space-y-3 pb-3">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/posts" 
                className={`text-sm font-medium ${location.pathname === '/posts' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Posts
              </Link>
              <Link 
                to="/photos" 
                className={`text-sm font-medium ${location.pathname === '/photos' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Photos
              </Link>
              <hr className="my-1" />
              <button
                onClick={handleLogout}
                className="text-left text-sm text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar; 