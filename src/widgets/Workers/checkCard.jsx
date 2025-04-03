import React from "react";
import style from "./style.module.css";
import {CiEdit} from "react-icons/ci";

export default function CheckCard({avatar,name,date}) {

    return<>
        <div className={style.check}>

            <div className={style.leftBar}>

                <div className={style.avatar}>
                    <img src={'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'} alt={name}/>
                </div>

                <div className={style.info}>

                    <div className={style.name}>{name}</div>
                    <div className={style.address}>
                        <span>
                            {new Date(date).toLocaleString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false
                            }).replace(",", "")}
                        </span>
                    </div>

                </div>

            </div>


            <div className={style.info2}>

                <CiEdit />

            </div>
        </div>
    </>

}