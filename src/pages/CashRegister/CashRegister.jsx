import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {Input} from "antd";
import {MdCancel} from "react-icons/md";
import {IoIosBarcode} from "react-icons/io";
import {TbAbc} from "react-icons/tb";
import ProductCard from "./ProductCard";
import SelectedProduct from "./selectedProduct";
import {CiSearch} from "react-icons/ci";
import SearchedProducts from "./searchedProducts";
import {FaPlus} from "react-icons/fa";


export default function CashRegister() {

    const [searchType,setType] = useState(0);

    const [searchValue, setSearchValue] = useState("");
    const [barcodeValue,setBarcodeValue] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [activeTab,setTab] = useState(0);

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

    const Products = [
        {
            id: '1',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '2',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '3',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '4',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '5',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '6',
            name: 'Nike',
            price: '400',
            quantity: 15
        },
        {
            id: '7',
            name: 'Adidas',
            price: '350',
            quantity: 5
        },
        {
            id: '8',
            name: 'W&F',
            price: '270',
            quantity: 19
        },
        {
            id: '9',
            name: 'Acer',
            price: '660',
            quantity: 21
        },
        {
            id: '10',
            name: 'Puma',
            price: '550',
            quantity: 35
        },
        {
            id: '11',
            name: 'Pepsi',
            price: '440',
            quantity: 25
        },
        {
            id: '12',
            name: 'Click',
            price: '890',
            quantity: 4
        },
    ]

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

                                    {/*<img className={style.profilePicture} src={'https://mn2s.com/wp-content/uploads/2024/08/Jason-Statham.jpg'}/>*/}

                                </div>

                            </div>


                        </div>

                        {/*Category*/}
                        {/*There will be categories bar*/}
                        <div className={style.categoriesBarWrapper}>
                            <div className={style.categoriesBar}>
                                {/*{Categories.map((value, index) => (*/}
                                {/*    <div key={index} className={style.categoryButton}>*/}
                                {/*        {value}*/}
                                {/*    </div>*/}
                                {/*))}*/}

                                <div className={style.tabNavbar}>

                                    {Categories.map((value, index)=>  <div
                                        onClick={()=>setTab(index)}
                                        className={ index===activeTab? style.tabLinkActive : style.tabLink}>
                                        {value}
                                    </div>)}

                                </div>
                            </div>
                        </div>

                    </div>


                    <div className={'w-full h-full overflow-hidden'}>
                        <div className={'w-full h-full flex flex-wrap content-start overflow-y-scroll gap-3 p-3  bg-white'}>

                            {Products.map((value, index)=> <ProductCard id={value.id} name={value.name} price={value.price} quantity={value.quantity}/>)}

                        </div>
                    </div>

                </div>


                <div className={style.saleHistory}>
                    <div className={'w-[450px] h-full flex flex-col overflow-hidden'}>

                        {/*Check's data*/}
                        <div className={'w-full h-[104px] border-b bg-[#EEF6FBE5] flex items-center justify-between px-5 py-3'}>
                            {/*<span className={'text-xl font-bold'}># 3</span>*/}
                            {/*<div className={'w-auto h-12 flex items-center justify-around px-3 text-2xl rounded border border-blue-400'}>*/}
                            {/*    <span>❌</span>*/}
                            {/*</div>*/}
                            {/*<div className={'flex flex-col text-end items-end'}>*/}
                            {/*    <span className={'text-lg font-[500] text-black/60'}>{dateTime}</span>*/}
                            {/*    <span className={'text-xs font-[500] text-black/60'}>№ 654664654446</span>*/}
                            {/*</div>*/}
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
                                    <div style={{transform:`translateX(${searchType+`00%`})`}} className={`w-1/2 h-full rounded-full bg-white absolute left-0 duration-500`}></div>
                                    <div onClick={()=>setType(0)} className={searchType===0? style.SbarActive : style.Sbar}><IoIosBarcode /></div>
                                    <div onClick={()=>setType(1)} className={searchType===1? style.SbarActive : style.Sbar}><CiSearch /></div>
                                </div>
                            </div>

                            <div className={style.searchBody}>
                                {Products.map((value, index)=> <SearchedProducts id={value.id} name={value.name} price={value.price} quantity={value.quantity}/>)}

                            </div>

                            <div className={'w-full h-auto mt-3 flex flex-col items-end justify-between '}>
                                <div className={'p-3 rounded-xl flex items-center gap-1 text-center text-xl text-white from bg-[#35AE25] to bg-[#1C8D0D]'}>Mahsulot qo'shish <FaPlus /> </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

    )

}