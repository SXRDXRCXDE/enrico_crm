import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import Check from "./check";
import {getOrders} from "../../api/orders";
import {getCustomer, getCustomers} from "../../api/customers";
import {Link} from "react-router-dom";
import {getUsers} from "../../api/users";

export default function LastDeals() {

    const [loading,setLoading] = useState(false);
    const [orders,setOrders] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [users,setUsers] = useState([]);


    useEffect(()=>{
        fetchOrders()
    },[]);


    const fetchOrders = async () => {
        setLoading(true);
        try {
            const orders = await getOrders();
            const customers = await getCustomers();
            const users = await getUsers();
            setOrders(orders.data);
            setCustomers(customers.data);
            setUsers(users.data);
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    };


    console.log(orders)

    return<>
        <div className={style.container}>

            <div className={style.titleWrapper}>

                <div className={style.title}>Oxirgi yirik orders</div>
                <Link to={'/orders'}>
                    <div className={style.filter}>Umumiy</div>
                </Link>

            </div>

            <div className={style.checkWrapper}>

                {orders.map((value, index)=> <Check
                    name={users[value.user_id]?.username}
                    username={customers[value.customer_id]?.name}
                    address={value?.status}
                    total_amount={value?.total_amount}
                    date={value?.created_at}
                />)}

            </div>

            <div className={style.seeAll}>Barcha sotib oluvchilarni ko‘rsatish...</div>



        </div>
    </>

}