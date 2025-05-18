import { useEffect } from "react";
import { Form, InputNumber, DatePicker, Select, Button, Table, message } from "antd";
import dayjs from "dayjs";
import { postInventoryVariant } from "../../api/inventory";
import useMessage from "antd/es/message/useMessage";

export default function VariantsForm({ inventory_id,variants = [], colors, sizes, onSubmit }) {
    const [message,context] = useMessage();
    const [form] = Form.useForm();

    useEffect(() => {
        const initialData = variants.map(v => ({
            ...v,
            expiration_date: v.expiration_date ? dayjs(v.expiration_date) : null
        }));
        form.setFieldsValue({ variants: initialData });
    }, [variants, form]);

    const handleFinish = async (values) => {
        const formatted = values.variants.map(v => ({
            inventory_id: inventory_id,
            color_id: v.color_id,
            size_id: v.size_id,
            quantity: v.quantity,
            cost_price: v.cost_price,
            selling_price: v.selling_price,
            expiration_date: v.expiration_date ? v.expiration_date.toISOString() : null
        }));

        try {
            const res = await postInventoryVariant(formatted);
            message.success("Variantlar muvaffaqiyatli saqlandi");
            onSubmit(res);
        } catch (error) {
            console.error("Saqlashda xatolik:", error);
            message.error("Variantlarni saqlashda xatolik yuz berdi");
        }
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            {context}
            <Form.List name="variants">
                {(fields) => {
                    const columns = [
                        {
                            title: "Rang",
                            dataIndex: "color_id",
                            render: (_, __, index) => (
                                <Form.Item
                                    name={[fields[index].name, 'color_id']}
                                    rules={[{ required: true, message: 'Rangni tanlang' }]}
                                >
                                    <Select placeholder="Tanlang">
                                        {colors.map(c => (
                                            <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )
                        },
                        {
                            title: "O'lcham",
                            dataIndex: "size_id",
                            render: (_, __, index) => (
                                <Form.Item
                                    name={[fields[index].name, 'size_id']}
                                    rules={[{ required: true, message: 'O\'lchamni tanlang' }]}
                                >
                                    <Select placeholder="Tanlang">
                                        {sizes.map(s => (
                                            <Select.Option key={s.id} value={s.id}>{s.name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )
                        },
                        {
                            title: "Tannarx",
                            dataIndex: "cost_price",
                            render: (_, __, index) => (
                                <Form.Item
                                    name={[fields[index].name, 'cost_price']}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            )
                        },
                        {
                            title: "Sotuv narxi",
                            dataIndex: "selling_price",
                            render: (_, __, index) => (
                                <Form.Item
                                    name={[fields[index].name, 'selling_price']}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            )
                        },
                        {
                            title: "Miqdor",
                            dataIndex: "quantity",
                            render: (_, __, index) => (
                                <Form.Item
                                    name={[fields[index].name, 'quantity']}
                                    rules={[{ required: true }]}
                                >
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                            )
                        },
                        {
                            title: "Muddati",
                            dataIndex: "expiration_date",
                            render: (_, __, index) => (
                                <Form.Item name={[fields[index].name, 'expiration_date']}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            )
                        }
                    ];

                    const dataSource = fields.map(field => ({ key: field.key }));

                    return (
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                            scroll={{ y: 550 }}
                        />
                    );
                }}
            </Form.List>

            <Button type="primary" htmlType="submit" style={{ marginTop: 16, marginBottom: 16 }}>
                Saqlash
            </Button>
        </Form>
    );
}
