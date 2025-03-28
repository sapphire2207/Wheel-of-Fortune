import React, { useState } from 'react'; 
import NameInput from './components/NameInput'; 
import SpinWheel from './components/SpinWheel'; 
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // State to store the user's name
  const [name, setName] = useState<string>(''); 

  return (
    // Main container with a full-screen gradient background and centered content
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      
      {/* AnimatePresence ensures smooth transitions when components appear/disappear */}
      <AnimatePresence mode="wait">
        {/* Conditionally render NameInput or SpinWheel based on whether a name has been entered */}
        {!name ? (
          // Animated wrapper for NameInput
          <motion.div
            key="nameInput" // Unique key for component transition
            initial={{ opacity: 0, y: 20 }} // Starts invisible and slightly lower
            animate={{ opacity: 1, y: 0 }} // Fades in and moves up smoothly
            exit={{ opacity: 0, y: -20 }} // Exits by fading out and moving up
            transition={{ duration: 0.3 }} // Transition duration
          >
            <NameInput onSubmit={setName} /> {/* Calls setName when the user submits their name */}
          </motion.div>
        ) : (
          // Animated wrapper for SpinWheel
          <motion.div
            key="spinWheel" // Unique key for component transition
            initial={{ opacity: 0, scale: 0.8 }} // Starts invisible and slightly smaller
            animate={{ opacity: 1, scale: 1 }} // Fades in and scales to normal size
            transition={{ duration: 0.4 }} // Slightly longer transition
          >
            <SpinWheel name={name} /> {/* Passes the entered name to the SpinWheel component */}
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default App; 