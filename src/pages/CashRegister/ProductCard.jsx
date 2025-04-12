import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { GrCart } from "react-icons/gr";

export default function ProductCard({ id, name, price, quantity }) {
    const [isActive, setActive] = useState(false);

    const limitCharacters = (text, charLimit = 14) => {
        if (text.length <= charLimit) return text;
        return text.slice(0, charLimit).trim() + "...";
    };

// Check if the product is already selected in localStorage
    useEffect(() => {
        const checkSelectedProducts = () => {
            const selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
            setActive(selectedProducts.some((product) => product.id === id));
        };

        checkSelectedProducts();

        // Sync across components when localStorage updates
        window.addEventListener("storage", checkSelectedProducts);

        return () => window.removeEventListener("storage", checkSelectedProducts);
    }, [id]);

// Handle adding/removing product from localStorage
    const handleSelectProduct = () => {
        let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];

        if (isActive) {
            // Remove the product if it's already selected
            selectedProducts = selectedProducts.filter((product) => product.id !== id);
        } else {
            // Add the product to localStorage with quantity
            selectedProducts.push({ id, name, price, quantity: 1 });
        }

        // Update localStorage
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));

        // Sync across all components
        window.dispatchEvent(new Event("storage"));

        // Toggle active state
        setActive(!isActive);
    };



    return (
        <div
            onClick={handleSelectProduct}
            className={"w-52 h-64 rounded-xl flex flex-col bg-white overflow-hidden shadow-xl"}
        >
            <div className={"relative w-full h-[190px] overflow-hidden"}>
                {isActive && (
                    <div
                        className={
                            "h-10 w-10 rounded-full bg-white absolute right-1.5 top-1.5 flex items-center justify-center text-[20px]"
                        }
                    >
                        <GrCart />
                    </div>
                )}

                <img
                    className={"w-full h-auto object-cover"}
                    src={"https://dtcralphlauren.scene7.com/is/image/PoloGSI/s7-5462_alternate10?$plpDeskRF$"}
                />
            </div>

            <div className={"w-full h-[66px] flex flex-col justify-start items-start py-1 px-4"}>
                <span className={"text-xl text-black/70 line-clamp-1 text-start font-[500]"}>{name}</span>
                <span className={"text-black/90 line-clamp-1 text-start font-[800]"}>${price}</span>
            </div>
        </div>
    );
}
