import React, {useEffect, useState} from "react";
import style from "./style.module.css";
import CheckCard from "./checkCard";
import {setLoading} from "../../store/reducers/loadingSlice";
import {getOrders} from "../../api/orders";
import {getUsers} from "../../api/users";
import {getCustomers} from "../../api/customers";

export default function Workers() {

    const [users,setUsers] = useState([]);

    const [data,setData] = useState([
        {
            name : "Baxodir Ramazonov",
            phone : "+998 88 322 28 01",
            avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbNuHRge9Tmc_KSwgVYuElp2R30EXRlECQw&s'
        },
        {
            name : "Baxodir Ramazonov",
            phone : "+998 88 322 28 01",
            avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbNuHRge9Tmc_KSwgVYuElp2R30EXRlECQw&s'
        },
        {
            name : "Baxodir Ramazonov",
            phone : "+998 88 322 28 01",
            avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbNuHRge9Tmc_KSwgVYuElp2R30EXRlECQw&s'
        },
    ])

    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers = async () => {

        try {
            const usersData = await getUsers();
            setUsers(usersData?.data);
        }catch (error){
            console.log(error)
        }finally {
            // dispatch(setLoading(false));
        }
    };

    return<>
        <div className={style.container}>

            <div className={style.titleWrapper}>

                <div className={style.title}>Users</div>
                <div className={style.filter}>Tahrirlash</div>

            </div>
            {users.map((value, index)=>  <CheckCard name={value?.username} date={value?.created_at}/> )}
        </div>
    </>

}