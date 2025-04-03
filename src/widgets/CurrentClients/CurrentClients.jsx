import React from "react";
import style from "./style.module.css";

export default function CurrentClients() {

    return<>
        <div className={style.container}>

            <div className={style.topBar}>

                <div className={style.title}>Bugungi mijozlar</div>

                <div className={'h-2 w-2 rounded-full bg-white'}></div>

            </div>

            <div className={style.bottomBar}>

                <span className={style.numberOfClients}>12 ta
                    <span className={'text-[18px] absolute m-auto -bottom-3 right-0 '}>Mijozlar</span>
                </span>


            </div>

        </div>
    </>
}