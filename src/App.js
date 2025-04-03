import './App.css';
import ToolBar from "./components/ToolBar/ToolBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Customers from "./pages/Customers/Customers";
import Tasks from "./pages/Tasks/Tasks";
import Brands from "./pages/Brands/Brands";
import Colors from "./pages/Colors/Colors";
import Sizes from "./pages/Sizes/Sizes";
import Materials from "./pages/Materials/Materials";
import Seasons from "./pages/Seasons/Seasons";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import Orders from "./pages/Orders/Orders";
import LoginPage from "./LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import {useEffect} from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import CashRegister from "./pages/CashRegister/CashRegister";

function App() {
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
                    <div className="h-full">
                        <ToolBar />
                    </div>

                    {/* Контент */}
                    <div className="w-full h-full overflow-hidden flex flex-col items-start">
                        <div className="content_body">
                            <Routes>
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/customers" element={<Customers />} />
                                    <Route path="/brands" element={<Brands />} />
                                    <Route path="/colors" element={<Colors />} />
                                    <Route path="/sizes" element={<Sizes />} />
                                    <Route path="/materials" element={<Materials />} />
                                    <Route path="/seasons" element={<Seasons />} />
                                    <Route path="/categories" element={<Categories />} />
                                    <Route path="/products" element={<Products />} />
                                    <Route path="/orders" element={<Orders />} />
                                    <Route path="/cash-register" element={<CashRegister />} />
                                    <Route path="/tasks" element={<Tasks />} />
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
