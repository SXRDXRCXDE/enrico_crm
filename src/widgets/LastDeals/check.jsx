import React, {useEffect, useState} from "react";
import style from "./style.module.css";

export default function Check({name,username,address,total_amount,date}) {

    // {avatar,name,province,address,cash,date}





    return<>
        <div className={style.check}>

            <div className={style.leftBar}>

                <div className={style.avatar}>
                    <img src={'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'} alt={name}/>
                </div>

                <div className={style.info}>

                    <div className={style.name}>{name}</div>
                    <div className={style.address}>
                        <span>{username} </span>
                        <span>{address}</span>
                    </div>

                </div>

            </div>


            <div className={style.info2}>

                <span className={style.cash}>$ {(total_amount ?? 0).toLocaleString()}</span>
                <span className={style.date}>{
                    new Date(date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    }).replace(",", "")
                }</span>

            </div>
        </div>
    </>

}