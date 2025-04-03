import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Avatar, Modal, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import {deleteCustomerById, getCustomer, getCustomers, postCustomer, updateCustomer} from "../../api/customers";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";

export default function EditCustomerPage({id}) {
    const [form] = Form.useForm();  // Step 1: Create form instance
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCustomer,setSelectedCustomer] = useState([]);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    const editactive = useSelector((state)=> state.edit.editActive);


    // const handleUpload = ({ fileList }) => {
    //     if (fileList.length > 0) {
    //         const file = fileList[0].originFileObj;
    //         setAvatar(URL.createObjectURL(file));
    //     }
    // };



    // const handleDelete = () => {
    //     setAvatar(null);
    //     setIsModalVisible(false);
    //     messageApi.open({
    //         content: "🔥 Customer deleted",
    //         duration: 2,
    //         style: { backgroundColor: "#E03C3C", color: "#fff" },
    //     });
    // };
    // const handleDelete = () => {
    //     Modal.confirm({
    //         title: "Are you sure you want to delete?",
    //         content: "This action cannot be undone.",
    //         okText: "Yes, Delete",
    //         okType: "danger",
    //         cancelText: "Cancel",
    //         onOk: async () => {
    //             try {
    //                 await deleteCustomerById(id); // Replace with actual delete function
    //                 message.success("Customer deleted successfully!");
    //             } catch (error) {
    //                 message.error("Failed to delete customer.");
    //             }
    //         },
    //     });
    // };


    // const handleAvatarClick = () => {
    //     if (avatar) {
    //         setIsModalVisible(true);
    //     }
    // };

    // Step 3: Handle form submission
    const onFinish = async (values) => {
        try {
            console.log("Submitting Data:", values); // Debugging log
            const response = await updateCustomer(id, values);
            messageApi.success("Customer updated successfully!");
            console.log("Response:", response); // Log server response
            dispatch(setEditActive(false));
        } catch (error) {
            console.error("Error Updating Customer:", error.response ? error.response.data : error);
            messageApi.error("Failed to update customer.");
            dispatch(setEditActive(false));
        }
    };


    useEffect(()=>{

        fetchCustomer()

    },[])
    useEffect(() => {
        if (selectedCustomer) {
            form.setFieldsValue({
                name: selectedCustomer.name,
                email: selectedCustomer.email,
                phone: selectedCustomer.phone,
                address: selectedCustomer.address,
                extraInfo: selectedCustomer.extra_info,
            });
        }
    }, [selectedCustomer]);

    const fetchCustomer = async () => {
        setLoading(true);
        try {
            const data = await getCustomer(id);
            setSelectedCustomer(data.data)
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    };

    const handleBack = () => {
        dispatch(setEditActive(false))
    }

    return (
        <div className={style.container}>
            {contextHolder}

            <Form form={form} layout="vertical" className={style.form} onFinish={onFinish}>
                {/*/!* Avatar Upload *!/*/}
                {/*<div className={style.avatarContainer}>*/}
                {/*    <Avatar*/}
                {/*        size={80}*/}
                {/*        src={avatar}*/}
                {/*        className={style.avatar}*/}
                {/*        onClick={handleAvatarClick}*/}
                {/*        style={{ cursor: avatar ? "pointer" : "default" }}*/}
                {/*    />*/}
                {/*    <Upload showUploadList={false} beforeUpload={() => false} onChange={handleUpload}>*/}
                {/*        <Button icon={<UploadOutlined />}>Add Photo</Button>*/}
                {/*    </Upload>*/}
                {/*    {avatar && (*/}
                {/*        <Button icon={<DeleteOutlined />} onClick={handleDelete} danger>*/}
                {/*            Delete*/}
                {/*        </Button>*/}
                {/*    )}*/}
                {/*</div>*/}

                {/* Modal for Full-Screen Avatar */}
                <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)} centered>
                    <img src={avatar} alt="Avatar" style={{ width: "100%" }} />
                </Modal>

                {/* Row 1: Name and Surname */}
                <div className={style.row}>
                    <Form.Item label="Name" name="name" className={style.input}>
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    {/*<Form.Item label="Surname" name="surname" className={style.input}>*/}
                    {/*    <Input placeholder="Enter surname" />*/}
                    {/*</Form.Item>*/}
                </div>

                {/* Row 2: Email and Phone Number */}
                <div className={style.row}>
                    <Form.Item label="Email" name="email" className={style.input}>
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone" className={style.input}>
                        <Input placeholder="Enter phone number" />
                    </Form.Item>
                </div>

                {/* Row 3: Address */}
                <Form.Item label="Address" name="address" className={style.input}>
                    <Input placeholder="Street name" />
                </Form.Item>
                {/*<div className={style.row}>*/}
                {/*    <Form.Item name="city" className={style.input}>*/}
                {/*        <Input placeholder="City" />*/}
                {/*    </Form.Item>*/}
                {/*    <Form.Item name="province" className={style.input}>*/}
                {/*        <Input placeholder="Province" />*/}
                {/*    </Form.Item>*/}
                {/*    <Form.Item name="postalCode" className={style.input}>*/}
                {/*        <Input placeholder="Postal Code" />*/}
                {/*    </Form.Item>*/}
                {/*</div>*/}

                {/* Extra Info TextArea */}
                <Form.Item label="Extra Info" name="extraInfo">
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
