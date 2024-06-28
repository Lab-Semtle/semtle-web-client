import axios from "axios";
import react, { useEffect, useState } from "react";

import style from "./Membership.module.css";
import Navbarboot from "../../components/Header/Navbarboot";

export default function Membership() {
  const [email, setEmail] = useState("");

  const [id, setId] = useState("");
  const [phNumber, setphNumber] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwValid2, setPwValid2] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [phNumberValid, setphNumberValid] = useState(false);

  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handlePw2 = (e) => {
    setPw2(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(pw2)) {
      setPwValid2(true);
    } else {
      setPwValid2(false);
    }
  };


  const handleId = (e) => {
    setId(e.target.value);

    //정규식 요구 조건, 영어와 숫자만을 입력 받는다.
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;

    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePhNumber = (e) => {
    setphNumber(e.target.value);

    //정규식 요구 조건, 휴대폰 번호의 형식을 입력 받는다.
    const regex = /^010\d{7}$/;

    if (regex.test(phNumber)) {
      setphNumberValid(true);
    } else {
      setphNumberValid(false);
    }
  };

  useEffect(() => {
    if (emailValid && pwValid && pwValid2 && idValid & phNumberValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  });

  const onClickConfirmButton = () => {
    if (pw === pw2) {
      axios
        .post("url", {
          email: email,

          id: id,
          pw: pw,
          phNumber: phNumber,
        })
        .then((res) => {
          //console.log(res.data);
        });
    } else return;
  };

  return (
    <>
      <Navbarboot></Navbarboot>
      <div className={style.page}>
        <div className={style.titleWrap}>회원가입</div>
        <div className={style.contentWrap}>
          <div className={style.inputTitle}>이메일</div>
          <div className={style.inputWrap}>
            <input
              type="text"
              className={style.input}
              placeholder="test@gmail.com"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className={style.errprMessageWrap}>
            {!emailValid && email.length > 5 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>
          <div classname={style.inputTitle}>아이디</div>
          <div className={style.inputWrap}>
            <input
              type="text"
              className={style.input}
              placeholder="asdf1234"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={id}
              onChange={handleId}
            />
          </div>
          <div className={style.errprMessageWrap}>
            {!idValid && id.length > 6 && (
              <div className >영어와 숫자를 포함하여 6글자 이상으로 작성해 주세요. </div>
            )}
          </div>
          <div className={style.inputTitle}>비밀번호</div>
          <div className={style.inputWrap}>
            <input
              type="password"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              className={style.input}
              placeholder="********"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className={style.errprMessageWrap}>
            {!pwValid && pw.length > 4 && (
              <div>
                영어와 숫자, 특수문자를 포함하여 8글자 이상으로 작성해 주세요.{" "}
              </div>
            )}
          </div>
          <div className={style.inputTitle}>비밀번호 확인</div>
          <div className={style.inputWrap}>
            <input
              type="password"
              className={style.input}
              placeholder="********"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={pw2}
              onChange={handlePw2}
            />
          </div>
          <div classname={style.inputTitle}>전화번호</div>
          <div className={style.inputWrap}>
            <input
              type="text"
              className={style.input}
              placeholder="01012345678"
              maxLength={11}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={phNumber}
              onChange={handlePhNumber}
            />
          </div>
          <div className={style.errprMessageWrap}>
            {!phNumberValid && phNumber.length > 10 && (
              <div>휴대폰 번호 양식에 맞게 입력해주세요. . </div>
            )}
          </div>
          <div>
            <button
              onClick={onClickConfirmButton}
              className={style.bottomButton}
              disabled={notAllow}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
