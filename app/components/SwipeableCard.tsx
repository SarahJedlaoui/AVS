// SwipeableCard.tsx
"use client";
import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

const cardVariants = {
  initial: { x: 0, opacity: 1 },
  swipeLeft: { x: -300, opacity: 0 },
  swipeRight: { x: 300, opacity: 0 },
};

interface SwipeableCardProps {
  onSelectOptions: (options: string[]) => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ onSelectOptions }) => {
  const controls = useAnimation();
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState({ left: false, right: false });
  
  const options = [
    { title: "Diagnosis Information", description: "Overview of your recent health assessments and findings.", icon: "ℹ️" },
    { title: "Appointments", description: "Details of upcoming and past scheduled medical visits.", icon: "📅" },
    { title: "Medication Updates", description: "Information on any recent changes to your prescriptions.", icon: "💊" },
    { title: "Symptoms to Watch", description: "Key symptoms to be mindful of as part of your care plan.", icon: "⚠️" },
    { title: "Next Steps", description: "Recommended actions to continue your treatment and recovery.", icon: "🔄" },
  ];

  const swipeCard = async (direction: "left" | "right") => {
    // Update the button state for color change
    setButtonState({ left: direction === "left", right: direction === "right" });

    if (direction === "right") {
      setSelectedOptions((prev) => [...prev, options[currentCard].title]);
    }
    await controls.start(direction === "left" ? "swipeLeft" : "swipeRight");
    
    // Only advance to the next card if not on the last one
    if (currentCard < options.length - 1) {
      setCurrentCard((prev) => prev + 1);
    }
    controls.start("initial");

    // Reset button state after swipe
    setButtonState({ left: false, right: false });
  };

  // Send selected options back to the parent component whenever it changes
  useEffect(() => {
    onSelectOptions(selectedOptions);
  }, [selectedOptions, onSelectOptions]);

  return (
    <motion.div className="flex flex-col items-center mt-10">
      {/* Progress Bar */}
      <div className="w-[90%] max-w-md mb-4">
        <div className="text-sm font-semibold text-gray-700">Building Your Report</div>
        <div className="text-sm text-gray-500">
          {`${currentCard + 1} of ${options.length} sections included`}
        </div>
        <div className="bg-gray-200 h-2 rounded-full mt-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${((currentCard + 1) / options.length) * 100}%` }}></div>
        </div>
      </div>

      {/* Card */}
      <motion.div
        className="bg-white rounded-[30px] shadow-xl p-8 w-[90%] max-w-md text-center relative"
        initial="initial"
        animate={controls}
        variants={cardVariants}
        style={{ borderRadius: "30px", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-4xl">{options[currentCard].icon}</span>
          <h2 className="text-xl font-semibold mb-2">{options[currentCard].title}</h2>
          <p className="text-gray-600">{options[currentCard].description}</p>
        </div>

        {/* Accept/Reject Buttons */}
        <div className="flex gap-8 mt-6 justify-center">
          <button
            onClick={() => swipeCard("left")}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${buttonState.left ? "bg-red-500 text-white" : "bg-red-100 text-red-500"}`}
          >
            ❌
          </button>
          <button
            onClick={() => swipeCard("right")}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${buttonState.right ? "bg-green-500 text-white" : "bg-green-100 text-green-500"}`}
          >
            ✔️
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SwipeableCard;
