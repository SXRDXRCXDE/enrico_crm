import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { FaAngleDown } from "react-icons/fa";
import { message, Table, Modal, Input, Select, Button } from "antd";
import { MdCancel } from "react-icons/md";

export default function Tasks() {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksData, setTasksData] = useState([]);
    const [tasksQuantity, setTasksQuantity] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const handleRowSelectionChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };


    const [formData, setFormData] = useState({
        date: "",
        deadline: "",
        task_title: "",
        status: "",
    });

    const [editFormData, setEditFormData] = useState({
        date: "",
        deadline: "",
        task_title: "",
        status: "",
    });

    // Columns for the table
    const TasksColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (date) => (date ? new Date(date).toLocaleDateString("uz-UZ") : "N/A"),
        },
        {
            title: "Deadline",
            dataIndex: "deadline",
            key: "deadline",
            render: (deadline) => {
                const isOverdue = deadline && new Date(deadline) < new Date();
                const formatted = deadline ? new Date(deadline).toLocaleDateString("uz-UZ") : "N/A";
                return (
                    <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
        {formatted}
      </span>
                );
            },
        },
        {
            title: "Task Title",
            dataIndex: "task_title",
            key: "task_title",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => <span className={`status-${status.toLowerCase()}`}>{status}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button onClick={() => handleEditClick(record)} type="primary">Edit</Button>
                    <Button onClick={() => deleteTask(record.key)} danger>Delete</Button>
                </div>
            ),
        },
    ];


    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const tasksWithKeys = storedTasks.map((task, index) => ({
            ...task,
            key: `${index}-${task.task_title}`,
        }));
        setTasksData(tasksWithKeys);
        setTasksQuantity(tasksWithKeys.length);
    }, []);


    const deleteTask = (taskKey) => {
        const updatedTasks = tasksData.filter((task) => task.key !== taskKey);
        setTasksData(updatedTasks);
        setTasksQuantity(updatedTasks.length);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        messageApi.success("Task deleted successfully!");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveTask = () => {
        const { date, deadline, task_title, status } = formData;

        if (!date || !deadline || !task_title || !status) {
            message.error("Please fill all fields!");
            return;
        }

        const newTask = {
            date,
            deadline,
            task_title,
            status,
        };

        // Save task to localStorage
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));

        // Update tasksData and close modal
        setTasksData(storedTasks);
        setTasksQuantity(storedTasks.length);
        setFormData({
            date: "",
            deadline: "",
            task_title: "",
            status: "",
        });
        setModalOpen(false);
        message.success("Task added successfully!");
    };

    const handleEditClick = (task) => {
        // Open edit modal and populate the fields with the task data
        setEditFormData(task);
        setEditModalOpen(true);
    };

    const handleEditSave = () => {
        const { date, deadline, task_title, status } = editFormData;

        if (!date || !deadline || !task_title || !status) {
            message.error("Please fill all fields!");
            return;
        }

        // Update the task in the localStorage
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = storedTasks.map((task) =>
            task.date === editFormData.date ? { ...task, date, deadline, task_title, status } : task
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        // Update tasksData and close the modal
        setTasksData(updatedTasks);
        setTasksQuantity(updatedTasks.length);
        setEditModalOpen(false);
        message.success("Task updated successfully!");
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.contentHeader}>
                    <span className={"text-3xl font-semibold"}>Topshiriqlar haqida ma'lumotlar</span>
                    <div onClick={() => setModalOpen(true)} className={style.addButton}>
                        Yangi qo'shish +
                    </div>
                </div>

                <div className={style.topOfTable}>
                    <span className={"text-xl font-semibold"}>Umumiy : {tasksQuantity} topshiriq</span>
                    <span className={"py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2"}>
            Sana bo'yicha saralash <FaAngleDown />
          </span>
                </div>

                <div className={style.tableWrapper}>
                    <Table
                        loading={loading}
                        className="custom-table"
                        columns={TasksColumns}
                        dataSource={tasksData}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: handleRowSelectionChange,
                        }}
                        rowClassName={(record) =>
                            selectedRowKeys.includes(record.key) ? "line-through bg-gray-100" : ""
                        }
                        sticky
                        scroll={{ y: 630 }}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,
                            total: tasksQuantity,
                            showSizeChanger: false,
                        }}
                        onChange={(pagination) => {
                            setCurrentPage(pagination.current);
                        }}
                    />

                </div>
            </div>

            {/* Add Task Modal */}
            <Modal
                open={isModalOpen}
                onCancel={() => setModalOpen(false)}
                width="50%"
                title={<div className="text-4xl font-semibold text-[#514EF3]">Add New Task</div>}
                closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
                footer={[
                    <button
                        key="cancel"
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleSaveTask}
                        className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                    >
                        Save
                    </button>,
                ]}
            >
                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Date</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Deadline</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Task Title</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        name="task_title"
                        value={formData.task_title}
                        onChange={handleInputChange}
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Status</label>
                    <Select
                        className="h-12 mt-3 text-2xl w-full"
                        name="status"
                        value={formData.status}
                        onChange={(value) => setFormData({ ...formData, status: value })}
                    >
                        <Select.Option value="Pending">Pending</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                    </Select>
                </div>
            </Modal>

            {/* Edit Task Modal */}
            <Modal
                open={isEditModalOpen}
                onCancel={() => setEditModalOpen(false)}
                width="50%"
                title={<div className="text-4xl font-semibold text-[#514EF3]">Edit Task</div>}
                closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
                footer={[
                    <button
                        key="cancel"
                        onClick={() => setEditModalOpen(false)}
                        className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                    >
                        Cancel
                    </button>,
                    <button
                        key="submit"
                        onClick={handleEditSave}
                        className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                    >
                        Save
                    </button>,
                ]}
            >
                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Date</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        type="date"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditInputChange}
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Deadline</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        type="date"
                        name="deadline"
                        value={editFormData.deadline}
                        onChange={handleEditInputChange}
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Task Title</label>
                    <Input
                        className="h-12 mt-3 text-2xl"
                        name="task_title"
                        value={editFormData.task_title}
                        onChange={handleEditInputChange}
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-6 mt-6 text-2xl font-semibold">
                    <label>Status</label>
                    <Select
                        className="h-12 mt-3 text-2xl w-full"
                        name="status"
                        value={editFormData.status}
                        onChange={(value) => setEditFormData({ ...editFormData, status: value })}
                    >
                        <Select.Option value="Pending">Pending</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                    </Select>
                </div>
            </Modal>
        </>
    );
}
