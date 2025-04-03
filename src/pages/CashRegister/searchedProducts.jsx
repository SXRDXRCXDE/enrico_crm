import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { GrCart } from "react-icons/gr";

export default function SearchedProducts({ id, name, price, quantity }) {
    const [isActive, setActive] = useState(false);

    // Function to limit characters
    const limitCharacters = (text, charLimit = 14) => {
        if (text.length <= charLimit) return text;
        return text.slice(0, charLimit).trim() + "...";
    };

    // Check if the product is already selected in localStorage
    useEffect(() => {
        const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        setActive(selectedProducts.some((product) => product.id === id));

        // Listen for localStorage changes
        const handleStorageChange = () => {
            const updatedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
            setActive(updatedProducts.some((product) => product.id === id));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [id]);

    // Handle adding/removing product from localStorage
    const handleSelectProduct = () => {
        let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];

        if (isActive) {
            selectedProducts = selectedProducts.filter((product) => product.id !== id);
        } else {
            selectedProducts.push({ id, name, price });
        }

        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        setActive(!isActive);
        window.dispatchEvent(new Event("storage")); // Trigger update across components
    };

    return (
        <div onClick={handleSelectProduct} className={style.searchedProductContainer}>
            {isActive && (
                <div className="h-10 w-10 rounded-full bg-white absolute right-1.5 top-1.5 flex items-center justify-center text-[20px]">
                    <GrCart />
                </div>
            )}
            <div className="w-full h-40 overflow-hidden">
                <img
                    alt=""
                    src="https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/724855s.jpg?im=Resize,width=750"
                />
            </div>
            <span className="line-clamp-1 text-start font-semibold text-black/70">{limitCharacters(name)}</span>

            <div className="w-full flex items-end justify-between">
                <span className="text-[13px] font-bold">${(price ?? 0).toLocaleString()}</span>
                <span className="text-[11px] text-black/60 font-bold">{quantity} pcs</span>
            </div>
        </div>
    );
}
