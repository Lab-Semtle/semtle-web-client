import axios from "axios";
import React from "react";
import style from "./Root.module.css";

import focusImage from "../../test.jpg";
import { Link } from "react-router-dom";
import Navbarboot from "../../components/Header/Navbarboot";

function Head(){
  return(
    <div className={style.focusImage}>
          <img src={focusImage} alt="focus background" /> 
          <div className={style.focusText}>
            <h1>Welcome to ARCHISEMTLE</h1>
            <p>Explore, Learn, and Connect</p>
          </div>
    </div>
  );
}

function Body(){
  return(
    <div className={style.cellsWrap}>
      
          <div className={style.cells}>
            <img src={focusImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={focusImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={focusImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={focusImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>

          </div>
  )
}

function Foot(){
  return (
    <>
    <div className={style.footer}>
          <div className={style.footerContentBox}>
            <div className={style.footerLeft} onClick={() => window.location.href = '/Agree'}>개인정보 처리방침</div>
          </div>
          <div className={style.footerContentBox}>
          <div className={style.footerRight}>Archisemtle © 2024</div>
          </div>
        </div>
          <div className={style.footerContentBox}>
          <div className={style.footerLeft2}>부산광역시 영도구 태종로 727 공대 1관 387호 PHP : 000-0000-0000</div>
          </div>
    </>
        
  )
}

export default function Root() {
  return (
    <>
      <Navbarboot />
      <div className={style.maincontent}>
        <Head />
      <div className={style.contentWrap}>
        <div className={style.introduceFont}>Study</div>
        <Body />
      </div>
      <div className={style.contentWrap}>
        <div className={style.introduceFont}>Board</div>
        <Body />
      </div>
      <Foot />
      </div>
    </>
  );
}
