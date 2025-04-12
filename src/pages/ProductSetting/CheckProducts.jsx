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
        <div className={'w-full h-24 flex items-center justify-between border-2 rounded-3xl px-4 bg-[#A4A3F9] select-none'}>
            <div className={'w-auto h-full flex items-center'}>
                <img
                    src={'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'}
                    className={'w-16 h-16 shadow rounded object-contain'}
                />
                <div className={'ml-4 flex flex-col items-start text-start'}>
                    <span className={'text-2xl font-semibold'}>{name}</span>
                    <span className={'text-[15px] text-black/60'}>${price}</span>
                </div>
            </div>

            <div className={'flex items-center gap-2'}>
                <div className={'w-[136px] h-[45px] rounded-xl flex items-center justify-between overflow-hidden'}>
                    <div onClick={decrease} className={'w-[35px] h-[40px] bg-white flex items-center justify-center cursor-pointer'}>
                        <FiMinus size={25} />
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
                        className="font-semibold text-[20px] w-12 h-full text-center rounded-xl bg-white outline-none"
                    />

                    <div onClick={increase} className={'w-[35px] h-[40px] bg-white flex items-center justify-center cursor-pointer'}>
                        <FiPlus size={25} />
                    </div>
                </div>

                {/* ❌ Remove Product Button */}
                <div
                    onClick={removeFromStorage}
                    className={'w-10 h-10 rounded flex items-center text-xl font-semibold justify-center bg-white cursor-pointer'}
                >
                    X
                </div>
            </div>
        </div>
    );
}
