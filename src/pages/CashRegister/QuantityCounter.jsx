import React, { useState } from "react";

export default function QuantityCounter({ initialCount = 1, min = 1, max = 99, onChange }) {
    const [count, setCount] = useState(initialCount);
    const [intervalId, setIntervalId] = useState(null);

    const updateCount = (amount) => {
        setCount((prevCount) => {
            const newCount = prevCount + amount;
            if (newCount >= min && newCount <= max) {
                onChange && onChange(newCount);
                return newCount;
            }
            return prevCount;
        });
    };

    const handleMouseDown = (amount) => {
        updateCount(amount); // Change once immediately
        const id = setInterval(() => updateCount(amount), 150); // Continue updating
        setIntervalId(id);
    };

    const handleMouseUp = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    return (
        <div className="flex h-[80%] px-1 items-center gap-1 border rounded-lg bg-white shadow">
            <button
                onMouseDown={() => handleMouseDown(-1)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="px-3 py-1 text-lg bg-gray-300 rounded-lg hover:bg-gray-400"
            >
                -
            </button>
            <span className="text-xs w-5 font-bold">{count}</span>
            <button
                onMouseDown={() => handleMouseDown(1)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="px-3 py-1 text-lg bg-gray-300 rounded-lg hover:bg-gray-400"
            >
                +
            </button>
        </div>
    );
}
