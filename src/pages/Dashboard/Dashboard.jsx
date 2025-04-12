import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import CurrentClients from "../../widgets/CurrentClients/CurrentClients";
import Card from "../../widgets/Card/Card";
import {IoBriefcase, IoPeople} from "react-icons/io5";
import LastDeals from "../../widgets/LastDeals/LastDeals";
import Workers from "../../widgets/Workers/Workers";
import TodoList from "../../widgets/TodoList/TodoList";
import Header from "../../components/Header/Header";
import {getCustomers} from "../../api/customers";
import {getOrders} from "../../api/orders";

export default function Dashboard() {

    const [loading,setLoading] = useState(false);
    const [customersData,setCustomersData] = useState([]);
    const [ordersData,setOrdersData] = useState([]);

    const Cards = [
        {
            title:"Mijozlar",
            count: customersData?.length,
            icon: <div style={{transform:`scaleX(-1)`,color:"white"}}><IoPeople /></div>,
            color: "#2DC8A8",
            iconColor:`white`
        },
        {
            title:"Sotib olingan",
            count: ordersData?.length,
            icon: <IoBriefcase />,
            color: "#FE8084",
            iconColor:`white`
        },
    ]

    useEffect(()=> {
        fetchDatas();
    },[])

    const fetchDatas = async () => {
        setLoading(true);
        try {
            const customers = await getCustomers(1,1000);
            const orders = await getOrders(1,1000);
            setCustomersData(customers.data);
            setOrdersData(orders.data);
        } catch (error) {
            console.log("Error fetching data's" + error);
        } finally {
            setLoading(false);
        }
    }


    return<>

            <div className={style.container}>

                <div className={'w-full h-[107px] border-b flex items-center justify-between px-6'}>
                    <span className={'text-4xl'}>Enrico Cerini</span>
                </div>

                <div className={'w-full flex h-full gap-x-3 p-5'}>

                    <div className={style.col1}>
                        <CurrentClients quantity={customersData?.length}/>


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


            </div>
    </>

}