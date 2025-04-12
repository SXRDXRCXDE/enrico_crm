import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {FaAngleDown} from "react-icons/fa";
import {Button, Input, message, Modal, Select, Table} from "antd";
import {createOrder, getOrders, updateOrder} from "../../api/orders";
import {getUsers} from "../../api/users";
import {getCustomers} from "../../api/customers";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {MdCancel} from "react-icons/md";
import {deleteProduct, getProducts} from "../../api/products";

export default function Orders() {

    const [loading,setLoading] = useState(false);
    const [isModalOpen,setModalOpen] = useState(false);
    const [isEditModalOpen,setEditModalOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [ordersData,setOrdersData] = useState([]);
    const [usersData,setUsersData] = useState([]);
    const [customersData,setCustomersData] = useState([]);
    const [productsData,setProductsData] = useState([]);
    const [ordersQuantity,seOrdersQuantity] = useState(0);

    const [messageApi,contextHolder] = message.useMessage();

    const [editForm, setEditForm] = useState({});
    const [formData, setFormData] = useState({
        user_id: null,
        customer_id: null,
        total_amount: 0,
        status: '',
    });
    const [orderItems, setOrderItems] = useState([
        { product_id: null, quantity: 0, price: 0 }
    ]);



    const OrderColumns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Foydalanuvchi ID",
            dataIndex: "user_id",
            key: "user_id",
            render: (user_id) => {
                const user = usersData.find((b) => b.id === user_id);
                return <>{user ? user.username : "Noma'lum foydalanuvchi"}</>;
            }
        },
        {
            title: "Mijoz ID",
            dataIndex: "customer_id",
            key: "customer_id",
            render: (customer_id) => {
                const customer = customersData.find((b) => b.id === customer_id);
                return <>{customer ? customer.name : "Noma'lum mijoz"}</>;
            }
        },
        {
            title: "Umumiy summa (UZS)",
            dataIndex: "total_amount",
            key: "total_amount",
            render: (amount) => amount.toLocaleString("uz-UZ") + " so'm",
        },
        {
            title: "Holati",
            dataIndex: "status",
            key: "status",
            render: (status) => <span className="capitalize">{status}</span>,
        },
        {
            title: "Yaratilgan vaqti",
            dataIndex: "created_at",
            key: "created_at",
            render: (date) => new Date(date).toLocaleString("uz-UZ"),
        },
        {
            title: "Yangilangan vaqti",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (date) => new Date(date).toLocaleString("uz-UZ"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    {/*<Button*/}
                    {/*    onClick={() => handleDelete(record.id)}*/}
                    {/*    icon={<DeleteOutlined />}*/}
                    {/*    style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}*/}
                    {/*    danger*/}
                    {/*/>*/}
                </>
            ),
        },
    ];


    const handleEdit = (record) => {
        setEditModalOpen(true);
        setEditForm({
            ...record,
        });

        // Fetch the existing order_items if needed from the record
        setOrderItems(record.order_items || []);
        setEditModalOpen(true);
    };


    const handleEditSave = async () => {
        setLoading(true);
        try {
            const payload = {
                order: {
                    ...editForm,
                    total_amount: editForm.total_amount, // Use the total_amount from editForm
                },
                // order_items: orderItems, // Optionally update this if needed
            };

            await updateOrder(editForm.id, payload); // If you have this API for updating orders
            message.success("Buyurtma muvaffaqiyatli yangilandi!");
            setEditModalOpen(false);
            fetchOrders();
        } catch (error) {
            console.error("Xatolik:", error);
            message.error("Yangilashda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };



    const EditModal = (
        <Modal
            open={isEditModalOpen}
            onCancel={() => setEditModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Buyurtmani tahrirlash</div>}
            closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
            footer={[
                <button
                    key="cancel"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                >
                    Bekor qilish
                </button>,
                <button
                    key="submit"
                    onClick={handleEditSave}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                >
                    Saqlash
                </button>,
            ]}
        >
            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Foydalanuvchi</label>
                <Select
                    className="h-12 mt-3 text-2xl w-full"
                    placeholder="Foydalanuvchi tanlang"
                    onChange={(value) => setEditForm((prev) => ({ ...prev, user_id: value }))}
                    value={editForm.user_id}
                >
                    {usersData.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.username}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Mijoz</label>
                <Select
                    className="h-12 mt-3 text-2xl w-full"
                    placeholder="Mijoz tanlang"
                    onChange={(value) => setEditForm((prev) => ({ ...prev, customer_id: value }))}
                    value={editForm.customer_id}
                >
                    {customersData.map((customer) => (
                        <Select.Option key={customer.id} value={customer.id}>
                            {customer.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Buyurtma holati</label>
                <Input
                    className="h-12 mt-3 text-2xl"
                    name="status"
                    placeholder="Holat kiriting"
                    onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}
                    value={editForm.status}
                />
            </div>
        </Modal>
    );




    const handleOk = async () => {
        setLoading(true);
        try {
            const payload = {
                order: formData,
                order_items: orderItems,
            };

            await createOrder(payload);
            message.success("Buyurtma muvaffaqiyatli yaratildi!");

            // Reset form
            setFormData({
                user_id: null,
                customer_id: null,
                total_amount: 0,
                status: '',
            });

            setOrderItems([
                {
                    product_id: null,
                    quantity: 0,
                    price: 0,
                },
            ]);

            setModalOpen(false);
            fetchOrders(); // Refresh the list
        } catch (error) {
            console.error("Xatolik:", error);
            message.error("Buyurtma yaratishda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleOrderItemChange = (value, index, field) => {
        const updatedItems = [...orderItems];

        if (!updatedItems[index]) updatedItems[index] = {};

        if (field === 'product_id') {
            const selectedProduct = productsData.find(p => p.id === value);
            updatedItems[index] = {
                ...updatedItems[index],
                product_id: value,
                price: selectedProduct?.price || 0,
            };
        } else {
            updatedItems[index] = {
                ...updatedItems[index],
                [field]: value,
            };
        }

        setOrderItems(updatedItems);

        // Calculate total amount
        const total = updatedItems.reduce((sum, item) => {
            return sum + (parseFloat(item.price || 0) * parseFloat(item.quantity || 0));
        }, 0);

        setFormData((prev) => ({
            ...prev,
            total_amount: total,
        }));
    };





    const addOrderItem = () => {
        setOrderItems((prevItems) => [
            ...prevItems,
            { product_id: null, quantity: 0, price: 0 }
        ]);
    };


    const removeOrderItem = (indexToRemove) => {
        const updatedItems = orderItems.filter((_, index) => index !== indexToRemove);
        setOrderItems(updatedItems);

        // Recalculate total_amount
        const newTotal = updatedItems.reduce((sum, item) => {
            return sum + (parseFloat(item.price || 0) * parseFloat(item.quantity || 0));
        }, 0);

        setFormData((prev) => ({
            ...prev,
            total_amount: newTotal,
        }));
    };



    const AddModal = (
        <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Yangi buyurtma qo'shish</div>}
            closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
            footer={[
                <button
                    key="cancel"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                >
                    Bekor qilish
                </button>,
                <button
                    key="submit"
                    onClick={handleOk}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                >
                    Saqlash
                </button>,
            ]}
        >
            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Foydalanuvchi</label>
                <Select
                    className="h-12 mt-3 text-2xl w-full"
                    placeholder="Foydalanuvchi tanlang"
                    onChange={(value) => handleChange({ target: { name: 'user_id', value } })}
                    value={formData.user_id}
                >
                    {usersData.map((user) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.username}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Mijoz</label>
                <Select
                    className="h-12 mt-3 text-2xl w-full"
                    placeholder="Mijoz tanlang"
                    onChange={(value) => handleChange({ target: { name: 'customer_id', value } })}
                    value={formData.customer_id}
                >
                    {customersData.map((customer) => (
                        <Select.Option key={customer.id} value={customer.id}>
                            {customer.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Buyurtma holati</label>
                <Input
                    className="h-12 mt-3 text-2xl"
                    name="status"
                    placeholder="Holat kiriting"
                    onChange={handleChange}
                    value={formData.status}
                />
            </div>

            <div className="mb-6 mt-6 text-2xl font-semibold">
                <label>Jami summa (hisoblanadi)</label>
                <Input
                    className="h-12 mt-3 text-2xl"
                    value={formData.total_amount.toLocaleString("uz-UZ") + " so'm"}
                    disabled
                />
            </div>

            {/* You can dynamically map order items here */}
            {orderItems.map((item, index) => (
                <div key={index} className="mb-6 mt-6 text-2xl font-semibold border p-4 rounded-xl relative">

                    {/* Remove Button (top-right corner) */}
                    {orderItems.length > 1 && (
                        <button
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
                            onClick={() => removeOrderItem(index)}
                        >
                            ❌
                        </button>
                    )}

                    <label>Mahsulot</label>
                    <Select
                        className="h-12 mt-3 text-2xl w-full"
                        placeholder="Mahsulot tanlang"
                        value={item.product_id}
                        onChange={(value) => handleOrderItemChange(value, index, 'product_id')}
                    >
                        {productsData.map((product) => (
                            <Select.Option key={product.id} value={product.id}>
                                {product.name}
                            </Select.Option>
                        ))}
                    </Select>

                    <label className="mt-4 block">Miqdor</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        type="number"
                        placeholder="Miqdor"
                        value={item.quantity}
                        onChange={(e) => handleOrderItemChange(e.target.value, index, 'quantity')}
                    />

                    <label className="mt-4 block">Narx (avtomatik)</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        value={item.price}
                        disabled
                    />
                </div>
            ))}

            <button
                onClick={addOrderItem}
                className="mt-4 px-4 py-2 text-xl font-semibold rounded-full duration-500 border border-dashed border-gray-400 hover:bg-gray-100"
            >
                + Yangi mahsulot qo‘shish
            </button>
        </Modal>
    );


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async (pagination) => {
        setLoading(true);
        try {
            const orders = await getOrders(pagination);
            const users= await getUsers(1,100);
            const customers = await getCustomers(1,100);
            const products = await getProducts(1,100);
            setOrdersData(orders.data); // make sure you have a state for ordersData
            setCustomersData(customers.data);
            setUsersData(users.data);
            setProductsData(products.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };




    return(
        <>
            {contextHolder}
            {EditModal}
            {AddModal}
            <div className={style.container}>

                <div className={style.contentHeader}>

                    <span className={'text-3xl font-semibold'}>Buyurtmalar haqida ma'lumotlar</span>

                    <div onClick={()=>setModalOpen(true)} className={style.addButton}>Yangi qo'shish + </div>

                </div>

                <div className={style.topOfTable}>

                    <span className={'text-xl font-semibold'}>Umumiy : {ordersQuantity?.length} buyurtma</span>


                    <span className={'py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2'}>Sana bo'yicha saralash <FaAngleDown />

                    </span>

                </div>

                <div className={style.tableWrapper}>

                    <Table
                        loading={loading}
                        className={'custom-table'}
                        columns={OrderColumns}
                        dataSource={ordersData}
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