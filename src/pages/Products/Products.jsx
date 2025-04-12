import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {FaAngleDown} from "react-icons/fa";
import {Button, Input, message, Modal, Select, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {createProduct, deleteProduct, getProducts, updateProduct} from "../../api/products";
import {MdCancel} from "react-icons/md";
import {getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";


export default function Products() {

    const [loading,setLoading] = useState(false);
    const [isModalOpen,setModalOpen] = useState(false);
    const [isEditModalOpen,setEditModalOpen] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [productsData,setProductsData] = useState([]);
    const [brandsData,setBrandsData] = useState([]);
    const [materialsData,setMaterialsData] = useState([]);

    const [productsQuantity,setProductsQuantity] = useState(0);

    const [messageApi,contextHolder] = message.useMessage();

    const [editForm, setEditForm] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        barcode: '',
        description: '',
        price: 0,
        brand_id: 0,
        material_id: 0,
        images: [''],
        tags: ['']
    });

    const ProductColumns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Shtrix kod (Barcode)',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Tavsif',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Narx',
            dataIndex: 'price',
            key: 'price',
            render: (price) => price.toLocaleString() + " so'm", // Format price nicely
        },
        {
            title: 'Brend',
            dataIndex: 'brand_id',
            key: 'brand_id',
            render: (brand_id) => {
                const brand = brandsData.find((b) => b.id === brand_id);
                return <>{brand ? brand.name : "Noma'lum brend"}</>;
            }
        },
        {
            title: 'Material ID',
            dataIndex: 'material_id',
            key: 'material_id',
            render: (material_id) => {
                const material = materialsData.find((b) => b.id === material_id);
                return <>{material ? material.name : "Noma'lum material"}</>;
            }
        },
        {
            title: 'Rasmlar',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
                images?.length ? images.map((img, idx) => (
                    <img key={idx} src={img} alt={`img-${idx}`} style={{ width: 40, marginRight: 8 }} />
                )) : '—',
        },
        {
            title: 'Teglar',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags) => tags?.length ? tags.join(', ') : '—',
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
        },
    ];


    const handleDelete = async (id) => {
        setLoading(true);
        try {
            // Perform the delete operation based on the active tab
            deleteProduct(id)

            messageApi.success("Muvaffaqiyatli o'chirildi!");
            setCurrentPage(1);

            // Refresh the data
            fetchProducts({ current: 1, pageSize: 10 });
        } catch (err) {
            console.error(err);
            messageApi.error("O'chirishda xatolik yuz berdi!");
        }
        finally {
            setLoading(false);
        }
    };

    const handleEdit = (record) => {
        setEditForm(record);
        setEditModalOpen(true);
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: name === "price" || name === "brand_id" || name === "material_id"
                ? Number(value)
                : value,
        }));
    };


    const handleEditOk = async () => {
        setLoading(true);
        try {
            await updateProduct(editForm.id, editForm); // Make sure `editForm.id` exists
            messageApi.success("Mahsulot muvaffaqiyatli yangilandi!");
            setEditModalOpen(false);
            setEditForm({
                name: "",
                barcode: "",
                description: "",
                price: 0,
                brand_id: 0,
                material_id: 0,
                images: [],
                tags: [],
            });
            await fetchProducts(); // Refresh product list if you have this function
        } catch (error) {
            console.error("Xatolik:", error);
            messageApi.error("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };


    const EditModal = (
        <Modal
            open={isEditModalOpen}
            onCancel={() => setEditModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Mahsulotni tahrirlash</div>}
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
            {[
                { label: "Nomi", name: "name", type: "input", placeholder: "Mahsulot nomini kiriting" },
                { label: "Shtrix kodi", name: "barcode", type: "input", placeholder: "Shtrix kodini kiriting" },
                { label: "Tavsifi", name: "description", type: "textarea", placeholder: "Mahsulot tavsifini kiriting" },
                { label: "Narxi", name: "price", type: "input", placeholder: "Narxini kiriting" },
                {
                    label: "Brend", name: "brand_id", type: "select", placeholder: "Brend tanlang",
                    options: brandsData.map((brand) => ({ label: brand.name, value: brand.id })),
                },
                {
                    label: "Material", name: "material_id", type: "select", placeholder: "Material tanlang",
                    options: materialsData.map((material) => ({ label: material.name, value: material.id })),
                },
                { label: "Rasmlar", name: "images", type: "input", placeholder: "Rasm URL larini kiriting (vergul bilan ajrating)" },
                { label: "Teglar", name: "tags", type: "input", placeholder: "Teglarni kiriting (vergul bilan ajrating)" }
            ].map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.label}</label>
                    {field.type === "input" ? (
                        <Input
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleEditChange}
                            value={Array.isArray(editForm[field.name])
                                ? editForm[field.name].join(", ")
                                : editForm[field.name] ?? ""}
                        />
                    ) : field.type === "textarea" ? (
                        <Input.TextArea
                            className="h-28 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleEditChange}
                            value={editForm[field.name] ?? ""}
                        />
                    ) : field.type === "select" ? (
                        <Select
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={(value) => handleEditChange({ target: { name: field.name, value } })}
                            value={editForm[field.name]}
                        >
                            {field.options.map((option) => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    ) : null}
                </div>
            ))}
        </Modal>
    );



    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const handleOk = async () => {
        setLoading(true);
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                brand_id: Number(formData.brand_id),
                material_id: Number(formData.material_id),
                images: formData.images ? formData.images.split(',').map(item => item.trim()) : [],
                tags: formData.tags ? formData.tags.split(',').map(item => item.trim()) : [],
            };

            await createProduct(payload);
            messageApi.success("Mahsulot muvaffaqiyatli qo‘shildi!");
            setModalOpen(false);
            setFormData({
                name: '',
                barcode: '',
                description: '',
                price: 0,
                brand_id: 0,
                material_id: 0,
                images: [],
                tags: []
            });
            await fetchProducts(); // if you have this function to reload product list
        } catch (error) {
            console.error("Xatolik:", error);
            messageApi.error("Xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };



    const AddModal = (
        <Modal
            open={isModalOpen}
            onCancel={() => setModalOpen(false)}
            width="50%"
            title={<div className="text-4xl font-semibold text-[#514EF3]">Yangi mahsulot qo'shish</div>}
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
            {[
                { label: 'Nomi', name: 'name', type: 'input', placeholder: 'Mahsulot nomini kiriting' },
                { label: 'Shtrix kodi', name: 'barcode', type: 'input', placeholder: 'Barcode kiriting' },
                { label: 'Tavsif', name: 'description', type: 'textarea', placeholder: 'Mahsulot tavsifi' },
                { label: 'Narxi', name: 'price', type: 'input', placeholder: 'Narx kiriting' },
                {
                    label: 'Brend', name: 'brand_id', type: 'select', placeholder: 'Brend tanlang',
                    options: brandsData.map((brand) => ({ label: brand.name, value: brand.id })),
                },
                {
                    label: 'Material', name: 'material_id', type: 'select', placeholder: 'Material tanlang',
                    options: materialsData.map((material) => ({ label: material.name, value: material.id })),
                },
                { label: 'Rasmlar (URL)', name: 'images', type: 'input', placeholder: 'Rasmlar (vergul bilan ajrating)' },
                { label: 'Teglar', name: 'tags', type: 'input', placeholder: 'Teglar (vergul bilan ajrating)' },
            ].map((field, idx) => (
                <div key={idx} className="mb-6 mt-6 text-2xl font-semibold">
                    <label>{field.label}</label>
                    {field.type === 'input' ? (
                        <Input
                            className="h-12 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    ) : field.type === 'textarea' ? (
                        <Input.TextArea
                            className="h-28 mt-3 text-2xl"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                        />
                    ) : field.type === 'select' ? (
                        <Select
                            className="h-12 mt-3 text-2xl w-40 ml-4"
                            name={field.name}
                            placeholder={field.placeholder}
                            onChange={(value) => handleChange({ target: { name: field.name, value } })}
                            value={formData[field.name]}
                        >
                            {field.options.map((option) => (
                                <Select.Option key={option.value} value={option.value}>
                                    {option.label}
                                </Select.Option>
                            ))}
                        </Select>
                    ) : null}
                </div>
            ))}
        </Modal>
    );




    useEffect(()=>{

        fetchProducts();

    },[])



    const fetchProducts = async (pagination) => {
        setLoading(true);
        try {
            const products = await getProducts(pagination);
            const brands = await getBrands(1,100);
            const materials = await getMaterials(1,1000);
            // const allCustomers = await getCustomers(1,1000);
            console.log(brands)
            setProductsData(products.data);
            setBrandsData(brands.data);
            setMaterialsData(materials.data);
            // setCustomersQuantity(allCustomers.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        finally {
            setLoading(false);
        }
    };


    return(
        <>
            {contextHolder}
            {EditModal}
            {AddModal}
            <div className={style.container}>

                <div className={style.contentHeader}>

                    <span className={'text-3xl font-semibold'}>Maxsulotlar haqida ma'lumotlar</span>

                    <div onClick={()=>setModalOpen(true)} className={style.addButton}>Yangi qo'shish + </div>

                </div>

                <div className={style.topOfTable}>

                    <span className={'text-xl font-semibold'}>Umumiy : {productsQuantity?.length} maxsulot</span>


                    <span className={'py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2'}>Sana bo'yicha saralash <FaAngleDown />

                    </span>

                </div>

                <div className={style.tableWrapper}>

                    <Table
                        loading={loading}
                        className={'custom-table'}
                        columns={ProductColumns}
                        dataSource={productsData}
                        sticky scroll={{y:580}}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,       // Number of items per page
                            total: 5 * 10,      // Total items (10 pages * 10 items)
                            showSizeChanger: false, // Disable page size change
                        }}
                        onChange={(pagination) => {
                            setCurrentPage(pagination.current); // Update current page
                            fetchProducts(pagination.current);
                        }}
                    />

                </div>

            </div>
        </>
    )


}