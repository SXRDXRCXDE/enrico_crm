import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import CurrentClients from "../../widgets/CurrentClients/CurrentClients";
import Card from "../../widgets/Card/Card";
import {IoBriefcase, IoPeople} from "react-icons/io5";
import LastDeals from "../../widgets/LastDeals/LastDeals";
import Workers from "../../widgets/Workers/Workers";
import CashHistory from "../../widgets/CashHistory/CashHistory";
import {getCustomers} from "../../api/customers";
import {getOrders} from "../../api/orders";
import {BiPurchaseTagAlt} from "react-icons/bi";
import {FaCartArrowDown} from "react-icons/fa";
import {getProducts} from "../../api/products";

export default function Dashboard() {

    const [loading,setLoading] = useState(false);
    const [customersData,setCustomersData] = useState([]);
    const [ordersData,setOrdersData] = useState([]);
    const [productsData,setProductsData] = useState([]);

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
            const customers = await getCustomers(1,10);
            const orders = await getOrders(1,10);
            const products = await getProducts(1,10);
            setCustomersData(customers.data);
            setOrdersData(orders?.data?.total);
            setProductsData(products?.data?.total);
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
                        <CurrentClients quantity={customersData?.total}/>

                        <Card  count={ordersData} title={'Buyurtmalar'} color={'green'} iconColor={'white'} icon={<BiPurchaseTagAlt size={60} />} />
                        <Card  count={productsData} title={'Mahsulotlar'} color={'gray'} iconColor={'white'} icon={<FaCartArrowDown size={55} />} />

                    </div>



                    <div className={style.col2}>

                        <LastDeals/>

                    </div>


                    <div className={style.col3}>

                        <Workers/>

                        <div className={'w-full '}>
                            <CashHistory/>
                        </div>

                    </div>


                </div>


            </div>
    </>

}