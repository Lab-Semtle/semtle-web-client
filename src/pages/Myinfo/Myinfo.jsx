import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Myinfo.module.css";
import Navbarboot from "../../components/Header/Navbarboot";
import { Apiurl } from '../../Apiurl/Apiurl';

export default function MyInfo() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [ph, setPh] = useState("");
    const [curToken, setCurToken] = useState("");
    const [isEditing, setIsEditing] = useState(false); // 수정 모드
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");
    const [updatedBirth, setUpdatedBirth] = useState("");
    const [updatedPh, setUpdatedPh] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokenResponse = await axios.get(Apiurl.token_get);
                setCurToken(tokenResponse);
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
                // 수정 값 초기화
                setUpdatedName(userData.user_nickname);
                setUpdatedEmail(userData.user_email);
                setUpdatedBirth(userData.user_birth);
                setUpdatedPh(userData.user_phone);
            } catch (error) {
                window.location.href = "/Login";
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            await axios.post(Apiurl.updateUser, {
                user_nickname: updatedName,
                user_email: updatedEmail,
                user_birth: updatedBirth,
                user_phone: updatedPh
            }, {
                headers: {
                    Authorization: `Bearer ${curToken.data.access_token}`
                },
                withCredentials: true
            });

            // 수정 후 정보 업데이트
            setName(updatedName);
            setEmail(updatedEmail);
            setBirth(updatedBirth);
            setPh(updatedPh);
            setIsEditing(false); // 수정 모드 종료
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    return (
        <>
            <Navbarboot />

            <div className={style.container}>
                <h2>내 정보</h2>
                {!isEditing ? (
                    <div className={style.infoBox}>
                        <div>이름: {name}</div>
                        <div>생년월일: {birth}</div>
                        <div>Email: {email}</div>
                        <div>전화번호: {ph}</div>
                        <button onClick={() => setIsEditing(true)} className={style.editButton}>수정하기</button>
                    </div>
                ) : (
                    <div className={style.infoBox}>
                        <label>이름:</label>
                        <input
                            type="text"
                            value={updatedName}
                            onChange={(e) => setUpdatedName(e.target.value)}
                        />
                        <label>생년월일:</label>
                        <input
                            type="text"
                            value={updatedBirth}
                            onChange={(e) => setUpdatedBirth(e.target.value)}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={updatedEmail}
                            onChange={(e) => setUpdatedEmail(e.target.value)}
                        />
                        <label>전화번호:</label>
                        <input
                            type="text"
                            value={updatedPh}
                            onChange={(e) => setUpdatedPh(e.target.value)}
                        />
                        <button onClick={handleUpdate} className={style.saveButton}>저장하기</button>
                        <button onClick={() => setIsEditing(false)} className={style.cancelButton}>취소</button>
                    </div>
                )}
            </div>
        </>
    );
}