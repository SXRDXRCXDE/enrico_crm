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



export default function ToolBar() {

    const [isActive,setActive] = useState(-1);
    const [notification,setNotification] = useState(3);
    const [useless,setUseless] = useState(0);
    const location = useLocation();

    const dispatch = useDispatch();
    const editActive = useSelector((state)=> state.edit.editActive);


    const Links = [
        {
            name: "Dashboard",
            icon: <BiSolidDashboard />,
            link: "/dashboard"
        },
        {
            name: "Customers",
            icon: <div style={{ transform: `scaleX(-1)` }}><IoPeople /></div>,
            link: "/customers"
        },
        {
            name: "Tasks",
            icon: <FaTasks />,
            link: "/tasks"
        },
        {
            name: "Notifications",
            icon: <IoIosNotificationsOutline />,
            link: "/notifications"
        },
        {
            name: "Brands",
            icon: <FaBuilding />,
            link: "/brands"
        },
        {
            name: "Colors",
            icon: <HiOutlineColorSwatch />,
            link: "/colors",
        },
        {
            name: "Sizes",
            icon: <FaRuler />,
            link: "/sizes",
        },
        {
            name: "Materials",
            icon: <GiMaterialsScience />,
            link: "/materials",
        },
        {
            name: "Seasons",
            icon: <WiDaySunny />,
            link: "/seasons",
        },
        {
            name: "Categories",
            icon: <FaListAlt />,
            link: "/categories",
        },
        {
            name: "Products",
            icon: <FaBoxOpen />,
            link: "/products",
        },
        {
            name: "Orders",
            icon: <FaShoppingCart />,
            link: "/orders",
        },
        {
            name: "Cash Register", // ✅ Added Cash Register
            icon: <FaCashRegister />, // 🏦 Added icon
            link: "/cash-register",
        }
    ];


    useEffect(()=>{
        switch (location.pathname){
            case '/customers':
                setActive(1);
                break;
            case '/dashboard':
                setActive(0);
                break;
            case '/tasks':
                setActive(2)
                break;
            case '/notifications':
                setActive(3);
                break;
            case '/brands':
                setActive(4);
                break;
            case '/colors':
                setActive(5);
                break;
            case '/sizes':
                setActive(6);
                break;
            case '/materials':
                setActive(7);
                break;
            case '/seasons':
                setActive(8);
                break;
            case '/categories':
                setActive(9);
                break;
            case '/products':
                setActive(10);
                break;
            case '/orders':
                setActive(11);
                break;
            case '/cash-register':
                setActive(12);
                break;
        }
    },[notification,location])

    return<>

        <div className={ editActive? style.hiddenContainer : style.container}>

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
                            index===3 ? setNotification(-1) : setUseless(0)
                        }}>
                            {
                                value.icon
                            }
                            {
                                notification <0 ? `` :
                                index===3 ?  <div  className={'rounded-full bg-[#514EF3] w-2 h-2 absolute top-[22px] right-[23px]'}></div> : ``
                            }
                        </div>
                    </Link>)
                }

            </div>

        </div>
    </>
}