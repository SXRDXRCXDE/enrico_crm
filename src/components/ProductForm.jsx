import { useState } from "react";
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
    Tag,
    Space,
    Row,
    Col,
    Image,
    message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createProduct } from "../api/products";
import useMessage from "antd/es/message/useMessage";

const { TextArea } = Input;

export default function ProductForm({ brands, materials, categories, onSubmit }) {
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [message,context] = useMessage();

    const handleAddTag = () => {
        const trimmed = inputTag.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setInputTag("");
        }
    };

    const handleRemoveTag = (removedTag) => {
        setTags(tags.filter((tag) => tag !== removedTag));
    };

    const handleImageUpload = ({ file }) => {
        setImageFile(file);
        return false; // Prevent default upload behavior
    };

    const onFinish = async (values) => {
        if (tags.length === 0) {
            message.error("Kamida bitta teg qo‘shing");
            return;
        }

        const finalData = {
            ...values,
            tags,
            images: imageFile ? [imageFile.name] : [],
        };

        try {
            const response = await createProduct(finalData);

            // Now that response contains status and data, we can check it properly
            if (response?.status === 200 || response?.status === 201) {
                message.success("Mahsulot yaratildi");
                onSubmit?.({ success: true, data: response.data }); // ✅ updated
            } else {
                message.error("Yaratishda xatolik yuz berdi");
                onSubmit?.({ success: false }); // optionally notify failure
            }
        } catch (error) {
            console.error("Form submission error:", error);
            message.error("Server bilan bog‘lanishda xatolik yuz berdi");
            onSubmit?.({ success: false });
        }
    };



    const formItemStyle = { fontSize: 18 };

    return (
        <div className="w-full p-6">
            {context}
            <Form form={form} layout="vertical" onFinish={onFinish} className="w-full mx-auto">
                <Row gutter={24}>
                    <Col span={11}>
                        <Form.Item
                            name="name"
                            label={<span style={formItemStyle}>Mahsulot nomi</span>}
                            rules={[{ required: true, message: "Mahsulot nomi majburiy" }]}
                        >
                            <Input placeholder="Nomini kiriting" style={formItemStyle} />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label={<span style={formItemStyle}>Tavsif</span>}
                            rules={[{ required: true, message: "Tavsif majburiy" }]}
                        >
                            <TextArea rows={8} placeholder="Mahsulot tavsifi..." style={formItemStyle} />
                        </Form.Item>

                        <Form.Item
                            name="barcode"
                            label={<span style={formItemStyle}>Shtrix kod</span>}
                            rules={[{ required: true, message: "Shtrix kod majburiy" }]}
                        >
                            <Input placeholder="Shtrix kodni kiriting" style={formItemStyle} />
                        </Form.Item>

                        <Form.Item
                            label={<span style={formItemStyle}>Teglar</span>}
                            required
                            validateStatus={tags.length === 0 ? "error" : ""}
                            help={tags.length === 0 ? "Kamida bitta teg kiritish kerak" : ""}
                        >
                            <Space wrap>
                                {tags.map((tag) => (
                                    <Tag
                                        key={tag}
                                        closable
                                        onClose={() => handleRemoveTag(tag)}
                                        style={{ fontSize: 16 }}
                                    >
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
                                <Button onClick={handleAddTag} style={formItemStyle}>
                                    Qo‘shish
                                </Button>
                            </Space>
                        </Form.Item>
                    </Col>

                    <Col span={11} offset={2}>
                        <Form.Item label={<span style={formItemStyle}>Rasm yuklash</span>}>
                            <div className="mb-3">
                                <Image
                                    width={150}
                                    height={200}
                                    src={
                                        imageFile
                                            ? URL.createObjectURL(imageFile)
                                            : "https://placehold.co/300x400"
                                    }
                                    alt="Product preview"
                                />
                            </div>
                            <Upload
                                beforeUpload={() => false}
                                maxCount={1}
                                onChange={handleImageUpload}
                                accept="image/*"
                                showUploadList={false}
                            >
                                <Button icon={<UploadOutlined />} style={formItemStyle}>
                                    Rasmni tanlang
                                </Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="brand_id"
                            label={<span style={formItemStyle}>Brend</span>}
                            rules={[{ required: true, message: "Brend majburiy" }]}
                        >
                            <Select placeholder="Brendni tanlang" style={formItemStyle}>
                                {brands.map((brand) => (
                                    <Select.Option key={brand.id} value={brand.id} style={formItemStyle}>
                                        {brand.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="material_id"
                            label={<span style={formItemStyle}>Material</span>}
                            rules={[{ required: true, message: "Material majburiy" }]}
                        >
                            <Select placeholder="Materialni tanlang" style={formItemStyle}>
                                {materials.map((material) => (
                                    <Select.Option key={material.id} value={material.id} style={formItemStyle}>
                                        {material.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="category_id"
                            label={<span style={formItemStyle}>Kategoriya</span>}
                            rules={[{ required: true, message: "Kategoriya majburiy" }]}
                        >
                            <Select placeholder="Kategoriyani tanlang" style={formItemStyle}>
                                {categories.map((category) => (
                                    <Select.Option key={category.id} value={category.id} style={formItemStyle}>
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="text-end mt-6">
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: 18, width: "300px", height: "40px" }}
                    >
                        Saqlash
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
