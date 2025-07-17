"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function TraditionalView() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
        >
          <FaArrowLeft />
          <span>Back to Terminal View</span>
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Amit Pandit</h1>
        <h2 className="text-2xl text-gray-600 mb-8">AI Engineer & Full Stack Developer</h2>
        
        <div className="prose max-w-none">
          <p>This is a placeholder for a traditional portfolio view. You can expand this with your regular portfolio content.</p>
          <p>For now, head back to the terminal view to explore my work!</p>
        </div>
      </div>
    </div>
  );
}