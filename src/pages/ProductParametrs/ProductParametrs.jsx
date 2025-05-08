import React, {useEffect, useRef, useState} from "react";
import {FaBox, FaCheck, FaWarehouse} from "react-icons/fa";
import ProgressBar from "../../components/ProgressBar";
import ProductForm from "../../components/ProductForm";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Swiper ,SwiperSlide} from "swiper/react";
import {getCategories} from "../../api/categories";
import {getBrands} from "../../api/brands";
import {getMaterials} from "../../api/material";
import useMessage from "antd/es/message/useMessage";
import {useLocation} from "react-router-dom";
import WareHouseForm from "../../components/WareHouseForm";
import {getSeasons} from "../../api/seasons";
import {getSizes} from "../../api/sizes";




export default function ProductParametrs() {

    const location = useLocation();
    const productData = location.state?.productData;

    const swiperRef = useRef(null);
    const [message,context] = useMessage();

    const [selectedProduct,setSelectedProduct] = useState(null);

    const [confirmedProductResponse,setConfirmedProduct] = useState([]);

    const [firstForm, setFirst] = useState(false);
    const [secondForm, setSecond] = useState(false);
    const [parentHeight, setParentHeight] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [categories,setCategories] = useState([]);
    const [brands,setBrands] = useState([]);
    const [materials,setMaterials] = useState([]);
    const [seasons,setSeasons] = useState([]);
    const [sizes,setSizes] = useState([]);

    const parentRef = useRef(null); // ✅ define the ref
    const headerRef = useRef(null); // ✅ define the ref

    useEffect(() => {
        const updateHeight = () => {
            if (parentRef.current  || headerRef.current) {
                setParentHeight(parentRef.current.offsetHeight); // ✅ set height properly
                setHeaderHeight(headerRef.current.offsetHeight); // ✅ set height properly
            }
        };

        updateHeight(); // call once on mount
        window.addEventListener('resize', updateHeight); // listen on resize

        return () => window.removeEventListener('resize', updateHeight); // cleanup
    }, []);


    useEffect(()=>{
        fetchParams();
    },[])

    useEffect(()=>{
        if (productData){
            setSelectedProduct(productData)
            console.log(selectedProduct);
        }
    },[])


    const fetchParams = async () => {
        try {
            const categoryData = await getCategories(1,100);
            const brandsData = await getBrands(1,100);
            const materialsData = await getMaterials(1,100);
            const seasonsData = await getSeasons(1,100);
            const sizesData = await getSizes(1,100);
            setCategories(categoryData.data.items);
            setBrands(brandsData.data.items);
            setMaterials(materialsData.data.items);
            setSeasons(seasonsData.data.items);
            setSizes(sizesData.data.items);
        } catch (error) {
            console.log(error);
        }
    }


    function firstSubmit(value) {
        setFirst(true)
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    }


    return (
        <div ref={parentRef} className="w-full min-h-screen h-auto flex flex-col">
            {context}
            {/* Header */}
            <div ref={headerRef} className="w-full h-24 border-b px-36 gap-6 whitespace-nowrap flex items-center justify-around">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        <FaBox size={14} />
                    </div>
                    <span>Mahsulot Parametrlari</span>
                </div>

                <ProgressBar isSuccess={firstForm} />

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        <FaWarehouse size={14} />
                    </div>
                    <span>Ombor Parametrlari</span>
                </div>

                <ProgressBar isSuccess={secondForm} />

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                        <FaCheck size={14} />
                    </div>
                    <span>Mahsulot Ma'lumotlari</span>
                </div>
            </div>

            {/* Use the tracked height */}
            <div style={{ height: parentHeight - headerHeight }} className="w-full bg-gray-300">

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    spaceBetween={0}
                    slidesPerView={1}
                    className='w-full'
                    lazy={true}
                    preloadImages={false}
                    allowTouchMove={false}
                >

                <SwiperSlide>
                        <div className={'w-full h-full flex items-center justify-center p-16'}>

                            <div className={'w-full h-full bg-gray-100 shadow-xl'}>


                                <ProductForm
                                    brands={brands}
                                    materials={materials}
                                    categories={categories}
                                    product={selectedProduct} // ← null for create, object for edit
                                    onSubmit={(success) => {
                                        if (success) {
                                            message.success("Mahsulot muvaffaqiyatli saqlandi");
                                            setTimeout(()=>{
                                                firstSubmit()
                                            },200)
                                            // Optional: refresh product list, close modal, etc.
                                        } else {
                                            message.error("Mahsulotni saqlashda xatolik yuz berdi");
                                        }
                                    }}
                                />


                            </div>

                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={'w-full h-full flex items-center justify-center p-16'}>

                            <div className={'w-full h-full bg-gray-100 shadow-xl'}>


                                <WareHouseForm
                                    products={confirmedProductResponse}
                                    seasons={seasons}
                                    sizes={sizes}
                                    // onSubmit={handleSubmit}
                                    // initialValues={selectedWarehouseData} // only for edit mode
                                />


                            </div>

                        </div>
                    </SwiperSlide>

                </Swiper>

            </div>
        </div>
    );
}