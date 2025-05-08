import { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Button, Tag, Space, Row, Col, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {createProduct, updateProduct} from "../api/products";

const { TextArea } = Input;

export default function ProductForm({ brands, materials, categories, onSubmit, product }) {



    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                description: product.description,
                barcode: product.barcode,
                brand_id: product.brand_id,
                material_id: product.material_id,
                category_id: product.category_id,
            });
            setTags(product.tags || []);
            if (product.images && product.images[0]) {
                setImageFile(product.images[0]); // Handle pre-set image in edit mode
            }
        }
    }, [product, form]);

    const handleAddTag = () => {
        if (inputTag && !tags.includes(inputTag)) {
            setTags([...tags, inputTag]);
            setInputTag("");
        }
    };

    const handleRemoveTag = (removedTag) => {
        setTags(tags.filter(tag => tag !== removedTag));
    };

    const handleImageUpload = ({ file }) => {
        setImageFile(file);
    };

    const onFinish = async (values) => {
        if (tags.length === 0) {
            form.scrollToField("tags");
            return;
        }

        const finalData = {
            ...values,
            tags,
            images: imageFile ? [imageFile.name] : [],
        };

        try {
            if (product?.id) {
                await updateProduct(product.id, finalData);
            } else {
                await createProduct(finalData);
            }

            if (onSubmit) {
                onSubmit(true); // ✅ only on success
            }
        } catch (error) {
            console.error("Product save failed:", error);
            if (onSubmit) {
                onSubmit(false); // ❌ optionally notify failure
            }
        }
    };


    const formItemStyle = { fontSize: 18 };

    return (
        <div className="w-full p-6">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="w-full mx-auto"
            >
                <Row gutter={24}>
                    {/* Left Column */}
                    <Col span={11}>
                        <Form.Item name="name" label={<span style={formItemStyle}>Mahsulot nomi</span>} rules={[{ required: true }]}>
                            <Input placeholder="Nomini kiriting" style={formItemStyle} />
                        </Form.Item>

                        <Form.Item name="description" label={<span style={formItemStyle}>Tavsif</span>} rules={[{ required: true, message: 'Tavsif majburiy' }]}>
                            <TextArea rows={8} placeholder="Mahsulot tavsifi..." style={formItemStyle} />
                        </Form.Item>

                        <Form.Item name="barcode" label={<span style={formItemStyle}>Shtrix kod</span>} rules={[{ required: true, message: 'Shtrix kod majburiy' }]}>
                            <Input placeholder="Shtrix kodni kiriting" style={formItemStyle} />
                        </Form.Item>

                        <Form.Item label={<span style={formItemStyle}>Teglar</span>} required validateStatus={tags.length === 0 ? "error" : ""} help={tags.length === 0 ? "Kamida bitta teg kiritish kerak" : ""}>
                            <Space wrap>
                                {tags.map(tag => (
                                    <Tag key={tag} closable onClose={() => handleRemoveTag(tag)} style={{ fontSize: 16 }}>
                                        {tag}
                                    </Tag>
                                ))}
                                <Input
                                    placeholder="Yangi teg"
                                    value={inputTag}
                                    onChange={(e) => setInputTag(e.target.value)}
                                    onPressEnter={handleAddTag}
                                    style={{ width: 120, fontSize: 18 }}
                                />
                                <Button onClick={handleAddTag} style={formItemStyle}>Qo‘shish</Button>
                            </Space>
                        </Form.Item>
                    </Col>

                    {/* Right Column */}
                    <Col span={11} offset={2}>
                        <Form.Item label={<span style={formItemStyle}>Rasm yuklash</span>}>
                            <div className="mb-3">
                                <Image
                                    width={150}
                                    height={200}
                                    src={
                                        imageFile instanceof File
                                            ? URL.createObjectURL(imageFile)
                                            : imageFile
                                                ? `/your-api-base-path/uploads/{imageFile}` // or wherever your image URL is served from
                                                : "https://placehold.co/300x400"
                                    }
                                />
                            </div>
                            <Upload
                                beforeUpload={() => false}
                                maxCount={1}
                                onChange={handleImageUpload}
                                accept="image/*"
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />} style={formItemStyle}>Rasmni tanlang</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item name="brand_id" label={<span style={formItemStyle}>Brend</span>} rules={[{ required: true }]}>
                            <Select placeholder="Brendni tanlang" style={formItemStyle}>
                                {brands.map(brand => (
                                    <Select.Option key={brand.id} value={brand.id} style={formItemStyle}>
                                        {brand.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="material_id" label={<span style={formItemStyle}>Material</span>} rules={[{ required: true }]}>
                            <Select placeholder="Materialni tanlang" style={formItemStyle}>
                                {materials.map(material => (
                                    <Select.Option key={material.id} value={material.id} style={formItemStyle}>
                                        {material.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item name="category_id" label={<span style={formItemStyle}>Kategoriya</span>} rules={[{ required: true }]}>
                            <Select placeholder="Kategoriyani tanlang" style={formItemStyle}>
                                {categories.map(category => (
                                    <Select.Option key={category.id} value={category.id} style={formItemStyle}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="text-end  mt-6">
                    <Button type="primary" htmlType="submit" style={{ fontSize: 18, width:`300px`, height:`40px` }}>
                        Saqlash
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
