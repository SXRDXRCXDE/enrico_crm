import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {Input} from "antd";
import { Modal, InputNumber } from "antd";
import {MdCancel} from "react-icons/md";
import {IoIosBarcode} from "react-icons/io";
import ProductCard from "./ProductCard";
import {CiSearch} from "react-icons/ci";
import CheckProducts from "../ProductSetting/CheckProducts";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPaymentActive } from "../../store/reducers/paymentSlice";
import {getProducts} from "../../api/products";
import useMessage from "antd/es/message/useMessage"; // adjust path if needed



export default function CashRegister() {

    const [message,context] = useMessage();

    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [fee, setFee] = useState(0);

    const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);

    const [tempDiscount, setTempDiscount] = useState(0);



    const [productsData,setProductsData] = useState([]);
    const [products,setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);



    const [searchType,setType] = useState(0);

    const [searchValue, setSearchValue] = useState("");
    const [barcodeValue,setBarcodeValue] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [activeTab,setTab] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        fetchProducts(1);
    }, []);



    const fetchProducts = async (pageNum = 1) => {
        setIsFetching(true);
        try {
            const res = await getProducts(pageNum, 12); // assuming 10 per page
            const newProducts = res.data?.items || [];

            setProducts((prev) => pageNum === 1 ? newProducts : [...prev, ...newProducts]);
            setHasMore(newProducts.length === 10); // if less than 10, no more data
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };


    useEffect(() => {
        const container = document.getElementById("product-scroll-box");
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            if (!isFetching && hasMore && scrollHeight - scrollTop <= clientHeight + 50) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchProducts(nextPage);
            }
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [isFetching, hasMore, page]);




    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = { weekday: "short", month: "short", day: "2-digit" };
            const formattedDate = now.toLocaleDateString("en-US", options);
            const formattedTime = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            });

            setDateTime(`${formattedDate}, ${formattedTime}`);
        };

        updateDateTime(); // Call immediately
        const interval = setInterval(updateDateTime, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup on unmount

    }, []);

    // const handleClear = () => {
    //     setSearchValue(""); // Clear input
    // };

    const Categories = [
        'All categories',
        'Clothing',
        'Shoes',
        'Shirts',
    ]


    const loadProducts = () => {
        const stored = JSON.parse(localStorage.getItem("selectedProducts") || "[]");
        setProductsData(stored);
    };

    useEffect(() => {
        loadProducts();

        const handleStorageChange = () => {
            loadProducts();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const sum = productsData.reduce((acc, product) => {
            const qty = product.quantity ?? 1;
            return acc + Number(product.price) * qty;
        }, 0);
        setTotalPrice(sum);

        if (sum === 0) {
            setDiscount(0);
        }
    }, [productsData]);




    const showDiscountModal = () => {
        setTempDiscount(discount); // Set initial value
        setDiscountModalOpen(true);
    };

    const handleDiscountCancel = () => {
        setDiscountModalOpen(false);
    };

    const handleDiscountOk = () => {
        if (tempDiscount >= 0) { // You can add further validation if needed
            setDiscount(tempDiscount);
        }
        setDiscountModalOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handleDiscountOk(); // Trigger the same action as pressing OK
            }
        };

        if (isDiscountModalOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDiscountModalOpen, tempDiscount]);


    const finalTotal = totalPrice > 0 ? (totalPrice - discount ) : 0;


    const goToPayments = () => {
        navigate('/payments', { state: { finalTotal: finalTotal } });
    };

    console.log(products)


    return(

            <div className={style.container}>

                <div className={style.productsContainer}>

                    <div className={style.productsHeader}>

                        {/*Search Links*/}
                        {/*There will be search bar */}
                        <div className={style.headerBar}>


                            <div className={style.profileBar}>

                                <div className={style.profileData}>

                                    <span>Kassa</span>


                                </div>

                            </div>


                        </div>

                        {/*Category*/}
                        {/*There will be categories bar*/}
                        <div className={style.categoriesBarWrapper}>
                            <div className={style.categoriesBar}>

                                <div className={style.tabNavbarWrapper}>
                                    <div className={style.tabNavbar}>
                                        {Categories.map((value, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setTab(index)}
                                                className={index === activeTab ? style.tabLinkActive : style.tabLink}
                                            >
                                                {value}
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>

                    </div>


                    <div className={'w-full h-full overflow-hidden'}>
                        <div id="product-scroll-box" className="w-full h-full flex flex-wrap content-start overflow-y-scroll gap-3 p-3 bg-white">


                            {products?.map((value, index) => (
                                <ProductCard key={value.id} id={value.id} name={value.name} price={value.price} quantity={value.quantity} />
                            ))}
                            {isFetching && <div className="text-center w-full py-4">Loading...</div>}


                        </div>
                    </div>

                </div>


                <div className={style.saleHistory}>
                    <div className={'w-[450px] h-full flex flex-col overflow-hidden'}>

                        {/*Check's data*/}
                        <div className={'w-full h-[104px] border-b bg-[#EEF6FBE5] flex items-center justify-between px-5 py-3'}>

                        </div>

                        <div className={'w-full h-full p-2 overflow-hidden relative border-l  '}>

                            {/*Here placed search bar with switch functions*/}
                            <div className={style.searchBar}>
                                <div className={style.inputPlace}>
                                    <div className="w-[300px] h-full flex items-center gap-2 relative">
                                        {searchType === 0 ? (
                                            <div className={'w-full relative'}>
                                                {
                                                    barcodeValue? ``
                                                        :
                                                        <span className={'absolute left-3 top-2 text-xl text-white'}>Barcode...</span>
                                                }
                                                <Input
                                                    className="w-full h-full text-xl !bg-transparent !border-none !shadow-none focus:!border-none focus:!shadow-none text-white"
                                                    value={barcodeValue}
                                                    onChange={(e) => setBarcodeValue(e.target.value)}
                                                    placeholder=""
                                                    allowClear={{ clearIcon: <MdCancel className="text-3xl text-black/50" /> }}
                                                />
                                            </div>
                                        ) : (

                                            <div className={'w-full relative'}>
                                                {
                                                    searchValue? ``
                                                        :
                                                        <span className={'absolute left-3 top-2 text-xl text-white'}>Search...</span>
                                                }
                                                <Input
                                                    className="w-full h-full text-xl !bg-transparent !border-none !shadow-none focus:!border-none focus:!shadow-none text-white"
                                                    value={searchValue}
                                                    onChange={(e) => setSearchValue(e.target.value)}
                                                    placeholder=""
                                                    allowClear={{ clearIcon: <MdCancel className="text-3xl text-black/50" /> }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={style.selectBar}>
                                    <div style={{transform:`translateX(${searchType+`00%`})`}} className={`w-1/2 h-[85%] rounded-[25px] bg-white absolute left-0 duration-500`}></div>
                                    <div onClick={()=>setType(0)} className={searchType===0? style.SbarActive : style.Sbar}><IoIosBarcode /></div>
                                    <div onClick={()=>setType(1)} className={searchType===1? style.SbarActive : style.Sbar}><CiSearch /></div>
                                </div>
                            </div>

                            <div className={'relative'}>
                                <div className={style.searchBody}>
                                    {JSON.parse(localStorage.getItem("selectedProducts") || "[]").map((product) => (
                                        <CheckProducts
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            quantity={product.quantity}
                                        />
                                    ))}

                                </div>

                                {/*This shows selected products check like a total sum and discount, fees and etc */}
                                <div className={'w-[95%] h-52 bg-white absolute bottom-3 left-0 right-0 m-auto shadow-xl border rounded-3xl'}>

                                    <div className={'w-full h-full flex flex-col justify-between text-start items-start px-5 py-4'}>


                                        <div className={'w-full flex flex-col'}>

                                            <div className={'w-full flex items-end gap-2'}>

                                                <span className={'text-xl font-semibold'}>Total</span>
                                                <div className={'w-full border'}></div>
                                                <span className={'whitespace-nowrap font-semibold'}>{totalPrice.toLocaleString()} sum</span>

                                            </div>

                                            <div className={'w-full flex items-end gap-2'}>
                                                <span className={'text-xl font-semibold'}>Discount</span>
                                                <div className={'w-full border'}></div>
                                                <span className={'whitespace-nowrap font-semibold'}>{discount.toLocaleString()} sum</span>
                                            </div>

                                            <div className={'w-full flex items-end gap-2'}>
                                                <span className={'text-xl font-semibold'}>Final</span>
                                                <div className={'w-full border'}></div>
                                                <span className={'whitespace-nowrap font-bold text-lg'}>{finalTotal.toLocaleString()} sum</span>
                                            </div>



                                        </div>


                                        <div className={'w-full flex items-center justify-start gap-4'}>

                                            <div onClick={showDiscountModal} className={'h-10 border-2 border-black text-center font-semibold flex items-center px-3 rounded-xl cursor-pointer'}>
                                                - Discount
                                            </div>

                                            <Modal
                                                title="Enter Discount"
                                                open={isDiscountModalOpen}
                                                onOk={handleDiscountOk}
                                                onCancel={handleDiscountCancel}
                                                okText="Apply"
                                                cancelText="Cancel"
                                            >
                                                <InputNumber
                                                    min={0}
                                                    value={tempDiscount}
                                                    onChange={value => setTempDiscount(value)}
                                                    className="w-full"
                                                    addonAfter="sum"
                                                />
                                            </Modal>


                                        </div>


                                    </div>

                                </div>
                            </div>


                            <div className={'w-full h-auto mt-3 flex flex-col items-end justify-between '}>
                                <div
                                    className={`p-3 rounded-xl flex items-center gap-1 text-center text-xl text-white select-none 
                                        ${finalTotal < 1 ? 'bg-gray-400 cursor-not-allowed' : 'from bg-[#35AE25] to bg-[#1C8D0D] cursor-pointer'}
                                    `}
                                    onClick={() => {
                                        if (finalTotal >= 1) {
                                            dispatch(setPaymentActive(true));
                                            goToPayments();
                                        } else {
                                            goToPayments()
                                            message.info(`Mahsulot tanlang`)
                                        }
                                    }}
                                >
                                    Hozir to'lash
                                </div>


                            </div>

                        </div>

                    </div>
                </div>

            </div>

    )

}