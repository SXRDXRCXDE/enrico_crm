import { useEffect, useState } from "react";
import { Form, InputNumber, Select, DatePicker, Button, Space } from "antd";
import { SketchPicker } from "react-color";
import dayjs from "dayjs";

export default function WareHouseForm({products, seasons, sizes, onSubmit, initialValues = null }) {
    const [form] = Form.useForm();
    const [selectedColors, setSelectedColors] = useState([]);
    const [currentColor, setCurrentColor] = useState("#000000");

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue({
                ...initialValues,
                expiration_date: dayjs(initialValues.expiration_date),
            });
            setSelectedColors(initialValues.colors || []);
        }
    }, [initialValues, form]);

    const handleAddColor = () => {
        if (!selectedColors.includes(currentColor)) {
            setSelectedColors([...selectedColors, currentColor]);
        }
    };

    const handleRemoveColor = (color) => {
        setSelectedColors(selectedColors.filter((c) => c !== color));
    };

    const onFinish = (values) => {
        const data = {
            ...values,
            expiration_date: values.expiration_date.toISOString(),
            colors: selectedColors,
        };
        onSubmit(data);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="product_id" label="Mahsulot" rules={[{ required: true }]}>
                <Select placeholder="Mahsulotni tanlang">
                    {products.map((p) => (
                        <Select.Option key={p.id} value={p.id}>
                            {p.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="cost_price" label="Tannarx" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="selling_price" label="Sotuv narxi" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="expiration_date" label="Amal qilish muddati" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} showTime />
            </Form.Item>

            <Form.Item name="quantity" label="Miqdori" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="season_id" label="Mavsum" rules={[{ required: true }]}>
                <Select placeholder="Mavsumni tanlang">
                    {seasons.map((s) => (
                        <Select.Option key={s.id} value={s.id}>
                            {s.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Ranglar">
                <SketchPicker
                    color={currentColor}
                    onChangeComplete={(color) => setCurrentColor(color.hex)}
                />
                <Button onClick={handleAddColor} style={{ marginTop: 8 }}>Qo‘shish</Button>
                <Space wrap style={{ marginTop: 12 }}>
                    {selectedColors.map((color, i) => (
                        <div key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                            <div
                                title="Click to remove"
                                style={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: color,
                                    border: '1px solid #ccc',
                                    marginRight: 8,
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleRemoveColor(color)}
                            />
                        </div>
                    ))}
                </Space>
            </Form.Item>

            <Form.Item name="sizes" label="O'lchamlar" rules={[{ required: true }]}>
                <Select mode="multiple" placeholder="O'lchamlarni tanlang">
                    {sizes.map((size) => (
                        <Select.Option key={size.id} value={size.id}>
                            {size.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {initialValues ? "Yangilash" : "Saqlash"}
                </Button>
            </Form.Item>
        </Form>
    );
}
