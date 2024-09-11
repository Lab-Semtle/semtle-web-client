import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Myinfo.module.css";
import profileImage from "../../test.jpg"
import Navbarboot from "../../components/Header/Navbarboot";
import { Apiurl } from '../../Apiurl/Apiurl';


export default function MyInfo() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [ph, setPh] = useState("");
    const [curToken, setCurToken] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.get(Apiurl.token_get);
                setCurToken(tokenResponse);
                console.log(Apiurl.token_get);
                console.log(tokenResponse.data.access_token);
                const userResponse = await axios.get(Apiurl.viewOne_get, {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.data.access_token}`
                    },
                    withCredentials: true
                });

                const userData = userResponse.data[0];
                setName(userData.user_nickname);
                setEmail(userData.user_email);
                setBirth(userData.user_birth);
                setPh(userData.user_phone);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []); // 빈 의존성 배열을 사용하여 마운트 시에만 실행

    return (
        <>
            <Navbarboot />
            <div className={style.page}>
                <aside className={style.asideLeft}>
                    <img src={profileImage} alt="no image"></img>
                </aside>
                <aside className={style.asideRight}>
                    이름 : {name} <br/>
                    생년월일 : {birth}<br/>
                    email : {email} <br/>
                    전화번호 : {ph} <br/>
                </aside>
                <section className={style.section}></section>
            </div>
        </>
    );
}