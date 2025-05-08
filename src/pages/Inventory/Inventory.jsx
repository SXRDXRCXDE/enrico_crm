import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import {Button, message, Table, Tooltip} from "antd";
import { deleteProduct, getProducts} from "../../api/products";
import {getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";
import {useNavigate} from "react-router-dom";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";


export default function Inventory() {

    const navigate = useNavigate()

    const [loading,setLoading] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [productsData,setProductsData] = useState([]);
    const [brandsData,setBrandsData] = useState([]);
    const [materialsData,setMaterialsData] = useState([]);

    const [messageApi,contextHolder] = message.useMessage();

    const clampWithTooltip = (text) => (
        <Tooltip title={text}>
            <div style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                maxWidth: 200
            }}>
                {text}
            </div>
        </Tooltip>
    );



    const ProductColumns = [
        {
            title: 'Rasmlar',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
                images?.length ? images.map((img, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 70,
                            height: 70,
                            marginRight: 8,
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={img || "https://placehold.co/100x100"}
                            alt={`img-${idx}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/100x100";
                            }}
                            style={{
                                width: 60,
                                height: 60,
                                objectFit: 'cover',
                                borderRadius: 4,
                            }}
                        />
                    </div>
                )) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 70, height: 70 }}>
                        <img
                            src="https://placehold.co/100x100"
                            alt="placeholder"
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                    </div>
                ),
        },
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
            render: clampWithTooltip,
        },
        {
            title: 'Shtrix kod (Barcode)',
            dataIndex: 'barcode',
            key: 'barcode',
            render: clampWithTooltip,
        },
        // {
        //     title: 'Tavsif',
        //     dataIndex: 'description',
        //     key: 'description',
        //     render: clampWithTooltip,
        // },
        // {
        //     title: 'Narx',
        //     dataIndex: 'price',
        //     key: 'price',
        //     render: (price) => price.toLocaleString() + " so'm",
        // },
        {
            title: 'Brend',
            dataIndex: 'brand_id',
            key: 'brand_id',
            render: (brand_id) => {
                const brand = brandsData.find((b) => b.id === brand_id);
                return <>{brand ? clampWithTooltip(brand.name) : "Noma'lum brend"}</>;
            }
        },
        // {
        //     title: 'Material ID',
        //     dataIndex: 'material_id',
        //     key: 'material_id',
        //     render: (material_id) => {
        //         const material = materialsData.find((b) => b.id === material_id);
        //         return <>{material ? clampWithTooltip(material.name) : "Noma'lum material"}</>;
        //     }
        // },
        {
            title: 'Teglar',
            dataIndex: 'tags',
            key: 'tags',
            render: (tags) => clampWithTooltip(tags?.join(', ') || '—'),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleEdit(record)}
                        icon={<EditOutlined />}
                        style={{ marginRight: 8, fontSize: 33, padding: `30px` }}
                    />
                    <Button
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                        style={{ marginRight: 8, fontSize: 33, padding: `30px` }}
                        danger
                    />
                </>
            ),
        },
    ];


    useEffect(()=>{

        fetchProducts();

    },[])



    const fetchProducts = async (pagination) => {
        setLoading(true);
        try {
            const products = await getProducts(pagination);
            const brands = await getBrands(1,100);
            const materials = await getMaterials(1,1000);
            setProductsData(products.data);
            setBrandsData(brands.data.items);
            setMaterialsData(materials.data.items);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        finally {
            setLoading(false);
        }
    };

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
        navigate("/inventory/layout", { state: { productData: record } });
    };


    return(
        <>
            {contextHolder}
            <div className={style.container}>

                <div className={style.contentHeader}>

                    <span className={'text-3xl font-semibold'}>Maxsulotlar haqida ma'lumotlar</span>

                    <div onClick={()=>navigate('/inventory/layout')} className={style.addButton}>Yangi qo'shish + </div>

                </div>

                <div className={style.topOfTable}>

                    <span className={'text-xl font-semibold'}>Umumiy : {productsData?.total} maxsulot</span>


                    {/*<span className={'py-2 px-4 bg-white rounded-full border text-xl font-semibold flex items-center gap-2'}>Sana bo'yicha saralash <FaAngleDown /></span>*/}

                </div>

                <div className={style.tableWrapper}>

                    <Table
                        loading={loading}
                        className={'custom-table'}
                        columns={ProductColumns}
                        dataSource={productsData?.items}
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