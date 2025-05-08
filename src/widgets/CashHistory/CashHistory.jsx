import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {Input} from "antd";
import {HiArrowRight} from "react-icons/hi";
import Statement from "./statement";
import {Link} from "react-router-dom";

export default function CashHistory() {

    const [buyedHistory, setBuyedHistory] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("buyedProducts") || "[]");
        setBuyedHistory(stored);
    }, []);



    return<>
        <div className={style.container}>

            <div className={'w-full'}>

                <div className={style.titleWrapper} >

                    <div className={style.title}>Kassa</div>
                    <Link to={'/cash-register'}>
                        <div className={style.filter}>Barchasi</div>
                    </Link>


                </div>

                <div className={style.todoBody}>

                    <div className={style.list}>

                        {buyedHistory.map((value, index)=> <Statement date={value.id} type={value.price} name={value.name}/>)}


                    </div>

                </div>

            </div>



            <Link to={'/cash-register'}>
                <div className={style.enterTasks}>

                    Yangi Mahsulot qo'shish +

                </div>
            </Link>



        </div>
    </>

}