import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; 

// Define the props interface for NameInput component
interface NameInputProps {
  onSubmit: (name: string) => void; // Function to handle name submission
}

// NameInput Component
const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  // State to store the user's name input
  const [name, setName] = useState('');
  // State to store validation error message
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate name length
    if (name.trim().length < 2) {
      setError('Please enter at least 2 characters'); // Set error message if invalid
      return;
    }

    onSubmit(name.trim()); // Call onSubmit prop with trimmed name
  };

  return (
    // Main container with a white background, rounded corners, and shadow
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      
      {/* Title heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>

      {/* Subtitle message */}
      <p className="text-gray-600 mb-6">Enter your name to spin the wheel of fortune</p>
      
      {/* Form for name input */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Input field wrapper */}
        <div>
          {/* Input field for user's name */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value); // Update name state
              setError(''); // Clear error message on change
            }}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          />

          {/* Animated error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }} // Start position: hidden and slightly above
              animate={{ opacity: 1, y: 0 }} // Animate to visible and move down
              className="text-red-500 text-sm mt-2"
            >
              {error}
            </motion.p>
          )}
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 group"
        >
          <span>Continue</span> 
          {/* Right arrow icon with hover animation */}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default NameInput;