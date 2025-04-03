import React, {useEffect, useState} from "react";
import {Table, Button, Avatar, Dropdown, Menu, message, Modal} from "antd";
import {PlusOutlined, DownOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import style from "./style.module.css";
import Header from "../../components/Header/Header";
import EditFormPage from "./EditOrderForm";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {setLoading} from "../../store/reducers/loadingSlice";
import {deleteMaterial, getMaterials} from "../../api/material";
import {getOrders} from "../../api/orders";
import {getUsers} from "../../api/users";
import {getCustomers} from "../../api/customers";


export default function Orders() {

    const dispatch = useDispatch();
    const editActive = useSelector((state)=>state.edit.editActive);
    const loading = useSelector((state)=>state.loading.loading);

    const [messageApi, contextHolder] = message.useMessage();

    const [modal, contextHolderModal] = Modal.useModal(); // Initialize modal



    const [data, setData] = useState([]);
    const [users,setUsers] = useState([]);
    const [customers,setCustomers] = useState([]);

    const sortMenu = (
        <Menu
            onClick={(e) => {
                let sortedData;
                if (e.key === "date") {
                    sortedData = [...data]; // Assume data has a date field for real sorting
                } else if (e.key === "az") {
                    sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
                } else if (e.key === "za") {
                    sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
                }
                setData(sortedData);
            }}
        >
            <Menu.Item key="date">Sort by Date</Menu.Item>
            <Menu.Item key="az">Sort A to Z</Menu.Item>
            <Menu.Item key="za">Sort Z to A</Menu.Item>
        </Menu>
    );

    const [editingOrder, setEditingOrder] = useState(null);



    const columns = [
        // {
        //     title: "Order ID",
        //     dataIndex: "id",
        //     key: "id",
        // },
        {
            title: "User ID",
            dataIndex: "user_id",
            key: "user_id",
            render: (id)=> users[id].username
        },
        {
            title: "Customer ID",
            dataIndex: "customer_id",
            key: "customer_id",
            render: (id)=> customers[id].name
        },
        {
            title: "Total Amount",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (total_amount) => `$${(total_amount ?? 0).toLocaleString()}`,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false // Use 24-hour format
            }).replace(",", ""), // Removes comma
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (date) => new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }).replace(",", ""),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)}
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 }}
                    />
                    {/*<Button*/}
                    {/*    onClick={() => handleDelete(record.id)}*/}
                    {/*    icon={<DeleteOutlined />}*/}
                    {/*    danger*/}
                    {/*/>*/}
                </>
            ),
        }
    ];


    const handleDelete = async (id) => {
        modal.confirm({
            title: "Are you sure?",
            content: "This action cannot be undone.",
            okText: "Yes, Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: async () => {
                // try {
                //     await deleteMaterial(id); // Replace with actual API call
                //     messageApi.success(" 🔥 Material deleted successfully!");
                // } catch (error) {
                //     messageApi.error("  Failed to delete material.");
                // } finally {
                //     await fetchOrders()
                // }
                alert("orderni udalit qimaymiz hahahaha")
            },
        });
    };


    const handleEdit = (record) => {
        setEditingOrder(record.id);
        dispatch(setEditActive(true))
        // // Example: Open modal with pre-filled form data
        // setEditingCustomer(record); // Save record in state
        // setIsEditModalVisible(true); // Show edit modal
    };



    useEffect(()=>{
        fetchOrders();

    },[])



    const fetchOrders = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getOrders();
            const users = await getUsers();
            const customers = await getCustomers();
            setUsers(users.data);
            setCustomers(customers.data);
            setData(data.data)
        }catch (error){
            console.log(error)
        }finally {
            dispatch(setLoading(false));
        }
    };


    // loading===false? fetchOrders() : console.log("")


    return (

        <div className={'relative'}>
            {contextHolder}
            {contextHolderModal}

            {/*Header will be fixed to top */}
            <div  className={'w-full '}>
                <Header title={'Buyurtmalar haqida ma’lumotlar'}/>
            </div>

            {
                editActive?
                    <div className={'p-5'}>
                        <EditFormPage id={editingOrder}/>
                    </div>

                    :
                    <div className={style.container}>
                        <div className={style.subHeader}>
                            <p>Common: {data?.length} orders</p>
                            <Dropdown overlay={sortMenu}>
                                <Button>
                                    Sort <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={data}
                            className={style.table}
                            pagination={{
                                pageSize: 10,       // Number of items per page
                                total: 5 * 10,      // Total items (10 pages * 10 items)
                                showSizeChanger: false, // Disable page size change
                            }}
                        />


                    </div>
            }

        </div>


    );
}
