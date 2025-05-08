import './App.css';
import ToolBar from "./components/ToolBar/ToolBar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import LoginPage from "./LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import CashRegister from "./pages/CashRegister/CashRegister";
import ProductSetting from "./pages/ProductSetting/ProductSetting";
import Customers from "./pages/Customers/Customers";
import Inventory from "./pages/Inventory/Inventory";
import Orders from "./pages/Orders/Orders";
import { useSelector } from "react-redux";
import Payments from "./pages/Payments/Payments";
import { useAuth } from './AuthContext/AuthContext';
import ProductParametrs from "./pages/ProductParametrs/ProductParametrs";

function App() {
    const { isAuthenticated } = useAuth(); // Get authentication state from context
    const paymentActive = useSelector((state) => state.payment.paymentActive);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
        if (isAuthenticated && location.pathname === '/') {
            // If authenticated and the user is on the login page, navigate to /dashboard
            navigate('/dashboard');
        }
    }, [isAuthenticated, location.pathname, navigate]);

    return (
        <div className="App">
            {!isAuthenticated ? ( // Show login page if not authenticated
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            ) : ( // Show protected routes if authenticated
                <div className="w-full h-screen overflow-hidden bg-[#F6FAFDE5] flex items-start">
                    {/* Sidebar */}
                    {paymentActive ? (
                        ""
                    ) : (
                        <div className="h-full">
                            <ToolBar />
                        </div>
                    )}

                    {/* Content */}
                    <div className="w-full h-full  overflow-hidden flex flex-col items-start">
                        <div className="content_body">
                            <Routes>
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/inventory" element={<Inventory />} />
                                    <Route path="/inventory/layout" element={<ProductParametrs />} />
                                    <Route path="/customers" element={<Customers />} />
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
