import React from "react";
import style from "./style.module.css";

export default function Statement({date,type,name}) {


    return<>
        <div className={style.statement}>

            <div>
                <div className={style.date}>
                    {date}
                </div>
            </div>

            <div>
                <div className={style.type}>
                    {type}
                </div>
            </div>

            <div>
                <div className={style.name}>
                    {name}
                </div>
            </div>

        </div>
    </>
}