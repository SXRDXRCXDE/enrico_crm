import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import { LuBookA } from "react-icons/lu";
import { FaListAlt, FaRuler } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { GiMaterialsScience } from "react-icons/gi";
import { WiDaySunny } from "react-icons/wi";
import {IoAddCircleOutline, IoCloseSharp} from "react-icons/io5";
import {Button, Input, message, Modal, Table} from "antd"; // Importing Ant Design Table
import "antd/dist/reset.css";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {createBrand, deleteBrand, getBrands, updateBrand} from "../../api/brands";
import {deleteSize, getSizes, postSize, updateSize} from "../../api/sizes";
import {createColor, deleteColor, getColors, updateColor} from "../../api/colors";
import {createMaterial, deleteMaterial, getMaterials, updateMaterial} from "../../api/material";
import {createCategory, deleteCategory, getCategories, updateCategory} from "../../api/categories";
import {createSeason, deleteSeason, getSeasons, updateSeason} from "../../api/seasons";
import {MdCancel} from "react-icons/md";


export default function ProductSetting() {

    const [messageApi,contextHolder] = message.useMessage()

    const [activeTab, setTabActive] = useState(0);
    const [isModalOpen,setModalOpen] = useState(false);
    const [isEditModalOpen,setEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Track current page for pagination

    const [brandsData,setBrandsData] = useState([]);
    const [sizesData,setSizesData] = useState([]);
    const [colorsData,setColorsData] = useState([]);
    const [materialsData,setMaterialsData] = useState([]);
    const [categoriesData,setCategoriesData] = useState([]);
    const [seasonsData,setSeasonsData] = useState([]);

    const [editForm, setEditForm] = useState({});

    const [loading,setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        hex_code: '', // Only for Color
        rgb_code: '', // Only for Color
    });

    const Tabmenu = [
        { name: 'Brend', icon: <LuBookA /> },
        { name: `O'lcham`, icon: <FaRuler /> },
        { name: 'Rang', icon: <HiOutlineColorSwatch /> },
        { name: 'Material', icon: <GiMaterialsScience /> },
        { name: 'Kategoriya', icon: <FaListAlt /> },
        { name: 'Mavsum', icon: <WiDaySunny /> },
    ];

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            // Perform the delete operation based on the active tab
            switch (activeTab) {
                case 0: await deleteBrand(id); break;
                case 1: await deleteSize(id); break;
                case 2: await deleteColor(id); break;
                case 3: await deleteMaterial(id); break;
                case 4: await deleteCategory(id); break;
                case 5: await deleteSeason(id); break;
                default: return;
            }

            messageApi.success("Muvaffaqiyatli o'chirildi!");
            setCurrentPage(1)
            // Refresh the data based on the current tab and pagination state
            fetchDataByTab({ current: 1, pageSize: 10 }); // For example, reset to page 1 with 10 items per page
        } catch (err) {
            console.error(err);
            messageApi.error("O'chirishda xatolik yuz berdi!");
        }
        finally {
            setLoading(false);
        }
    };



    // columns for brands table
    const BrandColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of brand",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];

    const SizeColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of Size",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];

    const ColorColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of color",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "HEX code",
            dataIndex: "hex_code",
            key: "hex_code",
        },
        {
            title: "RGB code",
            dataIndex: "rgb_code",
            key: "rgb_code",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];

    const MaterialColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of material",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];

    const CategoryColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of category",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];

    const SeasonColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name of Season",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)} // Edit button logic
                        icon={<EditOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }} // Add spacing
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8 ,fontSize:33,padding:`30px` }}
                        danger
                    />
                </>
            ),
        }

    ];


    useEffect(() => {
        fetchDataByTab(1); // page 1 by default
    }, [activeTab]);


    const fetchDataByTab = (pagination) => {
        switch (activeTab) {
            case 0: fetchBrands(pagination); break;
            case 1: fetchSizes(pagination); break;
            case 2: fetchColors(pagination); break;
            case 3: fetchMaterials(pagination); break;
            case 4: fetchCategories(pagination); break;
            case 5: fetchSeasons(pagination); break;
            default: break;
        }
    };



    const fetchBrands = async (pagination) => {
        setLoading(true);
        try {
            const brands = await getBrands(pagination);
            setBrandsData(brands.data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchSizes = async (pagination) => {
        setLoading(true);
        try {
            const sizes = await getSizes(pagination);
            setSizesData(sizes.data);
        } catch (error) {
            console.error("Error fetching sizes:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchColors = async (pagination) => {
        setLoading(true);
        try {
            const colors = await getColors(pagination);
            setColorsData(colors.data);
        } catch (error) {
            console.error("Error fetching colors:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchMaterials = async (pagination) => {
        setLoading(true);
        try {
            const materials = await getMaterials(pagination);
            setMaterialsData(materials.data);
        } catch (error) {
            console.error("Error fetching materials:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchCategories = async (pagination) => {
        setLoading(true);
        try {
            const categories = await getCategories(pagination);
            setCategoriesData(categories.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const fetchSeasons = async (pagination) => {
        setLoading(true);
        try {
            const seasons = await getSeasons(pagination);
            setSeasonsData(seasons.data);
        } catch (error) {
            console.error("Error fetching seasons:", error);
        }
        finally {
            setLoading(false);
        }
    };





    const getColumns = () => {
        switch (activeTab) {
            case 0: return BrandColumns;
            case 1: return SizeColumns;
            case 2: return ColorColumns;
            case 3: return MaterialColumns;
            case 4: return CategoryColumns;
            case 5: return SeasonColumns;
            default: return [];
        }
    };

    const getAllData = () => {
        switch (activeTab) {
            case 0: return brandsData;
            case 1: return sizesData;
            case 2: return colorsData;
            case 3: return materialsData;
            case 4: return categoriesData;
            case 5: return seasonsData;
            default : return '';
        }
    }

    const modalConfigs = [
        {
            title: "Yangi Brand Qo'shish",
            fields: [
                { label: "Name of brand", name: "name", type: "input", placeholder: "Brand nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "Brand haqida ma'lumot" },
            ],
        },
        {
            title: "Yangi O'lcham Qo'shish",
            fields: [
                { label: "Name of Size", name: "name", type: "input", placeholder: "O'lcham nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "O'lcham haqida ma'lumot" },
            ],
        },
        {
            title: "Yangi Rang Qo'shish",
            fields: [
                { label: "Name of Color", name: "name", type: "input", placeholder: "Rang nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "Rang haqida ma'lumot" },
                { label: "HEX Code", name: "hex_code", type: "input", placeholder: "HEX kod" },
                { label: "RGB Code", name: "rgb_code", type: "input", placeholder: "RGB kod" },
            ],
        },
        {
            title: "Yangi Material Qo'shish",
            fields: [
                { label: "Name of Material", name: "name", type: "input", placeholder: "Material nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "Material haqida ma'lumot" },
            ],
        },
        {
            title: "Yangi Kategoriya Qo'shish",
            fields: [
                { label: "Name of Category", name: "name", type: "input", placeholder: "Kategoriya nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "Kategoriya haqida ma'lumot" },
            ],
        },
        {
            title: "Yangi Mavsum Qo'shish",
            fields: [
                { label: "Name of Season", name: "name", type: "input", placeholder: "Mavsum nomi" },
                { label: "Description", name: "description", type: "textarea", placeholder: "Mavsum haqida ma'lumot" },
            ],
        },
    ];



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            switch (activeTab) {
                case 0:
                    await createBrand(formData);
                    break;
                case 1:
                    await postSize(formData);
                    break;
                case 2:
                    await createColor(formData);
                    break;
                case 3:
                    await createMaterial(formData);
                    break;
                case 4:
                    await createCategory(formData);
                    break;
                case 5:
                    await createSeason(formData);
                    break;
                default:
                    break;
            }

            messageApi.success("Muvaffaqiyatli qo'shildi!");
            setModalOpen(false);

            // Refresh current tab’s data
            fetchDataByTab(1);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error occurred while submitting:", error);
            messageApi.error("Xatolik!");
        } finally {
            // Reset form and loading state
            setFormData({
                name: '',
                description: '',
                hex_code: '',
                rgb_code: '',
            });
            setLoading(false);
        }
    };



    const currentConfig = modalConfigs[activeTab];

    const AddModal = (
        <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">{currentConfig.title}</div>}
            closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
            footer={[
                <button
                    key="cancel"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                >
                    Bekor qilish
                </button>,
                <button
                    key="submit"
                    onClick={handleOk}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                >
                    Saqlash
                </button>,
            ]}
        >
            {currentConfig.fields.map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.label}</label>
                    {field.type === "input" ? (
                        <Input
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    ) : (
                        <Input.TextArea
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
        </Modal>
    );


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditOk = async () => {
        setLoading(true);
        try {
            switch (activeTab) {
                case 0: await updateBrand(editForm.id, editForm); break;
                case 1: await updateSize(editForm.id, editForm); break;
                case 2: await updateColor(editForm.id, editForm); break;
                case 3: await updateMaterial(editForm.id, editForm); break;
                case 4: await updateCategory(editForm.id, editForm); break;
                case 5: await updateSeason(editForm.id, editForm); break;
                default: break;
            }

            messageApi.success("Muvaffaqiyatli tahrirlandi!");
            setEditModalOpen(false);
            setCurrentPage(1); // Reset to first page
            fetchDataByTab(1); // Only refresh current tab data
        } catch (err) {
            console.error(err);
            messageApi.error("Xatolik yuz berdi!");
        }
        finally {
            setLoading(false);
        }
    };


    const handleEdit = (record) => {
        setEditForm(record);
        setEditModalOpen(true);
    };



    const EditModal = (
        <Modal
            open={isEditModalOpen}
            onCancel={() => setEditModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">{currentConfig.title}ni tahrirlash</div>}
            closeIcon={<MdCancel className="text-[45px] hover:text-red-700" />}
            footer={[
                <button
                    key="cancel"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 mr-6 border-2 border-black/30 hover:shadow text-gray-700 hover:bg-gray-300"
                >
                    Bekor qilish
                </button>,
                <button
                    key="submit"
                    onClick={handleEditOk}
                    className="px-4 py-2 text-xl font-semibold rounded-full duration-500 bg-[#514EF3] text-white hover:bg-[#514EF3]/90"
                >
                    Saqlash
                </button>,
            ]}
        >
            {currentConfig.fields.map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.label}</label>
                    {field.type === "input" ? (
                        <Input
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleEditChange}
                            value={editForm[field.name] || ''}
                        />
                    ) : (
                        <Input.TextArea
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleEditChange}
                            value={editForm[field.name] || ''}
                        />
                    )}
                </div>
            ))}
        </Modal>
    );



    function handleTabChange(index) {
        setTabActive(index);
        setCurrentPage(1);
        fetchDataByTab(index, 1); // Call only the API for that tab
    }


    const handleSave = (updatedRecord) => {
        // Implement save logic here (update the record in the state or make an API call)
        console.log("Saved Record:", updatedRecord);
        setModalOpen(false); // Close modal after saving
    };

    return (
        <>
            {contextHolder}
            <div className="w-full h-screen overflow-hidden">
                {AddModal}
                {EditModal}
                <div className={style.container}>
                    {/* Header */}
                    <div className={style.header}>
                        <div className={style.leftBar}>
                            <span className="text-3xl font-semibold">Product Settings</span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className={style.tabHeader}>
                        <div className={style.topTab}>
                            {Tabmenu.map((value, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleTabChange(index)}
                                    className={`${activeTab === index ? `text-white` : ``} cursor-pointer duration-500 z-10 w-48 h-full flex items-center justify-center text-center text-3xl gap-2`}
                                >
                                    {value.icon}
                                    <span className="text-2xl font-semibold">{value.name}</span>
                                </div>
                            ))}
                            <div
                                style={{ transform: `translateX(${activeTab * 100}%)` }}
                                className="w-48 h-full absolute top-0 left-0 rounded-xl bg-[#514EF3] duration-500"
                            ></div>

                            {/* Add button */}
                            <div onClick={()=>setModalOpen(true)} className={style.addButton}>
                                Qo'shish <IoAddCircleOutline size={30} />
                            </div>
                        </div>

                    </div>

                    {/* Table */}
                    <div className="w-full h-[720px] px-6 rounded-xl overflow-auto">
                        <Table
                            loading={loading}
                            className={'custom-table'}
                            columns={getColumns()}
                            dataSource={getAllData()}
                            sticky scroll={{y:570}}
                            pagination={{
                                current: currentPage,
                                pageSize: 10,       // Number of items per page
                                total: 5 * 10,      // Total items (10 pages * 10 items)
                                showSizeChanger: false, // Disable page size change
                            }}
                            onChange={(pagination) => {
                                setCurrentPage(pagination.current); // Update current page
                                fetchDataByTab(pagination.current);
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
