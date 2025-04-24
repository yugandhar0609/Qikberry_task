import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Particles from '../../styles/Particles';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    gsap.fromTo('.card', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.form-element', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
  }, []);

  useEffect(() => {
    const totalFields = 2;
    let filledFields = 0;
    if (username.trim()) filledFields++;
    if (password.trim()) filledFields++;
    setProgress((filledFields / totalFields) * 100);
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    try {
      // Demo login validation - in a real app, you'd call an API here
      if (username === 'admin' && password === 'password') {
        const userData = { 
          name: 'Admin User',
          username: username
        };
        
        // Store token (in a real app, this would come from your API)
        localStorage.setItem('accessToken', 'demo-token-12345');
        
        login(userData);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-between relative">
      <Particles />
      <div className="container mx-auto max-w-md px-4 py-12 flex-grow flex items-center relative z-10">
        <div className="card w-full p-8 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 rounded-2xl shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold animate-[float_3s_ease-in-out_infinite]">
              QB
            </div>
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-2">Qikberry</h2>
          <p className="text-center text-gray-300 mb-6 text-sm">Log in to your account</p>
          <div className="w-full bg-gray-700 bg-opacity-30 rounded-full h-1.5 mb-6">
            <div style={{ width: `${progress}%` }} className="bg-gradient-to-r from-blue-400 to-blue-500 h-1.5 rounded-full transition-all duration-500 ease-out" />
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg text-red-100 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-5 form-element">
              <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border-none bg-white bg-opacity-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 p-3 transition-all duration-300"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6 form-element">
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border-none bg-white bg-opacity-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 p-3 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-300">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">Sign Up</Link>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Login; 