import React, { useEffect, useState } from "react";
import {Form, Input, Upload, Button, Avatar, Modal, message, Select} from "antd";
import style from "./style.module.css";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {getSizeById, updateSize} from "../../api/sizes";
import {getMaterialById, updateMaterial} from "../../api/material";
import {getOrderById, updateOrder} from "../../api/orders";
import {getUsers} from "../../api/users";
import {getCustomers} from "../../api/customers";

export default function EditOrderForm({id}) {
    const [form] = Form.useForm();  // Step 1: Create form instance
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder,setSelectedOrder] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const editactive = useSelector((state)=> state.edit.editActive);

    const [users,setUsers] = useState([]);
    const [customers,setCustomers] = useState([]);


    // Step 3: Handle form submission
    const onFinish = async (values) => {
        try {
            const response = await updateOrder(id, values);
            messageApi.success(" 🔥 Order updated successfully!");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);

        } catch (error) {
            console.error("Error Updating order:", error.response ? error.response.data : error);
            messageApi.error("Failed to update order.");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);
        }
    };


    useEffect(()=>{
        fetchOrder();

    },[])
    useEffect(()=>{
        if (selectedOrder) {
            form.setFieldsValue({
                user_id: selectedOrder.user_id,
                customer_id: selectedOrder.customer_id,
                total_amount: selectedOrder.total_amount,
                status: selectedOrder.status,
            });
        }
    },[selectedOrder])


    const fetchOrder = async () => {
        setLoading(true);
        try {
            const data = await getOrderById(id);
            const users = await getUsers();
            const customers = await getCustomers();
            setUsers(users.data);
            setCustomers(customers.data);
            setSelectedOrder(data.data)
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    };

    const handleBack = () => {
        dispatch(setEditActive(false));
    }



    return (
        <div className={style.container}>
            {contextHolder}

            <Form form={form} layout="vertical" className={style.form} onFinish={onFinish}>

                {/* Modal for Full-Screen Avatar */}
                <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)} centered>
                    <img src={avatar} alt="Avatar" style={{ width: "100%" }} />
                </Modal>

                {/* Row 1: User ID and Customer ID (Select Dropdowns) */}
                <div className={style.row}>
                    <Form.Item label="User" name="user_id" className={style.input} rules={[{ required: true, message: "Please select a user!" }]}>
                        <Select placeholder="Select User">
                            {users.map(user => (
                                <Select.Option key={user.id} value={user.id}>{user.username}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Customer" name="customer_id" className={style.input} rules={[{ required: true, message: "Please select a customer!" }]}>
                        <Select placeholder="Select Customer">
                            {customers.map(customer => (
                                <Select.Option key={customer.id} value={customer.id}>{customer.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>

                {/* Row 2: Total Amount and Status */}
                <div className={style.row}>
                    <Form.Item label="Total Amount" name="total_amount" className={style.input} rules={[{ required: true, message: "Enter total amount!" }]}>
                        <Input type="number" placeholder="Enter Total Amount" />
                    </Form.Item>
                    <Form.Item label="Status" name="status" className={style.input} rules={[{ required: true, message: "Enter order status!" }]}>
                        <Input placeholder="Enter Status" />
                    </Form.Item>
                </div>

                {/* Submit Button */}
                <Form.Item>
                    <Button className={'mr-10'} type="default" danger onClick={handleBack}>Back</Button>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>


        </div>
    );
}
