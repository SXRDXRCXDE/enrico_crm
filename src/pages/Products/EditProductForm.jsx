import React, { useEffect, useState } from "react";
import {Form, Input, Upload, Button, Avatar, Modal, message, Select, InputNumber} from "antd";
import style from "./style.module.css";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {setEditActive} from "../../store/reducers/editSlice";
import {getProductById, updateProduct} from "../../api/products";
import {UploadOutlined} from "@ant-design/icons";
import {getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";

export default function EditCategoriesForm({id}) {
    const [form] = Form.useForm();  // Step 1: Create form instance
    const [messageApi, contextHolder] = message.useMessage();
    const [avatar, setAvatar] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct,setSelectedProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [brand,setBrand] = useState([]);
    const [material,setMaterial] = useState([]);

    const dispatch = useDispatch();
    const editactive = useSelector((state)=> state.edit.editActive);


    // Step 3: Handle form submission
    const onFinish = async (values) => {
        try {
            const response = await updateProduct(id, values);
            messageApi.success("Product updated successfully!");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);

        } catch (error) {
            console.error("Error Updating Product:", error.response ? error.response.data : error);
            messageApi.error("Failed to update product.");
            setTimeout(()=>
                dispatch(setEditActive(false)),1000);
        }
    };


    useEffect(()=>{
        fetchProduct();

    },[])
    useEffect(()=>{
        if (selectedProduct) {
            form.setFieldsValue({
                name: selectedProduct.name || "",  // Default to empty string if undefined
                description: selectedProduct.description || "",
                barcode: selectedProduct.barcode || "",
                price: selectedProduct.price || 0,
                brand_id: selectedProduct.brand_id || null,
                material_id: selectedProduct.material_id || null,
                images: selectedProduct.images || [],
                tags: selectedProduct.tags || [],
            });
        }
    },[selectedProduct])


    const fetchProduct = async () => {
        setLoading(true);
        try {
            const data = await getProductById(id);
            const brand = await getBrands();
            const material = await getMaterials();
            setBrand(brand.data);
            setMaterial(material.data);
            setSelectedProduct(data.data)
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    };

    const handleBack = () => {
        dispatch(setEditActive(false));
    }

    const handleImagePreview = (file) => {
        setImagePreview(file.url || file.thumbUrl);
        setIsModalVisible(true);
    };


    return (
        <div className={style.container}>
            {contextHolder}

            <Form form={form} layout="vertical" className={style.form} onFinish={onFinish}>

                {/* Modal for Full-Screen Image Preview */}
                <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)} centered>
                    <img src={imagePreview} alt="Product Image" style={{ width: "100%" }} />
                </Modal>

                {/* Name */}
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter product name" }]}>
                    <Input placeholder="Enter product name" />
                </Form.Item>

                {/* Barcode */}
                <Form.Item label="Barcode" name="barcode" rules={[{ required: true, message: "Please enter barcode" }]}>
                    <Input placeholder="Enter barcode" />
                </Form.Item>

                {/* Description */}
                <Form.Item label="Description" name="description">
                    <TextArea rows={4} placeholder="Enter additional details..." />
                </Form.Item>

                {/* Price */}
                <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter price" }]}>
                    <InputNumber placeholder="Enter price" style={{ width: "100%" }} min={0} />
                </Form.Item>

                {/* Brand ID */}
                <Form.Item label="Brand ID" name="brand_id" rules={[{ required: true, message: "Please select a brand" }]}>
                    <Select placeholder="Select brand">
                        {brand.map((value) => (
                            <Select.Option key={value.id} value={value.id}>
                                {value.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Material ID */}
                <Form.Item label="Material ID" name="material_id" rules={[{ required: true, message: "Please select a material" }]}>
                    <Select placeholder="Select material">
                        {material.map((value)=> (
                            <Select.Option key={value.id} value={value.id}>{value.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Images Upload */}
                <Form.Item label="Product Images" name="images">
                    <Upload listType="picture" beforeUpload={() => false} onPreview={handleImagePreview}>
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                {/* Tags */}
                <Form.Item label="Tags" name="tags">
                    <Select mode="tags" placeholder="Add tags (press enter to add)">
                        <Select.Option value="new">New</Select.Option>
                        <Select.Option value="popular">Popular</Select.Option>
                    </Select>
                </Form.Item>

                {/* Submit and Back Buttons */}
                <Form.Item>
                    <Button className="mr-10" type="default" danger onClick={handleBack}>
                        Back
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}
