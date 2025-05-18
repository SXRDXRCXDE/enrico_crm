import React, { useEffect, useRef, useState } from "react";
import { FaBox, FaCheck, FaWarehouse } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import useMessage from "antd/es/message/useMessage";
import {useLocation, useNavigate} from "react-router-dom";

import ProductForm from "../../components/ProductForm";
import WareHouseForm from "../../components/WareHouseForm";
import ProgressBar from "../../components/ProgressBar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {getCategories} from "../../api/categories";
import {getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";
import {getSeasons} from "../../api/seasons";
import {getSizes} from "../../api/sizes";
import {getColors} from "../../api/colors";
import VariantsForm from "../VariantsForm/VariantsForm";

export default function ProductParametrs() {

    const [message, contextHolder] = useMessage();
    const navigate = useNavigate();

    const swiperRef = useRef(null);
    const parentRef = useRef(null);
    const headerRef = useRef(null);

    const [isFirstFormSuccess, setFirstFormSuccess] = useState(false);
    const [isSecondFormSuccess, setSecondFormSuccess] = useState(false);


    const [parentHeight, setParentHeight] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const updateHeights = () => {
            setParentHeight(parentRef.current?.offsetHeight || 0);
            setHeaderHeight(headerRef.current?.offsetHeight || 0);
        };

        updateHeights();
        window.addEventListener("resize", updateHeights);
        return () => window.removeEventListener("resize", updateHeights);
    }, []);

    useEffect(() => {
        fetchParams();
    }, []);

    const fetchParams = async () => {
        try {
            const [
                categoryData,
                brandsData,
                materialsData,
                seasonsData,
                sizesData,
                colorsData
            ] = await Promise.all([
                getCategories(1, 100),
                getBrands(1, 100),
                getMaterials(1, 100),
                getSeasons(1, 100),
                getSizes(1, 100),
                getColors(1, 1000)
            ]);

            setCategories(categoryData.data.items);
            setBrands(brandsData.data.items);
            setMaterials(materialsData.data.items);
            setSeasons(seasonsData.data.items);
            setSizes(sizesData.data.items);
            setColors(colorsData.data.items);
        } catch (error) {
            console.error("Error fetching parameters:", error);
        }
    };

    const [createdProduct, setCreatedProduct] = useState(null);

    const handleProductSubmit = ({ success, data }) => {
        if (success) {
            message.success("Mahsulot muvaffaqiyatli saqlandi");
            setFirstFormSuccess(true);
            setCreatedProduct(data); // Save product data to state
            fetchParams();

            setTimeout(() => {
                swiperRef.current?.slideNext(); // Go to next slide
            }, 400);
        } else {
            message.error("Mahsulotni saqlashda xatolik yuz berdi");
        }
    };

    // Logging createdProduct to check if the data is updated
    useEffect(() => {
        console.log('Created product:', createdProduct); // Example of logging a specific property
    }, [createdProduct]);



    const [createdInventory, setCreatedInventory] = useState([]);

    const handleWareHouseSubmit = (newInventory) => {
        if (newInventory) {
            message.success("Ombor ma'lumotlari saqlandi");
            setCreatedInventory((prev) => [...prev, newInventory]);
            setSecondFormSuccess(true);
            setTimeout(() => {
                swiperRef.current?.slideNext(); // Go to next slide
            }, 400);
            // Optional: go to summary or dashboard
        } else {
            message.error("Ombor ma'lumotlarini saqlashda xatolik yuz berdi");
        }
    };


    // Logging createdProduct to check if the data is updated
    useEffect(() => {
        console.log('Created inventory:', createdInventory); // Example of logging a specific property
    }, [createdInventory]);

    return (
        <div ref={parentRef} className="w-full min-h-screen flex flex-col">
            {contextHolder}

            {/* Header Progress */}
            <div ref={headerRef} className="w-full h-24 border-b px-36 gap-6 flex items-center justify-around">
                <Step icon={<FaBox size={14} />} label="Mahsulot Parametrlari" />
                <ProgressBar isSuccess={isFirstFormSuccess} />
                <Step icon={<FaWarehouse size={14} />} label="Ombor Parametrlari" />
                <ProgressBar isSuccess={isSecondFormSuccess} />
                <Step icon={<FaCheck size={14} />} label="Mahsulot Ma'lumotlari" />
            </div>

            {/* Swiper Steps */}
            <div style={{ height: parentHeight - headerHeight }} className="w-full bg-gray-300">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={0}
                    slidesPerView={1}
                    className="w-full"
                    allowTouchMove={false}
                    preloadImages={false}
                    lazy
                >
                    {/* Product Form Slide */}
                    <SwiperSlide>
                        <SlideContainer>
                            <ProductForm
                                brands={brands}
                                materials={materials}
                                categories={categories}
                                onSubmit={handleProductSubmit}
                            />
                        </SlideContainer>
                    </SwiperSlide>

                    {/* Warehouse Form Slide */}
                    <SwiperSlide>
                        <SlideContainer>
                            {createdProduct ? (  // Only render if createdProduct is available
                                <WareHouseForm
                                    initialValues={createdProduct?.data}
                                    seasons={seasons}
                                    sizes={sizes}
                                    colors={colors}
                                    onSubmit={handleWareHouseSubmit}
                                />
                            ) : (
                                <div>Loading...</div>  // Loading state or fallback if createdProduct is not ready
                            )}
                        </SlideContainer>
                    </SwiperSlide>
                    <SwiperSlide>
                        <SlideContainer>
                            {createdInventory ? (  // Only render if createdProduct is available
                                <VariantsForm
                                    inventory_id={createdInventory[0]?.data.inventory_id}
                                    variants={createdInventory[0]?.data.variants}
                                    colors={colors}
                                    sizes={sizes}
                                    onSubmit={(finalVariants) => {
                                        console.log("Final result:", finalVariants);
                                        setTimeout(()=>{
                                            navigate(`/inventory`)
                                        },2000)
                                        // post to API or store
                                    }}
                                />
                            ) : (
                                <div>Loading...</div>  // Loading state or fallback if createdProduct is not ready
                            )}
                        </SlideContainer>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
}

const Step = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
            {icon}
        </div>
        <span>{label}</span>
    </div>
);

const SlideContainer = ({ children }) => (
    <div className="w-full h-full flex items-center justify-center p-16">
        <div className="w-full h-full bg-gray-100 rounded-xl shadow-xl">{children}</div>
    </div>
);
