import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import { GoPlus } from "react-icons/go";
import profilePicture from "../../assets/icons/profilePicture.jpg";
import {Modal, Input, Select, Button} from "antd";
import {getCustomers, postCustomer} from "../../api/customers";
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {createBrand, getBrands} from "../../api/brands";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, toggleLoading} from "../../store/reducers/loadingSlice";
import {createColor, getColors} from "../../api/colors";
import {getSizes, postSize} from "../../api/sizes";
import {createMaterial, getMaterials} from "../../api/material";
import {createSeason} from "../../api/seasons";
import {createCategory} from "../../api/categories";
import {createProduct, getProducts} from "../../api/products";
import {createOrder} from "../../api/orders";
import {getUsers} from "../../api/users";

export default function Header({ title }) {

    const location = useLocation();
    const [messageApi,contextHolder] = useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector((state)=> state.loading.loading);


    const [customerFormData, setCustomerFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        extra_info: ""
    });
    const [brandFormData, setBrandFormData] = useState({
        name: "",
        description: "",
    });
    const [colorFormData, setColorFormData] = useState({
        name: "",
        description: "",
        hex_code: "",
        rgb_code: "",
    });
    const [sizeFormData, setSizeFormData] = useState({
        name: "",
        description: "",
    });
    const [materialFormData, setMaterialFormData] = useState({
        name: "",
        description: "",
    });
    const [seasonFormData, setSeasonFormData] = useState({
        name: "",
        description: "",
    });
    const [categoryFormData, setCategoryFormData] = useState({
        name: "",
        description: "",
    });

    const [productFormData, setProductFormData] = useState({
        name: "",
        barcode: "",
        description: "",
        price: 0,
        brand_id: null,
        material_id: null,
        images: [],
        tags: []
    });
    const [brand,setBrand] = useState([]);
    const [material,setMaterial] = useState([]);
    const [users,setUsers] = useState([]);
    const [customers,setCustomers] = useState([]);
    const [products,setProducts] = useState([]);

    const [orderFormData,setOrderFormData] = useState([]);


    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const formHandlers = {
            "/customers": setCustomerFormData,
            "/brands": setBrandFormData,
            "/colors": setColorFormData,
            "/sizes": setSizeFormData,
            "/materials": setMaterialFormData,
            "/seasons": setSeasonFormData,
            "/categories": setCategoryFormData,
            "/products": setProductFormData,
            "/orders": setOrderFormData,
        };

        if (formHandlers[location.pathname]) {
            formHandlers[location.pathname]((prevData) => ({ ...prevData, [name]: value }));
        }
    };


    const handleOk = () => {
        const formActions = {
            "/customers": () => postCustomer(customerFormData),
            "/brands": () => createBrand(brandFormData),
            "/colors": () => createColor(colorFormData),
            "/sizes": () => postSize(sizeFormData),
            "/materials": () => createMaterial(materialFormData),
            "/seasons": () => createSeason(seasonFormData),
            "/categories": () => createCategory(categoryFormData),
            "/products": () => createProduct(productFormData),
            "/orders": () => createOrder(orderFormData),
        };

        if (formActions[location.pathname]) {
            formActions[location.pathname]();
            messageApi.success(` 🔥 ${location.pathname.slice(1)} added successfully!`);
            setIsModalOpen(false);
            dispatch(toggleLoading());
        }
    };

    useEffect(() => {
        fetchBrandMaterial();
    }, [dispatch]);


    const fetchBrandMaterial = async () => {
        dispatch(setLoading(true));
        try {
            const brand = await getBrands();
            const material = await getMaterials();
            const users = await getUsers();
            const customers = await getCustomers();
            const products = await getProducts();
            setProducts(products.data)
            setUsers(users.data);
            setCustomers(customers.data);
            setBrand(brand.data);
            setMaterial(material.data)
        }catch (error){
            console.log(error)
        }finally {
            dispatch(setLoading(false));
        }
    };

    const handleItemChange = (index, field, value) => {
        setOrderFormData((prev) => {
            const newItems = Array.isArray(prev.order_items) ? [...prev.order_items] : [];
            newItems[index] = { ...newItems[index], [field]: value };

            // Recalculate total amount
            const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return { ...prev, order_items: newItems, total_amount: totalAmount };
        });
    };


    const addOrderItem = () => {
        setOrderFormData((prev) => ({
            ...prev,
            order_items: Array.isArray(prev.order_items)
                ? [...prev.order_items, { product_id: null, quantity: 1, price: 0 }]
                : [{ product_id: null, quantity: 1, price: 0 }]
        }));
    };


    const removeOrderItem = (index) => {
        setOrderFormData((prev) => {
            const newItems = Array.isArray(prev.order_items) ? prev.order_items.filter((_, i) => i !== index) : [];

            // Recalculate total amount
            const totalAmount = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            return { ...prev, order_items: newItems, total_amount: totalAmount };
        });
    };


    return (
        <>
            {contextHolder}
            <div className={style.container}>
                <div className={style.leftBar}>
                    <div className={style.mainLink}>{title}</div>
                </div>

                <div className={style.rightBar}>
                    <button onClick={() => setIsModalOpen(true)} className={style.addButton}>
                        <span className="text-[14px]">Yangi qo'shish</span>
                        <div className="text-xl">
                            <GoPlus />
                        </div>
                    </button>

                    <div className={style.profilePicture}>
                        <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbNuHRge9Tmc_KSwgVYuElp2R30EXRlECQw&s'} alt="Profile" />
                    </div>
                </div>
            </div>

            {/* Ant Design Modal */}

            {/*Customer Form data*/}
            {
                location.pathname==="/customers" ? <Modal
                    title="Yangi Mijoz Qo'shish"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={() => setIsModalOpen(false)}
                    okText="Saqlash"
                    cancelText="Bekor qilish"
                >
                    <div className="mb-3">
                        <label>Ism</label>
                        <Input name="name" onChange={handleChange} placeholder="Ism kiriting" />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>
                        <Input type="email" name="email"  onChange={handleChange} placeholder="Email kiriting" />
                    </div>

                    <div className="mb-3">
                        <label>Telefon</label>
                        <Input name="phone"  onChange={handleChange} placeholder="Telefon raqami" />
                    </div>

                    <div className="mb-3">
                        <label>Manzil</label>
                        <Input name="address"  onChange={handleChange} placeholder="Manzil kiriting" />
                    </div>

                    <div className="mb-3">
                        <label>Qo'shimcha Ma'lumot</label>
                        <Input.TextArea name="extraInfo"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                    </div>
                </Modal>
                    :
                    ""
            }

            {/*Brands Form data */}
            {
                location.pathname==="/brands" ? <Modal
                        title="Yangi Brand Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Ism</label>
                            <Input name="name"  onChange={handleChange} placeholder="Brand nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Brand haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>
                    </Modal>
                    :
                    ""
            }

            {/*Colors Form data */}
            {
                location.pathname==="/colors" ? <Modal
                        title="Yangi Rang Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Nomi</label>
                            <Input name="name"  onChange={handleChange} placeholder="Brand nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Rang haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>

                        <div className="mb-3">
                            <label>HEX Code</label>
                            <Input name="hex_code"  onChange={handleChange} placeholder="hex codi " />
                        </div>

                        <div className="mb-3">
                            <label>RGB Code</label>
                            <Input name="rgb_code"  onChange={handleChange} placeholder="rgb codi" />
                        </div>
                    </Modal>
                    :
                    ""
            }

            {/*Sizes Form data */}
            {
                location.pathname==="/sizes" ? <Modal
                        title="Yangi Razmer Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Nomi</label>
                            <Input name="name"  onChange={handleChange} placeholder="Razmer nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Razmer haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>

                    </Modal>
                    :
                    ""
            }

            {/*Material Form data */}
            {
                location.pathname==="/materials" ? <Modal
                        title="Yangi Material Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Nomi</label>
                            <Input name="name"  onChange={handleChange} placeholder="Material nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Material haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>

                    </Modal>
                    :
                    ""
            }

            {/*Season Form data */}
            {
                location.pathname==="/seasons" ? <Modal
                        title="Yangi Mavsum Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Nomi</label>
                            <Input name="name" onChange={handleChange} placeholder="Mavsum nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Mavsum haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description"  onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>

                    </Modal>
                    :
                    ""
            }

            {
                location.pathname === "/categories" ? (
                    /* ✅ Add Categories Form here */
                    <Modal
                        title="Yangi Kategoriya Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        <div className="mb-3">
                            <label>Ism</label>
                            <Input name="name" onChange={handleChange} placeholder="Kategoriya nomi" />
                        </div>

                        <div className="mb-3">
                            <label>Kategoriya haqida qisqacha ma'lumot</label>
                            <Input.TextArea name="description" onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>
                    </Modal>
                ) : null
            }

            {/* Product Form Modal */}
            {
                location.pathname === "/products" ? (
                    <Modal
                        title="Yangi Mahsulot Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        {/* Product Name */}
                        <div className="mb-3">
                            <label>Nomi</label>
                            <Input name="name" onChange={handleChange} placeholder="Mahsulot nomi" />
                        </div>

                        {/* Barcode */}
                        <div className="mb-3">
                            <label>Shtrix Kod</label>
                            <Input name="barcode" onChange={handleChange} placeholder="Mahsulot shtrix kodi" />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label>Mahsulot haqida ma'lumot</label>
                            <Input.TextArea name="description" onChange={handleChange} placeholder="Qo'shimcha ma'lumot yozing" />
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                            <label>Narxi</label>
                            <Input name="price" type="number" onChange={handleChange} placeholder="Narxini kiriting" />
                        </div>

                        {/* Brand Selection */}
                        <div className="mb-3">
                            <label>Brend</label>
                            <Select
                                name="brand_id"
                                onChange={(value) => handleChange({ target: { name: "brand_id", value } })}
                                placeholder="Brendni tanlang"
                            >
                                {brand?.map((brand) => (
                                    <Select.Option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        {/* Material Selection */}
                        <div className="mb-3">
                            <label>Material</label>
                            <Select name="material_id" onChange={(value) => handleChange({ target: { name: "material_id", value } })} placeholder="Materialni tanlang">
                                {material?.map((material) => (
                                    <Select.Option key={material.id} value={material.id}>
                                        {material.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        {/* Images */}
                        <div className="mb-3">
                            <label>Mahsulot Rasmlari (URL)</label>
                            <Input name="images" onChange={handleChange} placeholder="Rasm URL kiriting" />
                        </div>

                        {/* Tags */}
                        <div className="mb-3">
                            <label>Mahsulot Teglari</label>
                            <Input name="tags" onChange={handleChange} placeholder="Teglarni vergul bilan ajrating" />
                        </div>
                    </Modal>
                ) : null
            }

            {
                location.pathname === "/orders" ? (
                    <Modal
                        title="Yangi Buyurtma Qo'shish"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Saqlash"
                        cancelText="Bekor qilish"
                    >
                        {/* User Selection */}
                        <div className="mb-3">
                            <label>Foydalanuvchi</label>
                            <Select
                                name="user_id"
                                value={orderFormData.user_id}
                                onChange={(value) => setOrderFormData((prev) => ({ ...prev, user_id: value }))}
                                placeholder="Foydalanuvchini tanlang"
                            >
                                {users?.map((user) => (
                                    <Select.Option key={user.id} value={user.id}>
                                        {user.username}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        {/* Customer Selection */}
                        <div className="mb-3">
                            <label>Mijoz</label>
                            <Select
                                name="customer_id"
                                value={orderFormData.customer_id}
                                onChange={(value) => setOrderFormData((prev) => ({ ...prev, customer_id: value }))}
                                placeholder="Mijozni tanlang"
                            >
                                {customers?.map((customer) => (
                                    <Select.Option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>

                        {/* Order Status */}
                        <div className="mb-3">
                            <label>Buyurtma Holati</label>
                            <Select
                                name="status"
                                value={orderFormData.status}
                                onChange={(value) => setOrderFormData((prev) => ({ ...prev, status: value }))}
                                placeholder="Holatni tanlang"
                            >
                                <Select.Option value="pending">Kutilmoqda</Select.Option>
                                <Select.Option value="confirmed">Tasdiqlangan</Select.Option>
                                <Select.Option value="shipped">Yetkazilgan</Select.Option>
                                <Select.Option value="cancelled">Bekor qilingan</Select.Option>
                            </Select>
                        </div>

                        {/* Order Items */}
                        <div className="mb-3">
                            <label>Mahsulotlar</label>
                            {orderFormData.order_items?.map((item, index) => (
                                <div key={index} className="order-item flex gap-2 items-center">
                                    <Select
                                        value={item.product_id}
                                        onChange={(value) => handleItemChange(index, "product_id", value)}
                                        placeholder="Mahsulotni tanlang"
                                        className="w-1/3"
                                    >
                                        {products?.map((product) => (
                                            <Select.Option key={product.id} value={product.id}>
                                                {product.name}
                                            </Select.Option>
                                        ))}
                                    </Select>

                                    {/* Quantity (Soni) */}
                                    <div className="flex flex-col w-1/4">
                                        <label className="text-xs text-gray-500">Soni</label>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                                            placeholder="Miqdor"
                                        />
                                    </div>

                                    {/* Price per unit (Narxi donaga) */}
                                    <div className="flex flex-col w-1/4">
                                        <label className="text-xs text-gray-500">Narxi (donaga)</label>
                                        <Input
                                            type="number"
                                            value={item.price}
                                            onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                                            placeholder="Narxi so'm"
                                        />
                                    </div>

                                    <Button type="link" danger onClick={() => removeOrderItem(index)}>❌</Button>
                                </div>
                            ))}
                            <Button type="dashed" onClick={addOrderItem}>+ Mahsulot qo'shish</Button>
                        </div>


                        {/* Total Amount (Auto Calculated) */}
                        <div className="mb-3">
                            <label>Umumiy Narx</label>
                            <Input value={orderFormData.total_amount} disabled />
                        </div>
                    </Modal>
                ) : null
            }

        </>
    );
}
