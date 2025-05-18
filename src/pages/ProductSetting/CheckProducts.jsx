import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function CheckProducts({ id, name, price, quantity: initialQuantity }) {
    const [quantity, setQuantity] = useState(initialQuantity || 1);

    const updateQuantityInStorage = (newQuantity) => {
        let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        selectedProducts = selectedProducts.map(product =>
            product.id === id ? { ...product, quantity: newQuantity } : product
        );
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        window.dispatchEvent(new Event("storage")); // trigger sync
    };

    const removeFromStorage = () => {
        let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        selectedProducts = selectedProducts.filter(product => product.id !== id);
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        window.dispatchEvent(new Event("storage")); // trigger sync
    };

    const increase = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        updateQuantityInStorage(newQty);
    };

    const decrease = () => {
        if (quantity > 1) {
            const newQty = quantity - 1;
            setQuantity(newQty);
            updateQuantityInStorage(newQty);
        }
    };


    return (
        <div className={'w-full h-24 flex items-center justify-between border-2 rounded-3xl px-4 bg-[#A4A3F9]/30 select-none'}>
            <div className={'w-auto h-full flex items-center'}>
                <img
                    src={'https://placehold.co/100x100/white/grey'}
                    className={'w-16 h-16 shadow rounded object-contain'}
                />
                <div className="ml-4 flex flex-col items-start text-start max-w-[180px]">
                    <div className="relative w-full overflow-hidden h-[28px]">
                <span
                    className={`text-xl font-semibold inline-block ${
                        name.length > 12 ? 'animate-marquee whitespace-nowrap' : 'truncate'
                    }`}>
                  {name}
                </span>
                    </div>
                    <span className="text-[15px] text-black/60">${price}</span>
                </div>

            </div>

            <div className={'flex items-center gap-2 z-10'}>
                <div className={'w-[100px] h-[45px] rounded-xl flex items-center justify-between overflow-hidden'}>
                    <div onClick={decrease} className={'w-[25px] h-[25px] rounded bg-white flex items-center justify-center mr-2 cursor-pointer'}>
                        <FiMinus size={15} />
                    </div>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => {
                            const newQty = Math.max(1, parseInt(e.target.value) || 1);
                            setQuantity(newQty);
                            updateQuantityInStorage(newQty);
                        }}
                        className="font-semibold text-[20px] w-10 h-full text-center rounded bg-transparent outline-none"
                    />

                    <div onClick={increase} className={'w-[25px] h-[25px] rounded bg-white flex items-center justify-center cursor-pointer'}>
                        <FiPlus size={15} />
                    </div>
                </div>

                {/* ❌ Remove Product Button */}
                <div
                    onClick={removeFromStorage}
                    className={'w-6 h-6 rounded flex items-center text-lg font-semibold justify-center bg-red-500 text-white cursor-pointer'}
                >
                    X
                </div>
            </div>
        </div>
    );
}
