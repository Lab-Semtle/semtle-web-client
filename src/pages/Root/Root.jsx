import axios from "axios";
import React from "react";
import style from "./Root.module.css";

import focusImage from "../../test.jpg";
import { Link } from "react-router-dom";
import Navbarboot from "../../components/Header/Navbarboot";
import Iamge from "../../resource/board.jpg";
import CommunityImage from "../../resource/community.jpg"
import MainImage from "../../resource/main.jpg"
import JoinImage from "../../resource/join.jpg"
import BookImage from "../../resource/book.jpg"

function Head(){
  return(
    <div className={style.focusImage}>
          <img src={JoinImage} alt="focus background" /> 
          <div className={style.focusText}>
            <h1>Welcome to ARCHISEMTLE</h1>
            <p>Explore, Learn, and Connect</p>
          </div>
    </div>
  );
}

function StudyBody(){
  return(
    <div className={style.cellsWrap}>
      
          <div className={style.cells}>
            <img src= {Iamge}alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText} style={{ color: 'black' }}>For Everyone</div>
            <div className={style.cellBottomText} style={{ color: 'black' }}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={CommunityImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={MainImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={BookImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>

          </div>
  )
}

function BoardBody(){
  return(
    <div className={style.cellsWrap}>
      
          <div className={style.cells}>
            <img src= {Iamge}alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText} style={{ color: 'black' }}>For Everyone</div>
            <div className={style.cellBottomText} style={{ color: 'black' }}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={CommunityImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={MainImage} alt="no image"></img>
            <div className={style.cellContent}>
            <div className={style.cellTopText}>For Everyone</div>
            <div className={style.cellBottomText}>Let your imagination run wild</div>
            </div>
          </div>
          <div className={style.cells}>
            <img src={BookImage} alt="no image"></img>
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
        <StudyBody />
      </div>
      <div className={style.contentWrap}>
        <div className={style.introduceFont}>Board</div>
        <BoardBody />
      </div>
      <Foot />
      </div>
    </>
  );
}
