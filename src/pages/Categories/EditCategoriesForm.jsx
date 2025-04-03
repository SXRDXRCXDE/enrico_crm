import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Avatar, Modal, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import {deleteCustomerById, getCustomer, getCustomers, postCustomer, updateCustomer} from "../../api/customers";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {getCategoryById, updateCategory} from "../../api/categories";

export default function EditCategoriesForm({id}) {
    const [form] = Form.useForm();  // Step 1: Create form instance
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const editactive = useSelector((state)=> state.edit.editActive);


    // Step 3: Handle form submission
    const onFinish = async (values) => {
        try {
            const response = await updateCategory(id, values);
            messageApi.success("Category updated successfully!");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);

        } catch (error) {
            console.error("Error Updating Category:", error.response ? error.response.data : error);
            messageApi.error("Failed to update category.");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);
        }
    };


    useEffect(()=>{
        fetchCategory();

    },[])
    useEffect(()=>{
        if (selectedCategory) {
            form.setFieldsValue({
                name: selectedCategory.name,
                description: selectedCategory.description,
            });
        }
    },[selectedCategory])


    const fetchCategory = async () => {
        setLoading(true);
        try {
            const data = await getCategoryById(id);
            setSelectedCategory(data.data)
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

                {/* Row 1: Name and Surname */}
                <div className={style.row}>
                    <Form.Item label="Name" name="name" className={style.input}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                </div>

                {/* Extra Info TextArea */}
                <Form.Item label="Ba'tafsil ma'lumot" name="description">
                    <TextArea rows={4} placeholder="Enter additional information here..." />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button className={'mr-10'} type="default" danger onClick={handleBack}>Back</Button>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>

            </Form>
        </div>
    );
}
