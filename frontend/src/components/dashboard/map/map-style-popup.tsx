
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

// Define types for the props
interface Style {
  name: string;
  url: string;
  thumbnail: string; // Path to image (string)// Path to image (string)
}

interface MapStylesProps {
  variablelStyles: Style[]; // Array of style objects
  selectedStyle: string; // The name of the selected style
  handleStyleChange: (style: Style) => void; // Function to handle style change
}

const MapStyles: React.FC<MapStylesProps> = ({
  variablelStyles,
  selectedStyle,
  handleStyleChange,
}) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 right-16 w-auto z-10 shadow-lg rounded-lg p-2">
      <div className="flex overflow-x-auto space-x-2 p-2 scrollbar-hide rounded-xl bg-white shadow-lg">
        {variablelStyles.map((style) => (
          <div 
            key={style.name} 
            className="relative flex-shrink-0 rounded-xl bg-white transition-all duration-200 ease-in-out hover:shadow-lg right-0"
            onMouseEnter={() => setHoveredStyle(style.name)}
            onMouseLeave={() => setHoveredStyle(null)}
          >
            <img
              src={style.thumbnail} // Path to image
              alt={style.name}
              title={style.name}
              onClick={() => handleStyleChange(style)}
              className={`w-12 h-12 cursor-pointer rounded-md transition-all ${
                selectedStyle === style.name
                  ? "border-2 border-green-500 rounded-xl"
                  : "border-2 border-gray-300 rounded-xl"
              } hover:border-blue-400 hover:rounded-xl`}
            />

            {hoveredStyle === style.name && (
              <motion.div
                className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {style.name}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapStyles;
