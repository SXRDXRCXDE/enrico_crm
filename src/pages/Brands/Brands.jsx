import React, {useEffect, useState} from "react";
import {Table, Button, Avatar, Dropdown, Menu, message, Modal} from "antd";
import {PlusOutlined, DownOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import style from "./style.module.css";
import Header from "../../components/Header/Header";
import EditFormPage from "./EditBrandFormPage";
import {deleteCustomerById, getCustomers} from "../../api/customers";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {deleteBrand, getBrands} from "../../api/brands";
import {setLoading} from "../../store/reducers/loadingSlice";


export default function Brands() {

    const dispatch = useDispatch();
    const editActive = useSelector((state)=>state.edit.editActive);
    const loading = useSelector((state)=>state.loading.loading);

    const [messageApi, contextHolder] = message.useMessage();

    const [modal, contextHolderModal] = Modal.useModal(); // Initialize modal

    // const [editActive,setEdit] = useState(false);


    const [data, setData] = useState([]);

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

    const [editingCustomer, setEditingCustomer] = useState(null);



    const columns = [
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (avatar) => <Avatar src={avatar} />,
        },
        {
            title: "Name of brand",
            dataIndex: "name",
            key: "name",
        },
        // {
        //     title: "Products Quantity",
        //     dataIndex: "products",
        //     key: "products",
        // },
        // {
        //     title: "Phone Number",
        //     dataIndex: "phone",
        //     key: "phone",
        // },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        // {
        //     title: "Cost Sales",
        //     dataIndex: "cost",
        //     key: "cost",
        // },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)}
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        danger
                    />
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
                try {
                    await deleteBrand(id); // Replace with actual API call
                    messageApi.success(" Customer deleted successfully!");
                } catch (error) {
                    messageApi.error(" 🔥 Failed to delete customer.");
                } finally {
                    fetchBrands()
                }
            },
        });
    };


    const handleEdit = (record) => {
        console.log("Editing row:", record);
        setEditingCustomer(record.id);
        dispatch(setEditActive(true))
        // // Example: Open modal with pre-filled form data
        // setEditingCustomer(record); // Save record in state
        // setIsEditModalVisible(true); // Show edit modal
    };



    useEffect(()=>{
        fetchBrands();

    },[])



    const fetchBrands = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getBrands();
            setData(data.data)
        }catch (error){
            console.log(error)
        }finally {
            dispatch(setLoading(false));
        }
    };


    // loading===false? fetchBrands() : console.log("")


    return (

        <div className={'relative'}>
            {contextHolder}
            {contextHolderModal}

            {/*Header will be fixed to top */}
            <div  className={'w-full '}>
                <Header title={'Brandlar haqida ma’lumotlar'}/>
            </div>

            {
                editActive?
                    <div className={'p-5'}>
                        <EditFormPage id={editingCustomer}/>
                    </div>

                    :
                    <div className={style.container}>
                        <div className={style.subHeader}>
                            <p>Common: {data?.length} brands</p>
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
