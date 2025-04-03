import React, { useState } from "react";
import { Table, Button, Modal, DatePicker, Input } from "antd";
import style from "./style.module.css";
import Header from "../../components/Header/Header";

export default function Tasks() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const showModal = (task) => {
        setSelectedTask(task);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTask(null);
    };

    const columns = [
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
        },
        {
            title: "Task",
            dataIndex: "task",
            key: "task",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => <Button type="primary" onClick={() => showModal(record)}>Edit</Button>,
        },
    ];

    const data = [
        {
            key: "1",
            status: "Late",
            dueDate: "2025-03-20",
            task: "Complete project report",
        },
        {
            key: "2",
            status: "Success",
            dueDate: "2025-03-18",
            task: "Submit assignment",
        },
        {
            key: "3",
            status: "Not Checked",
            dueDate: "2025-03-22",
            task: "Review team progress",
        },
    ];

    return (
        <div className={style.container}>

            <div className={'w-full'}>
                <Header title={'Mijozlar haqida ma’lumotlar'}/>
            </div>

            <h2>Total: 23 tasks</h2>
            <Table columns={columns} dataSource={data} pagination={false} />

            {/* Edit Task Modal */}
            <Modal
                title="Tahrirlash"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div className={'flex flex-col gap-y-3 text-[16px]'}>

                    <p className={'font-bold'}>Is this completed?</p>
                    <DatePicker className={style.datePicker} placeholder="Marked day" style={{ width: "100%" }} />
                    <p className={'font-bold'}>Is this completed?</p>
                    <Input.TextArea rows={2} placeholder="Information" className={style.inputArea} />
                    <div className={style.modalFooter}>
                        <Button type="text" style={{ color: "red" }}>Delete</Button>
                        <Button type="primary" style={{ backgroundColor: "#514EF3", borderColor: "#514EF3" }}>Done</Button>
                    </div>

                </div>

            </Modal>
        </div>
    );
}
