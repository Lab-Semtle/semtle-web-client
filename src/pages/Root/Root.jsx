import axios from "axios";
import React from "react";
import style from "./Root.module.css";
import {Link} from "react-router-dom";
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

function StudyBody() {
  return (
    <div className={style.cellsWrap}>
      <Card link="/BoardList" imageSrc={Iamge} title="자유게시판" subtitle="지금 바로 시작" />
      <Card link="/BoardList" imageSrc={CommunityImage} title="For Everyone" subtitle="Let your imagination run wild" />
      <Card link="/BoardList" imageSrc={MainImage} title="For Everyone" subtitle="Let your imagination run wild" />
      <Card imageSrc={BookImage} title="For Everyone" subtitle="Let your imagination run wild" />
    </div>
  );
}

// 카드 컴포넌트 생성
function Card({ link, imageSrc, title, subtitle }) {
  const cardContent = (
    <div className={style.cells}>
      <img src={imageSrc} alt="image" className={style.image} />
      <div className={style.cellContent}>
        <div className={style.cellTopText}>{title}</div>
        <div className={style.cellBottomText}>{subtitle}</div>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className={style.link}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}

function Foot() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContentBox}>
        <div className={style.footerLeft} onClick={() => window.location.href = '/Agree'}>
          개인정보 처리방침
        </div>
        <div className={style.footerRight}>
          Archisemtle © 2024
        </div>
      </div>
      <div className={style.footerAddress}>
        부산광역시 영도구 태종로 727 공대 1관 387호 | PHP: 000-0000-0000
      </div>
    </footer>
  );
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
      <Foot />
      </div>
    </>
  );
}
