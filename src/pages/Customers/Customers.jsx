import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {FaAngleDown} from "react-icons/fa";
import {Button, Input, message, Modal, Table} from "antd";
import {deleteCustomerById, getCustomers, postCustomer, updateCustomer} from "../../api/customers";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {MdCancel} from "react-icons/md";


export default function Customers() {

    const [loading,setLoading] = useState(false);
    const [isModalOpen,setModalOpen] = useState(false);
    const [isEditModalOpen,setEditModalOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [customersData,setCustomersData] = useState([]);

    const [customersQuantity,setCustomersQuantity] = useState(0);

    const [messageApi,contextHolder] = message.useMessage();

    const [editForm, setEditForm] = useState({});
    const [formData,setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        extra_info: ''
    });

    const CustomerColumns = [
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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Extra Info",
            dataIndex: "extra_info",
            key: "extra_info",
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
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }
    ];

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            // Perform the delete operation based on the active tab
            deleteCustomerById(id)

            messageApi.success("Muvaffaqiyatli o'chirildi!");
            setCurrentPage(1);

            // Refresh the data
            fetchCustomers({ current: 1, pageSize: 10 });
        } catch (err) {
            console.error(err);
            messageApi.error("O'chirishda xatolik yuz berdi!");
        }
        finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        setEditForm(record);
        setEditModalOpen(true);
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditOk = async () => {
        setLoading(true);
        try {
            await updateCustomer(editForm.id, editForm); // Call the updateCustomer API

            messageApi.success("Mijoz muvaffaqiyatli tahrirlandi!");
            setEditModalOpen(false);
            setCurrentPage(1); // Optional: reset to first page
            fetchCustomers(1);
        } catch (err) {
            console.error("Error updating customer:", err);
            messageApi.error("Xatolik yuz berdi!");
        }
        finally {
            setLoading(false);
        }
    };




    const EditModal = (
        <Modal
            open={isEditModalOpen}
            onCancel={() => setEditModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Mijozni tahrirlash</div>}
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
                    onClick={handleEditOk}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                >
                    Saqlash
                </button>,
            ]}
        >
            {["name", "email", "phone", "address", "extra_info"].map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.replace("_", " ").toUpperCase()}</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        name={field}
                        placeholder={`Enter ${field.replace("_", " ")}`}
                        onChange={handleEditChange}
                        value={editForm[field] || ""}
                    />
                </div>
            ))}
        </Modal>
    );




    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            await postCustomer(formData);
            messageApi.success("Mijoz muvaffaqiyatli qo'shildi!");
            setModalOpen(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                extra_info: ''
            });
            fetchCustomers(); // if you have this function to reload data
        } catch (error) {
            console.error("Xatolik:", error);
            messageApi.error("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };


    const AddModal = (
        <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Yangi mijoz qo'shish</div>}
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
            {[
                { label: 'Ismi', name: 'name', type: 'input', placeholder: 'Ismingizni kiriting' },
                { label: 'Email', name: 'email', type: 'input', placeholder: 'Email kiriting' },
                { label: 'Telefon', name: 'phone', type: 'input', placeholder: 'Telefon raqamingiz' },
                { label: 'Manzil', name: 'address', type: 'input', placeholder: 'Manzil kiriting' },
                { label: 'Qo‘shimcha ma’lumot', name: 'extra_info', type: 'textarea', placeholder: 'Qo‘shimcha ma’lumot' },
            ].map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.label}</label>
                    {field.type === 'input' ? (
                        <Input
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    ) : (
                        <Input.TextArea
                            className="h-28 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
        </Modal>
    );




    useEffect(()=>{

        fetchCustomers();

    },[])



    const fetchCustomers = async (pagination) => {
        setLoading(true);
        try {
            const customers = await getCustomers(pagination);
            // const allCustomers = await getCustomers(1,1000);
            setCustomersData(customers?.data);
            console.log(customers)
            // setCustomersQuantity(allCustomers.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
        finally {
            setLoading(false);
        }
    };


    return(
        <>
            {contextHolder}
            {AddModal}
            {EditModal}
            <div className={style.container}>

                <div className={style.contentHeader}>

                    <span className={'text-3xl font-semibold'}>Mijozlar haqida ma'lumotlar</span>

                    <div onClick={()=>setModalOpen(true)} className={style.addButton}>Yangi qo'shish + </div>

                </div>

                <div className={style.topOfTable}>

                    <span className={'text-xl font-semibold'}>Umumiy : {customersData?.total} mijoz</span>


                    <span className={'py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2'}>Sana bo'yicha saralash <FaAngleDown />

                    </span>

                </div>

                <div className={style.tableWrapper}>

                    <Table
                        loading={loading}
                        className={'custom-table'}
                        columns={CustomerColumns}
                        dataSource={customersData.items}
                        sticky scroll={{y:630}}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,       // Number of items per page
                            total: 5 * 10,      // Total items (10 pages * 10 items)
                            showSizeChanger: false, // Disable page size change
                        }}
                        onChange={(pagination) => {
                            setCurrentPage(pagination.current); // Update current page
                            fetchCustomers(pagination.current);
                        }}
                    />

                </div>

            </div>
        </>
    )


}