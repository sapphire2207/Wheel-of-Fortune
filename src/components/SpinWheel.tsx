import React, { useState, useCallback } from 'react';
import { Wheel } from 'react-custom-roulette';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

// Define the props interface to accept the user's name as input
interface SpinWheelProps {
  name: string;
}

// Define the wheel segments with distinct background colors
const data = [
  { option: '1', style: { backgroundColor: '#FF6B6B' } },
  { option: '2', style: { backgroundColor: '#4ECDC4' } },
  { option: '3', style: { backgroundColor: '#45B7D1' } },
  { option: '4', style: { backgroundColor: '#96CEB4' } },
  { option: '5', style: { backgroundColor: '#FFEEAD' } },
  { option: '6', style: { backgroundColor: '#D4A5A5' } },
  { option: '7', style: { backgroundColor: '#9B786F' } },
  { option: '8', style: { backgroundColor: '#A8E6CF' } },
];

const SpinWheel: React.FC<SpinWheelProps> = ({ name }) => {
  // State to determine if the wheel should spin
  const [mustSpin, setMustSpin] = useState(false);
  // State to store the index of the winning segment
  const [prizeNumber, setPrizeNumber] = useState(0);
  // State to check if the user has spun the wheel at least once
  const [hasSpun, setHasSpun] = useState(false);

  // Function to calculate where the wheel should stop based on the name length
  const calculateStopPosition = useCallback(() => {
    // If the name length is even, choose from even index positions, otherwise odd
    const nameLength = name.length;
    const possibleStops = nameLength % 2 === 0 ? [1, 3, 5, 7] : [0, 2, 4, 6];
    return possibleStops[Math.floor(Math.random() * possibleStops.length)];
  }, [name]);

  // Handles spin button click
  const handleSpinClick = () => {
    if (!mustSpin) {
      // Calculate a new stop position based on the name length
      const newPrizeNumber = calculateStopPosition();
      setPrizeNumber(newPrizeNumber);
      // Start spinning the wheel
      setMustSpin(true);
    }
  };

  // Callback function when the wheel stops spinning
  const handleStopSpinning = () => {
    setMustSpin(false); // Stop the spinning
    setHasSpun(true);   // Mark that the wheel has spun
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
      {/* Greeting message with the user's name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Hello, {name}! Ready to spin?
      </h2>

      <div className="relative">
        {/* Wheel Component */}
        <Wheel
          mustStartSpinning={mustSpin} // Determines whether the wheel spins
          prizeNumber={prizeNumber} // Determines which segment the wheel will land on
          data={data} // Data defining the segments
          onStopSpinning={handleStopSpinning} // Callback when the wheel stops spinning
          backgroundColors={['#FF6B6B', '#4ECDC4']} // Colors of the wheel background
          textColors={['#ffffff']} // Color of the text on the wheel
          outerBorderColor="#2c3e50" // Border color of the wheel
          outerBorderWidth={3} // Border thickness
          innerRadius={20} // Size of the center cutout
          radiusLineColor="#2c3e50" // Color of radius separator lines
          radiusLineWidth={2} // Thickness of radius separator lines
          fontSize={25} // Font size for numbers
          spinDuration={0.8} // Duration of the spin animation
        />

        {/* Spin button */}
        <motion.button
          onClick={handleSpinClick} // Trigger spin function when clicked
          disabled={mustSpin} // Disable button while the wheel is spinning
          className={`mt-6 px-8 py-3 rounded-full font-semibold text-white 
            ${mustSpin 
              ? 'bg-gray-400 cursor-not-allowed' // Gray out the button when spinning
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90'
            } transition-all flex items-center justify-center space-x-2 mx-auto`}
          whileHover={{ scale: 1.05 }} // Slightly scale up on hover
          whileTap={{ scale: 0.95 }} // Slightly scale down on tap
        >
          {/* Spinning icon with animation when active */}
          <RotateCw className={`w-5 h-5 ${mustSpin ? 'animate-spin' : ''}`} />
          <span>{mustSpin ? 'Spinning...' : 'SPIN'}</span>
        </motion.button>
      </div>

      {/* Display results after spinning */}
      {hasSpun && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Initial animation: fade in from below
          animate={{ opacity: 1, y: 0 }} // Final animation: appear in place
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          {/* Display the number the wheel landed on */}
          <p className="text-xl font-medium text-gray-700">
            You landed on number {data[prizeNumber].option}!
          </p>
          {/* Show whether the name length is even or odd */}
          <p className="text-gray-500 mt-2">
            {name.length % 2 === 0 ? 'Even' : 'Odd'} name length = {name.length % 2 === 0 ? 'Even' : 'Odd'} number
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SpinWheel;
