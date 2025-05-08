import {useEffect, useRef, useState} from "react";


export default function ProgressBar({ isSuccess }) {
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);

    useEffect(() => {
        if (parentRef.current) {
            setParentWidth(parentRef.current.offsetWidth);
        }

        // Optional: listen for resize events if the width might change
        const handleResize = () => {
            if (parentRef.current) {
                setParentWidth(parentRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            ref={parentRef}
            className="parent w-full h-1 border-blue-700 relative overflow-hidden"
        >
            {/* Optional: use parentWidth to set child width manually */}
            <div
                className={`child h-0.5 left-0 top-0 bottom-0 m-auto bg-blue-700 transition-all duration-500 absolute`}
                style={{ width: isSuccess ? parentWidth : 0 }}
            ></div>
        </div>
    );
}