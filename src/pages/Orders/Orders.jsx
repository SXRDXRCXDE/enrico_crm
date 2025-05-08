import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import { message, Table} from "antd";
import { getOrders} from "../../api/orders";
import {getUsers} from "../../api/users";
import {getCustomers} from "../../api/customers";

import { getProducts} from "../../api/products";

export default function Orders() {

    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [ordersData,setOrdersData] = useState([]);
    const [usersData,setUsersData] = useState([]);
    const [customersData,setCustomersData] = useState([]);

    const [messageApi,contextHolder] = message.useMessage();

    const clampStyle = {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
    };

    const OrderColumns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
            render: (id) => <div style={clampStyle}>{id}</div>,
        },
        {
            title: "Foydalanuvchi ID",
            dataIndex: "user_id",
            key: "user_id",
            render: (user_id) => {
                const user = usersData.find((b) => b.id === user_id);
                return <div style={clampStyle}>{user ? user.username : "Noma'lum foydalanuvchi"}</div>;
            }
        },
        {
            title: "Mijoz ID",
            dataIndex: "customer_id",
            key: "customer_id",
            render: (customer_id) => {
                const customer = customersData.find((b) => b.id === customer_id);
                return <div style={clampStyle}>{customer ? customer.name : "Noma'lum mijoz"}</div>;
            }
        },
        {
            title: "Umumiy summa (UZS)",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (amount) => <div style={clampStyle}>{amount.toLocaleString("uz-UZ") + " so'm"}</div>,
        },
        {
            title: "Holati",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <div style={clampStyle}>
                    <span className="capitalize">{status}</span>
                </div>
            ),
        },
        {
            title: "Yaratilgan vaqti",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => <div style={clampStyle}>{new Date(date).toLocaleString("uz-UZ")}</div>,
        },
        {
            title: "Yangilangan vaqti",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (date) => <div style={clampStyle}>{new Date(date).toLocaleString("uz-UZ")}</div>,
        },
    ];




    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (pagination) => {
        setLoading(true);
        try {
            const orders = await getOrders(pagination);
            const users= await getUsers(1,100);
            const customers = await getCustomers(1,100);
            setOrdersData(orders.data); // make sure you have a state for ordersData
            setCustomersData(customers.data.items);
            setUsersData(users.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };




    return(
        <>
            {contextHolder}
            <div className={style.container}>

                <div className={style.contentHeader}>

                    <span className={'text-3xl font-semibold'}>Buyurtmalar haqida ma'lumotlar</span>

                    {/*<div onClick={()=>setModalOpen(true)} className={style.addButton}>Yangi qo'shish + </div>*/}

                </div>

                <div className={style.topOfTable}>

                    <span className={'text-xl font-semibold'}>Umumiy : {ordersData?.total} buyurtma</span>


                    {/*<span className={'py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2'}>Sana bo'yicha saralash <FaAngleDown /></span>*/}

                </div>

                <div className={style.tableWrapper}>

                    <Table
                        loading={loading}
                        className={'custom-table'}
                        columns={OrderColumns}
                        dataSource={ordersData.items}
                        sticky scroll={{y:590}}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,       // Number of items per page
                            total: 5 * 10,      // Total items (10 pages * 10 items)
                            showSizeChanger: false, // Disable page size change
                        }}
                        onChange={(pagination) => {
                            setCurrentPage(pagination.current); // Update current page
                            fetchOrders(pagination.current);
                        }}
                    />

                </div>

            </div>
        </>
    )


}