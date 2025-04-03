import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Avatar, Modal, message } from "antd";
import style from "./style.module.css";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {getSizeById, updateSize} from "../../api/sizes";

export default function EditCustomerPage({id}) {
    const [form] = Form.useForm();  // Step 1: Create form instance
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBrand,setSelectedBrand] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const editactive = useSelector((state)=> state.edit.editActive);


    // Step 3: Handle form submission
    const onFinish = async (values) => {
        try {
            const response = await updateSize(id, values);
            messageApi.success("Size updated successfully!");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);

        } catch (error) {
            console.error("Error Updating Brand:", error.response ? error.response.data : error);
            messageApi.error("Failed to update size.");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);
        }
    };


    useEffect(()=>{
        fetchSize();

    },[])
    useEffect(()=>{
        if (selectedBrand) {
            form.setFieldsValue({
                name: selectedBrand.name,
                description: selectedBrand.description,
            });
        }
    },[selectedBrand])


    const fetchSize = async () => {
        setLoading(true);
        try {
            const data = await getSizeById(id);
            setSelectedBrand(data.data)
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
