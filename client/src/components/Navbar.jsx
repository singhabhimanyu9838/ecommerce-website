import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Theme } from '../hooks/ThemeContext';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Navbar = () => {
  const { theme, setTheme } = useContext(Theme);

  const cartItem = useSelector((state) => state.cart.items);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('Theme', newTheme);
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user", {
  withCredentials: true
});

      setIsLoggedIn(!!res?.data?.user);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/v1/logout', {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const darkTheme = 'bg-gray-700 text-white duration-500';
  const lightTheme = 'bg-slate-200 text-black duration-500';

  const renderAuthButtons = () =>
    isLoggedIn ? (
      <button
        onClick={handleLogout}
        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    ) : (
      <>
        <Link to="/login" className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
          Login
        </Link>
        <Link to="/signup" className="btn btn-sm bg-green-500 text-white hover:bg-green-600">
          Signup
        </Link>
      </>
    );

  return (
    <nav
      className={`navbar ${
        theme === 'dark' ? lightTheme : darkTheme
      } px-4 py-2 shadow-md relative`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            ShopEase
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
          <Link to="/cart">
            Cart <sup className="text-red-600 font-bold">{cartItem.length}</sup>
          </Link>
          <Link to="/food" className="text-red-600 font-bold">
            Food
          </Link>
          {renderAuthButtons()}
          <input
            onClick={handleThemeChange}
            type="checkbox"
            className="toggle theme-controller border-sky-400 bg-amber-300 checked:bg-blue-300"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`absolute top-full left-0 w-full bg-gray-300 shadow-md transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
    <div className="flex flex-col items-center p-4 space-y-2">
      <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
      <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
      <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>

      <Link
        to="/cart"
        className="hover:text-blue-500"
        onClick={() => setIsMenuOpen(false)}
      >
        Cart <sup className="text-red-600 font-bold">{cartItem.length}</sup>
      </Link>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
