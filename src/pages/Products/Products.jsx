import React, {useEffect, useState} from "react";
import {Table, Button, Avatar, Dropdown, Menu, message, Modal, Input} from "antd";
import {PlusOutlined, DownOutlined, EditOutlined, DeleteOutlined, SearchOutlined} from "@ant-design/icons";
import style from "./style.module.css";
import Header from "../../components/Header/Header";
import EditFormPage from "./EditProductForm";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {setLoading} from "../../store/reducers/loadingSlice";
import {deleteSize, getSizes} from "../../api/sizes";
import {deleteProduct, getProducts} from "../../api/products";
import {getBrandById, getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";


export default function Products() {

    const dispatch = useDispatch();
    const editActive = useSelector((state)=>state.edit.editActive);
    const loading = useSelector((state)=>state.loading.loading);

    const [messageApi, contextHolder] = message.useMessage();

    const [modal, contextHolderModal] = Modal.useModal(); // Initialize modal

    const [searchTerm, setSearchTerm] = useState(""); // Search input state
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const limit = 10; // Items per page



    const [data, setData] = useState([]);
    const [brand,setBrands] = useState([]);
    const [materials,setMaterials] = useState([]);

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

    const [editingProduct, setEditingProducts] = useState(null);



    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Barcode",
            dataIndex: "barcode",
            key: "barcode",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${(price ?? 0).toLocaleString()}`,
        },
        {
            title: "Brand ID",
            dataIndex: "brand_id",
            key: "brand_id",
            render : (id)=> brand[id]?.name,
        },
        {
            title: "Material ID",
            dataIndex: "material_id",
            key: "material_id",
            render : (id)=> materials[id]?.name,
        },
        {
            title: "Images",
            dataIndex: "images",
            key: "images",
            render: (images) => images?.length ? <img src={images[0]} alt="Product" width={50} /> : "No Image"
        },
        {
            title: "Tags",
            dataIndex: "tags",
            key: "tags",
            render: (tags) => tags?.join(", "), // Join tags into a comma-separated string
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
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
                    await deleteProduct(id); // Replace with actual API call
                    messageApi.success(" Products deleted successfully!");
                } catch (error) {
                    messageApi.error(" 🔥 Failed to delete products.");
                } finally {
                    fetchProducts()
                }
            },
        });
    };


    const handleEdit = (record) => {
        setEditingProducts(record.id);
        dispatch(setEditActive(true))
        // // Example: Open modal with pre-filled form data
        // setEditingCustomer(record); // Save record in state
        // setIsEditModalVisible(true); // Show edit modal
    };



    useEffect(()=>{
        fetchProducts();

    },[])



    const fetchProducts = async (page,limit) => {
        dispatch(setLoading(true));
        try {
            const data = await getProducts(page,limit);
            const brand = await getBrands();
            const material = await getMaterials();
            setData(data.data);
            setBrands(brand.data);
            setMaterials(material.data)
        }catch (error){
            console.log(error)
        }finally {
            dispatch(setLoading(false));
        }
    };


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Call API with the search query
        fetchProducts(value);
    };

    // loading===false?
    // setTimeout(()=>{
    //     fetchProducts()
    // },300)
    //     :
    //     console.log("")

    return (

        <div className={'relative'}>
            {contextHolder}
            {contextHolderModal}

            {/*Header will be fixed to top */}
            <div  className={'w-full '}>
                <Header title={'Mahsulotlar haqida ma’lumotlar'}/>
            </div>

            {
                editActive?
                    <div className={'p-5'}>
                        <EditFormPage id={editingProduct}/>
                    </div>

                    :
                    <div className={style.container}>
                        <div className={style.subHeader}>
                            <p>Common: {data?.length} products</p>
                            <Dropdown overlay={sortMenu}>
                                <Button>
                                    Sort <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        {/* Search Input */}
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ marginBottom: 16, width: 300 }}
                        />
                        <Table
                            columns={columns}
                            dataSource={data}
                            className={style.table}
                            loading={loading}
                            pagination={{
                                pageSize: 10,       // Number of items per page
                                total: 5 * 10,      // Total items (10 pages * 10 items)
                                showSizeChanger: false, // Disable page size change
                            }}
                            onChange={(pagination) => {
                                fetchProducts(pagination.current, pagination.pageSize);
                            }}
                        />


                    </div>
            }

        </div>


    );
}
