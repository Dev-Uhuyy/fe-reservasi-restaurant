"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 py-0 bg-[#F8F6EB] text-[#1D3B2A]">
      <div className="flex items-center space-x-2 font-serif text-5xl font-bold">
        <Image
          src="/images/logo_bento.png"
          alt="Bento Resto Logo"
          width={120}
          height={60}
          className="object-contain"
        />
      </div>

      <ul className="hidden md:flex space-x-15 font-medium text-xl">
        <li><a href="#about" className="hover:text-[#E0A800]">ABOUT</a></li>
        <li><a href="#menu" className="hover:text-[#E0A800]">MENU</a></li>
        <li><a href="#venue" className="hover:text-[#E0A800]">VENUE</a></li>
        <li><a href="#location" className="hover:text-[#E0A800]">LOCATION</a></li>
        <li><a href="#contact" className="hover:text-[#E0A800]">CONTACT</a></li>
      </ul>

      <div className="relative">
        <Button
          className="bg-[#1D3B2A] hover:bg-[#305E43] text-white rounded-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Login
        </Button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden z-50">
            <a href="/auth/login" className="block px-4 py-2 hover:bg-gray-100">Reserve Now</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">History</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
            <hr />
            <a href="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
}
