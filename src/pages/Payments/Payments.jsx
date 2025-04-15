import React, {useState} from "react";
import style from "./style.module.css";
import {Link} from "react-router-dom";
import {LuMoveLeft} from "react-icons/lu";
import {RiVerifiedBadgeFill} from "react-icons/ri";
import {FaCheck} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {setPaymentActive} from "../../store/reducers/paymentSlice";

export default function Payments() {

    const dispatch = useDispatch();
    const [cardActive,setCardActive] = useState(false);
    const [isConfirm,setConfirm] = useState(false);

    const PaymentTypes = [
        "",
        "",
    ]

    return(
        <>
            <div className={style.container}>

                <div className={'w-full h-full flex justify-center gap-20 py-16'}>

                    {/*There will show payment type */}
                    <div className={isConfirm? style.leftContainer2 : style.leftContainer}>

                        <div className={`  ${isConfirm? `delay-100 duration-300  scale-0 overflow-hidden ` : `delay-300 duration-500  overflow-hidden`} w-full h-full flex flex-col text-start items-start  `}>

                            <Link to={'/cash-register'}>
                            <span className={'flex items-center gap-2 text-xl text-white '}>
                                <LuMoveLeft size={20} />
                                Back
                            </span>
                            </Link>


                            <div className={'w-full flex flex-col items-start text-start mt-4'}>

                                <span className={'text-4xl text-white'}>To'lov turini tanlang</span>

                                <div onClick={()=>setCardActive(false)} className={`w-full h-20 bg-white px-8 flex items-center justify-between text-start mt-4 rounded-xl ${cardActive? '': 'shadow-white/30'} shadow-xl duration-500 `}>
                                    <span className={'text-2xl font-semibold'}>Narx to'lash</span>
                                    <div className={'w-8 h-8 rounded-full border-2 border-[#514EF3] flex items-center justify-center'}>

                                        <div className={`w-5 h-5 rounded-full ${cardActive? 'opacity-0': 'opacity-100'} duration-500 bg-[#514EF3]`}></div>
                                    </div>
                                </div>

                                <div onClick={()=>setCardActive(true)} className={`w-full h-20 bg-white px-8 flex items-center justify-between text-start mt-4 rounded-xl ${cardActive? 'shadow-white/30': ''} shadow-xl duration-500 `}>
                                    <span className={'text-2xl font-semibold'}>Karta orqali to'lash</span>
                                    <div className={'w-8 h-8 rounded-full border-2 border-[#514EF3] flex items-center justify-center'}>
                                        <div className={`w-5 h-5 rounded-full ${cardActive? 'opacity-100': 'opacity-0'} duration-500 bg-[#514EF3]`}></div>
                                    </div>
                                </div>

                            </div>

                            <div className={'w-full h-auto bg-white rounded-xl mt-8 flex flex-col items-start  px-8 pt-4 pb-2'}>

                                <span className={'font-semibold text-lg'}>Siz to'lashinggiz kerak</span>
                                <span className={'font-bold text-5xl mt-8'}>755 000 so'm</span>
                                <span className={'font-bold flex items-center gap-2 text-xl mt-8'}>
                                <RiVerifiedBadgeFill color={'#35AE25'} size={25} />
                                To'lov & Invoice
                            </span>

                                <p className={'w-96 text-lg leading-6 mt-2 font-semibold text-black/60 text-start'}>
                                    Biz sizning barcha to'lovlaringiz haqida qayg'uramiz.
                                    Mijozlaringiz to'lovlarini mamnuniyat bilan amalga
                                    oshirayotganda dam olishingiz mumkin
                                </p>

                            </div>

                            <div onClick={()=>{
                                setConfirm(true);
                            }} className={style.confirmButton}>Tasdiqlash</div>

                        </div>

                        <div className={`  ${isConfirm? `delay-500 duration-500 overflow-hidden` : `delay-100 duration-300  scale-0 overflow-hidden`} absolute top-0 left-0 w-full h-full flex flex-col p-10  items-center text-start items-start  `}>

                            <div className={'w-96 h-96  rounded-full bg-white flex items-center justify-center text-white'}>

                                <FaCheck className={' text-green-500 translate-x-1'}  size={200} />

                            </div>

                            <span className={'text-6xl font-bold mt-16 text-white'}>755 000 so'm</span>


                            <Link to={'/'}>
                                <div onClick={()=>{
                                    dispatch(setPaymentActive(false));
                                    setConfirm(false);
                                }} className={style.backButton}>Asosiy Menyu</div>
                            </Link>


                        </div>


                        {/*<div onClick={()=>{*/}
                        {/*    setConfirm(!isConfirm);*/}
                        {/*}} className={style.confirmButton2}>Tasdiqlash</div>*/}



                    </div>

                    {/*There right bar will show cards data*/}
                    {/*<div className={style.rightContainer}>*/}

                    {/*    <div className={''}></div>*/}

                    {/*</div>*/}

                </div>

            </div>
        </>
    )


}