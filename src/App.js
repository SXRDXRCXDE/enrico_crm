import './App.css';
import ToolBar from "./components/ToolBar/ToolBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import LoginPage from "./LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {useEffect} from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import CashRegister from "./pages/CashRegister/CashRegister";
import ProductSetting from "./pages/ProductSetting/ProductSetting";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import {useSelector} from "react-redux";
import Payments from "./pages/Payments/Payments";

function App() {

    const paymentActive = useSelector((state) => state.payment.paymentActive);
    const location = useLocation();
    const isLoginPage = location.pathname === "/"; // Проверяем, на странице логина или нет

    useEffect(()=>{
        AOS.init();
    },[])

    return (
        <div className="App">
            {isLoginPage ? (
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            ) : (
                <div className="w-full h-screen overflow-hidden bg-[#F6FAFDE5] flex items-start">
                    {/* Боковая панель */}
                    {
                        paymentActive ? (
                                ""
                            )
                            : (
                        <div className="h-full">
                        <ToolBar />
                        </div>
                            )
                    }

                    {/* Контент */}
                    <div className="w-full h-full overflow-hidden flex flex-col items-start">
                        <div className="content_body">
                            <Routes>
                                <Route element={<ProtectedRoute  />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/customers" element={<Customers />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/orders" element={<Orders />} />
                                    <Route path="/cash-register" element={<CashRegister />} />
                                    <Route path="/product-setting" element={<ProductSetting />} />
                                    <Route path="/tasks" element={<Tasks />} />
                                    <Route path="/payments" element={<Payments />} />
                                </Route>
                            </Routes>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
