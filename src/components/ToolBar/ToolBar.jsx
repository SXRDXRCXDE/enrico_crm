import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import logoIcon from "../../assets/icons/logoIcon.png";
import {Link} from "react-router-dom";
import {BiSolidDashboard} from "react-icons/bi";
import {IoPeople} from "react-icons/io5";
import {FaBoxOpen, FaBuilding, FaCashRegister, FaListAlt, FaRuler, FaShoppingCart, FaTasks} from "react-icons/fa";
import {IoIosNotificationsOutline} from "react-icons/io";
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineColorSwatch} from "react-icons/hi";
import {GiMaterialsScience} from "react-icons/gi";
import {WiDaySunny} from "react-icons/wi";
import {GrUserSettings} from "react-icons/gr";



export default function ToolBar() {

    const [isActive,setActive] = useState(-1);
    const [notification,setNotification] = useState(3);
    const [useless,setUseless] = useState(0);
    const location = useLocation();

    const dispatch = useDispatch();


    const Links = [
        {
            name: "Dashboard",
            icon: <BiSolidDashboard size={40} />,
            link: "/dashboard"
        },
        {
            name: "Inventory",
            icon: <FaBoxOpen size={40} />,
            link: "/inventory",
        },
        {
            name: "Customers",
            icon: <div style={{ transform: `scaleX(-1)` }}><IoPeople size={40} /></div>,
            link: "/customers"
        },
        {
            name: "Orders",
            icon: <FaShoppingCart size={40} />,
            link: "/orders",
        },
        {
            name: "Tasks",
            icon: <FaTasks size={40} />,
            link: "/tasks"
        },
        {
            name: "Cash Register", // ✅ Added Cash Register
            icon: <FaCashRegister size={40} />, // 🏦 Added icon
            link: "/cash-register",
        },
        {
            name: "Product Setting", // ✅ Added Cash Register
            icon: <GrUserSettings size={40} />, // 🏦 Added icon
            link: "/product-setting",
        },
        {
            name: "Notifications",
            icon: <IoIosNotificationsOutline size={40} />,
            link: "/notifications"
        },
    ];


    useEffect(()=>{
        switch (location.pathname){
            case '/dashboard':
                setActive(0);
                break;
            case '/inventory':
                setActive(1)
                break;
            case '/customers':
                setActive(2);
                break;
            case '/orders':
                setActive(3);
                break;
            case '/tasks':
                setActive(4);
                break;
            case '/cash-register':
                setActive(5);
                break;
            case '/product-setting':
                setActive(6);
                break;
            case '/notifications':
                setActive(7);
                break;
        }
    },[notification,location])

    return<>

        <div className={style.container}>

            <Link to={'/dashboard'}>
                <div onClick={()=>setActive(-1)} className={style.logoBar}>
                    <img onClick={()=>setNotification(3)} src={logoIcon} alt={'Enrico Cerini'}/>
                </div>
            </Link>


            <div className={style.routerLinks}>

                {
                    Links.map((value, index)=> <Link to={value.link}>
                        <div className={isActive===index? style.activelinkStyle : style.linkStyle} onClick={()=> {
                            setActive(index)
                            index===7 ? setNotification(-1) : setUseless(0)
                        }}>
                            {
                                value.icon
                            }
                            {
                                notification <0 ? `` :
                                index===7 ?  <div  className={'rounded-full bg-[#514EF3] w-2 h-2 absolute top-[22px] right-[23px]'}></div> : ``
                            }
                        </div>
                    </Link>)
                }

            </div>

        </div>
    </>
}