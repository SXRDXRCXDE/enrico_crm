import React from "react";
import style from "./style.module.css";
import {Input} from "antd";
import {HiArrowRight} from "react-icons/hi";
import Statement from "./statement";

export default function TodoList() {

    const Tasks = [
        {
            date: "12 Fev 2025",
            type: "danger",
            name: "MIjozlar bilan uchrashuv"
        },
        {
            date: "12 Fev 2025",
            type: "danger",
            name: "MIjozlar bilan uchrashuv  sadsadsad dsa dsadsa sa sa dsa"
        },
        {
            date: "12 Fev 2025",
            type: "danger",
            name: "MIjozlar bilan uchrashuv"
        },
        {
            date: "12 Fev 2025",
            type: "danger",
            name: "MIjozlar bilan uchrashuv"
        },
    ]


    return<>
        <div className={style.container}>

            <div className={'w-full'}>

                <div className={style.titleWrapper} >

                    <div className={style.title}>Kassa</div>
                    <div className={style.filter}>Barchasi</div>

                </div>

                <div className={style.todoBody}>

                    <div className={style.list}>

                        {Tasks.map((value, index)=> <Statement date={value.date} type={value.type} name={value.name}/>)}


                    </div>

                </div>

            </div>



            <div className={style.enterTasks}>

                <div className={style.inputTask}>
                    <Input className={'h-12 border-none outline-none focus:ring-0'}  placeHolder={"Yangi uchrashuv qo‘shish"}/>
                </div>
                <div className={style.addButton}>
                    <HiArrowRight />
                </div>

            </div>


        </div>
    </>

}