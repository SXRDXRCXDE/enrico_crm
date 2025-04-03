import React from "react";
import style from "./style.module.css";
import {Link} from "react-router-dom";

export default function Card({title,count,icon,color,iconColor}) {

    return<>

        <Link to={'/customers'}>
            <div className={style.container}>

                <div className={style.leftBar}>

                    <span className={'text-[18px] text-[#7E92A2]'}>{title}</span>
                    <span className={'text-[48px] font-[600] text-[#092C4C]'}>{count}</span>

                </div>

                <div style={{backgroundColor: `${color}`,color:`${iconColor}`}} className={style.iconHandler}>
                    {icon}
                </div>

            </div>
        </Link>
    </>

}