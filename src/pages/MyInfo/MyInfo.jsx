import axios from "axios";
import react, { useEffect, useState } from "react";
import style from "./MyInfo.module.css";
import profileImage from "../../test.jpg"
import Navbarboot from "../../components/Header/Navbarboot";

export default function MyInfo()
{
    return(
        <>
        <Navbarboot />
        <div className={style.page}>
        <aside className={style.asideLeft}>
            <img src ={profileImage} alt = "no image"></img>
        </aside>
        <aside className={style.asideRight}>
            이름 : {}<br/>
            나이 : {}<br/>
            학번 : {}<br/>
            생년월일 : {}<br/>
            email : {} <br/>

            
        </aside>
        <section className={style.section}></section>
        </div>
        </>
    );
}