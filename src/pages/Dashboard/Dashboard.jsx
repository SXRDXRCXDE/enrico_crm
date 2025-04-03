import React from "react";
import style from "./style.module.css";
import CurrentClients from "../../widgets/CurrentClients/CurrentClients";
import Card from "../../widgets/Card/Card";
import {IoBriefcase, IoPeople} from "react-icons/io5";
import LastDeals from "../../widgets/LastDeals/LastDeals";
import Workers from "../../widgets/Workers/Workers";
import TodoList from "../../widgets/TodoList/TodoList";
import Header from "../../components/Header/Header";

export default function Dashboard() {

    const Cards = [
        {
            title:"Mijozlar",
            count: "78",
            icon: <div style={{transform:`scaleX(-1)`,color:"white"}}><IoPeople /></div>,
            color: "#2DC8A8",
            iconColor:`white`
        },
        {
            title:"Sotib olingan",
            count: "136",
            icon: <IoBriefcase />,
            color: "#FE8084",
            iconColor:`white`
        },
    ]

    return<>
        <div className={'w-full'}>
            <Header title={'ENRICO CERINI'}/>
        </div>
        <div className={style.container}>
            <div className={style.col1}>
                <CurrentClients/>


                {
                    Cards.map((value, index)=> <Card title={value.title} count={value.count} icon={value.icon} color={value.color} iconColor={value.iconColor} />)
                }

            </div>



            <div className={style.col2}>

                <LastDeals/>

            </div>


            <div className={style.col3}>

                <Workers/>

                <div className={'w-full '}>
                    <TodoList/>
                </div>

            </div>
        </div>
    </>

}