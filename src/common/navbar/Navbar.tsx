'use client';

import { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const cartItems: any[] = useSelector((state: RootState) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem("token");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          {/* Left: Logo */}
          <Link href="/" className="text-2xl font-bold text-yellow-900">Fashion</Link>

          {/* Center: Desktop Menu & Search Bar */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-400"
            />
          </div>

          {/* Right: Cart & Profile Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-900 cursor-pointer" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => isLoggedIn ? setIsDropdownOpen(!isDropdownOpen) : router.push("/login")}>
                <User className="w-6 h-6 text-gray-900 cursor-pointer" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2">
                  <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem("token");
                      router.push("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md py-4">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:text-gray-900">Products</Link>
            <Link href="/about" className="block px-4 py-2 text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:text-gray-900">Contact</Link>
            <input
              type="text"
              placeholder="Search..."
              className="ml-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-400"
            />
          </div>
        )}
      </div>
    </nav>
  );
}
