import { useEffect, useState } from "react";
import { Form, InputNumber, Select, DatePicker, Button, Row, Col } from "antd";
import dayjs from "dayjs";
import { createInventory, updateInventory } from "../api/inventory";

export default function WareHouseForm({
                                          products,
                                          seasons,
                                          sizes,
                                          colors,
                                          onSubmit,
                                          initialValues = null,
                                      }) {
    const [form] = Form.useForm();
    const [selectedColors, setSelectedColors] = useState([]);

    const formItemStyle = { fontSize: 18 };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                expiration_date: dayjs(initialValues.expiration_date),
            });
            setSelectedColors(initialValues.colors || []);
        }
    }, [initialValues, form]);

    const onFinish = async (values) => {
        const data = {
            ...values,
            expiration_date: values.expiration_date.toISOString(),
            colors: selectedColors,
        };

        try {
            if (initialValues?.id) {
                await updateInventory(initialValues.id, data);
            } else {
                await createInventory(data);
            }
            onSubmit();
        } catch (err) {
            console.error("Inventory submit error:", err);
        }
    };

    return (
        <div className="w-full px-16 py-20">
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Row gutter={16}>
                    <Col span={9} offset={1}>
                        <Form.Item
                            name="product_id"
                            label={<span style={formItemStyle}>Mahsulot</span>}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder={<span style={formItemStyle}>Mahsulotni tanlang</span>}
                            >
                                {products.map((p) => (
                                    <Select.Option key={p.id} value={p.id}>
                                        <span style={formItemStyle}>{p.name}</span>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="cost_price"
                            label={<span style={formItemStyle}>Tannarx</span>}
                            rules={[{ required: true }]}
                        >
                            <InputNumber style={{ width: "100%", fontSize: 18 }} />
                        </Form.Item>

                        <Form.Item
                            name="selling_price"
                            label={<span style={formItemStyle}>Sotuv narxi</span>}
                            rules={[{ required: true }]}
                        >
                            <InputNumber style={{ width: "100%", fontSize: 18 }} />
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            label={<span style={formItemStyle}>Miqdori</span>}
                            rules={[{ required: true }]}
                        >
                            <InputNumber style={{ width: "100%", fontSize: 18 }} />
                        </Form.Item>

                        <Form.Item
                            name="season_id"
                            label={<span style={formItemStyle}>Mavsum</span>}
                            rules={[{ required: true }]}
                        >
                            <Select
                                placeholder={<span style={formItemStyle}>Mavsumni tanlang</span>}
                            >
                                {seasons.map((s) => (
                                    <Select.Option key={s.id} value={s.id}>
                                        <span style={formItemStyle}>{s.name}</span>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={10} offset={2}>
                        <Form.Item
                            name="expiration_date"
                            label={<span style={formItemStyle}>Amal qilish muddati</span>}
                            rules={[{ required: true }]}
                        >
                            <DatePicker
                                style={{ width: "100%", fontSize: 18 }}
                                showTime
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={formItemStyle}>Ranglar</span>}
                        >
                            <Select
                                mode="multiple"
                                value={selectedColors}
                                onChange={(newColors) => setSelectedColors(newColors)}
                                placeholder={<span style={formItemStyle}>Ranglarni tanlang</span>}
                            >
                                {colors.map((color) => (
                                    <Select.Option key={color.id} value={color.id}>
                                        <span style={formItemStyle}>{color.name}</span>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="sizes"
                            label={<span style={formItemStyle}>O'lchamlar</span>}
                            rules={[{ required: true }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder={<span style={formItemStyle}>O'lchamlarni tanlang</span>}
                            >
                                {sizes.map((size) => (
                                    <Select.Option key={size.id} value={size.id}>
                                        <span style={formItemStyle}>{size.name}</span>
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%", fontSize: 18 , marginTop:`50px`}}
                            >
                                {initialValues ? "Yangilash" : "Saqlash"}
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
