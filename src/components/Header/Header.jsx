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

                    {/*<div className={style.profilePicture}>*/}
                    {/*    <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbNuHRge9Tmc_KSwgVYuElp2R30EXRlECQw&s'} alt="Profile" />*/}
                    {/*</div>*/}
                </div>
            </div>

        </>
    );
}
