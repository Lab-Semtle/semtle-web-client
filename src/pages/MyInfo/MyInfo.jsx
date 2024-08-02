import axios from "axios";
import react, { useEffect, useState } from "react";
import style from "./MyInfo.module.css";
import profileImage from "../../test.jpg"
import Navbarboot from "../../components/Header/Navbarboot";

export default function MyInfo()
{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("")
    const [ph, setPh] = useState("")
    
    useEffect(()=>
    {
        
        axios.get('http://localhost:8000/api/v1/user/test1', {
            headers: {
              Authorization: `Bearer ${document.cookie.split(';')[0].split('access_token=')[1]}`
            },
            withCredentials: true  // 중요한 부분
          })
        .then(response =>{
            console.log(response.data[0])
            setName(response.data[0].user_id)
            setEmail(response.data[0].user_email)
            setBirth(response.data[0].user_birth)
            setPh(response.data[0].user_phone)
        })
        .catch(error=>{
        })
    })

    return(
        <>
        <Navbarboot />
        <div className={style.page}>
        <aside className={style.asideLeft}>
            <img src ={profileImage} alt = "no image"></img>
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