import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import {loginUser, registerUser} from "../api/auth";
import {Form, Input, Button, Card, Typography, message, Select} from "antd";
import style from "./style.module.css";
import {EyeInvisibleOutlined, EyeOutlined} from "@ant-design/icons";
import useMessage from "antd/es/message/useMessage";

const { Title } = Typography;

const LoginPage = () => {
    const [messageApi,contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [active,setActive] = useState(0);
    const { login } = useAuth();
    const navigate = useNavigate();

    const Menus = [
        {
            name: "Login",
        },
        {
            name: "Register",
        },
    ]

    const onFinishLogin = async (values) => {
        setLoading(true);
        try {
            const data = await loginUser(values.username, values.password);
            messageApi.success("Вы успешно вошли!");
            login();
            setTimeout(()=>{
                navigate("/dashboard");
            },500)
        } catch (err) {
            messageApi.error("Ошибка входа. Проверьте логин и пароль.");
        } finally {
            setLoading(false);
        }
    };

    const onFinishRegister = async (values) => {
        setLoading(true);
        try {
            const data = await registerUser(values.username, values.password);
            login();
            messageApi.success("Вы успешно вошли!");
            navigate("/dashboard");
        } catch (err) {
            messageApi.error("Ошибка входа. Проверьте логин и пароль.");
        } finally {
            setLoading(false);
        }
    };

    const LoginContent = (
        <Card data-aos="fade-up" data-aos-duration="1500" className=" bg-[#0a0a0a] border-[#0a0a0a] text-white p-6 rounded-lg shadow-lg">
            <Title level={2} className="text-start  !text-white">Login</Title>
            <Form name="login" layout="vertical" onFinish={onFinishLogin}>
                <Form.Item
                    label={<span className="text-white text-xl">Username</span>}
                    name="username"
                    rules={[{ message: "Введите логин!" }]}
                >
                    <Input
                        placeholder="Введите ваш логин"
                        className="h-14 text-xl font-thin border-white/50
                   hover:border-white/50 focus:ring-0 focus:border-white/50
                   !bg-[#0a0a0a] !text-white placeholder-white/50"
                        style={{
                            backgroundColor: "#0a0a0a",
                            color: "white",
                            borderColor: "rgba(255,255,255,0.5)"
                        }}
                    />
                </Form.Item>




                <Form.Item
                    label={<span className="text-white text-xl">Password</span>}
                    name="password"
                    rules={[{ message: "Введите пароль!" }]}
                    className="focus-within:border-white/50"
                >
                    <Input.Password
                        placeholder="Введите ваш пароль"
                        className="bg-[#0a0a0a] text-white h-14 text-xl font-thin !border-white/50
                   hover:border-white/50 focus:text-white focus:bg-[#0a0a0a]
                   focus:ring-0 focus:border-white/50 !bg-[#0a0a0a] !text-white"
                        iconRender={(visible) =>
                            visible ? (
                                <EyeOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            ) : (
                                <EyeInvisibleOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            )
                        }
                        style={{
                            color: "white",
                        }}
                    />
                </Form.Item>



                <Form.Item>
                    <Button
                        type="default"
                        htmlType="submit"
                        block
                        loading={loading}
                        className="bg-white h-14 text-xl text-[#0a0a0a] hover:bg-white hover:text-[#0a0a0a]"
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );

    const RegisterContent = (
        <Card data-aos="fade-up" data-aos-duration="1500" className=" bg-[#0a0a0a] border-[#0a0a0a] text-white p-6 rounded-lg shadow-lg">
            <Title level={2} className="text-start !text-white">Register</Title>
            <Form name="register" layout="vertical" onFinish={onFinishRegister}>
                <Form.Item
                    label={<span className="text-white text-xl">Username</span>}
                    name="username"
                    rules={[{
                        // required: true,
                        message: "Введите логин!"
                    }]}
                >
                    <Input
                        placeholder="Введите ваш логин"
                        className="h-14 text-xl font-thin border-white/50
                hover:border-white/50 focus:ring-0 focus:border-white/50
                !bg-[#0a0a0a] !text-white placeholder-white/50"
                        style={{
                            backgroundColor: "#0a0a0a",
                            color: "white",
                            borderColor: "rgba(255,255,255,0.5)"
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white text-xl">Password</span>}
                    name="password"
                    rules={[{
                        // required: true,
                        message: "Введите пароль!"
                    }]}
                    className="focus-within:border-white/50"
                >
                    <Input.Password
                        placeholder="Введите ваш пароль"
                        className="bg-[#0a0a0a] text-white h-14 text-xl font-thin !border-white/50
                hover:border-white/50 focus:text-white focus:bg-[#0a0a0a]
                focus:ring-0 focus:border-white/50 !bg-[#0a0a0a] !text-white"
                        iconRender={(visible) =>
                            visible ? (
                                <EyeOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            ) : (
                                <EyeInvisibleOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            )
                        }
                        style={{ color: "white" }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white text-xl">Confirm Password</span>}
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        {
                            // required: true,
                            message: "Подтвердите пароль!"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Пароли не совпадают!"));
                            },
                        }),
                    ]}
                    className="focus-within:border-white/50"
                >
                    <Input.Password
                        placeholder="Подтвердите ваш пароль"
                        className="bg-[#0a0a0a] text-white h-14 text-xl font-thin !border-white/50
                hover:border-white/50 focus:text-white focus:bg-[#0a0a0a]
                focus:ring-0 focus:border-white/50 !bg-[#0a0a0a] !text-white"
                        iconRender={(visible) =>
                            visible ? (
                                <EyeOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            ) : (
                                <EyeInvisibleOutlined style={{ color: "rgba(255, 255, 255, 0.5)" }} />
                            )
                        }
                        style={{ color: "white" }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="text-white text-xl">Role</span>}
                    name="role"
                    initialValue="user"
                    rules={[{
                        // required: true,
                        message: "Выберите роль!"
                    }]}
                >
                    <Select
                        className="h-14 text-xl font-thin border-white/50
                hover:border-white/50 focus:ring-0 focus:border-white/50
                !bg-[#0a0a0a] !text-white placeholder-white/50"
                        style={{
                            backgroundColor: "#0a0a0a",
                            color: "white",
                            borderColor: "rgba(255,255,255,0.5)"
                        }}
                    >
                        <Select.Option value="user">User</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="default"
                        htmlType="submit"
                        block
                        loading={loading}
                        className="bg-white h-14 text-xl text-[#0a0a0a] hover:bg-white hover:text-[#0a0a0a]"
                    >
                        Зарегистрироваться
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );

    return (
        <>
            {contextHolder}
            <div className="flex items-start justify-center min-h-screen bg-[#0a0a0a]">

                <div data-aos="fade-right" data-aos-duration="1500" className={style.imageLayer}>
                    <img className={`  absolute w-[95%] h-[95%] object-cover rounded-3xl shadow z-0`} src={"https://contents.mediadecathlon.com/p2236776/k$84a7d6b85cb3ca8b4567a654fcb31a01/men-s-golf-short-sleeved-polo-shirt-ww500-navy-blue-inesis-8667217.jpg"}/>
                    <img className={` ${active===0? `opacity-100`: `opacity-0`} duration-500 w-[95%] h-[95%] object-cover rounded-3xl shadow z-10`} src={"https://contents.mediadecathlon.com/p2241668/k$b23fb673a6add6b930f44d1a11575f35/men-s-golf-short-sleeve-polo-shirt-ww500-sky-blue-inesis-8667220.jpg?f=1920x0&format=auto"}/>
                </div>

                <div className={'w-full flex flex-col mt-24 pr-8'}>

                    <div data-aos="fade-down" data-aos-duration="1500" className={'w-full h-[60px] flex items-start relative'}>
                        <div style={{transform:`translateX(${active+`00`}%)`}} className={`w-[50%] h-full bg-white/50 absolute duration-500 `}></div>
                        {Menus.map((value, index)=>  <div onClick={()=>setActive(index)} className={active===index? style.activeSwitchLinks : style.switchLinks}>{value.name}</div>)}


                    </div>

                    {/*  There will be Login & Register content  */}
                    {
                        active===0?
                            LoginContent
                            :
                            RegisterContent
                    }

                </div>




            </div>
        </>
    );
};

export default LoginPage;
