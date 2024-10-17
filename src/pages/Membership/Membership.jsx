import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Membership.module.css";
import Navbarboot from "../../components/Header/Navbarboot";
import { Apiurl } from '../../Apiurl/Apiurl';

export default function Membership() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
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
  const [verificationCode, setVerificationCode] = useState();
  const [userInputCode, setUserInputCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  
  const [sendCodeCooldown, setSendCodeCooldown] = useState(false); // 타이머 활성화 상태
  const [timer, setTimer] = useState(60); // 60초 타이머

  // 인증 코드 전송 함수
  const sendVerificationCode = async () => {
    if (emailValid && !sendCodeCooldown) {
      const encodedEmail = email.replace(/@/g, "%40");
      const response = await axios.get(Apiurl.send_get + encodedEmail);
      alert("인증 코드가 이메일로 전송되었습니다.");

      setVerificationCode(response.data.code); // 예시로 코드 저장
      setSendCodeCooldown(true); // 버튼 비활성화
      setTimer(60); // 60초로 타이머 설정
    }
  };

  // 타이머 동작
  useEffect(() => {
    let countdown;
    if (sendCodeCooldown && timer > 0) {
      verifyCode();
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer <= 0) {
      setSendCodeCooldown(false); // 60초 후 버튼 활성화
      setTimer(60); // 타이머 초기화
    }
    return () => clearInterval(countdown); // 타이머 정리
  }, );

  // 코드 검증
  const verifyCode = () => {
    if (userInputCode === verificationCode) {
      setIsEmailVerified(true);
    }
  };

  // 이름 유효성 검사
  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[가-힣]{2,}$/;
    setNameValid(regex.test(e.target.value));
  }

  // 이메일 유효성 검사
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    setEmailValid(regex.test(e.target.value));
  };

  // 패스워드 유효성 검사
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\$begin:math:text$\\$end:math:text$\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
  };

  // 비밀번호 확인 유효성 검사
  const handlePw2 = (e) => {
    setPw2(e.target.value);
    setPwValid2(e.target.value === pw);
  };

  // 아이디 유효성 검사
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    setIdValid(regex.test(e.target.value));
  };

  // 전화번호 유효성 검사
  const handlePhNumber = (e) => {
    setphNumber(e.target.value);
    const regex = /^010\d{8}$/;
    setphNumberValid(regex.test(e.target.value));
  };

  useEffect(() => {
    setNotAllow(!(emailValid && pwValid && pwValid2 && idValid && phNumberValid && nameValid));
  }, [emailValid, pwValid, pwValid2, idValid, phNumberValid, nameValid]);

  // 회원가입 폼 제출
  const onClickConfirmButton = () => {
    if (pw === pw2) {
      axios
        .post(Apiurl.signup_post + userInputCode, {
          "user_nickname": id,
          "user_password": pw,
          "user_name": name,
          "user_email": email,
          "user_phone": phNumber.slice(0, 3) + '-' + phNumber.slice(3, 7) + '-' + phNumber.slice(7, 11),
          "user_birth": 0,
          "create_date": "2024-10-16T23:38:02"
        })
        .then(response => {
          console.log('회원가입 성공:', response.data);
          window.location.href = "/";
        })
        .catch(error => {
          console.error('회원가입 실패:', error.response ? error.response.data : error.message);
          alert("알 수 없는 에러가 발생하였습니다.");
          window.location.href = "/Membership";
        });
    }
  };

    return (
      <>
        <Navbarboot />
        <div className={style.page}>
          <div className={style.titleWrap}>회원가입</div>
          <div className={style.agreeIntroduce}>
            계속함으로써 <a className={style.a} href="/Agree">개인정보 처리방침</a>에 동의한 것으로 간주합니다.
          </div>
          <div className={style.contentWrap}>
            <InputField
              title="이름"
              placeholder="홍길동"
              value={name}
              onChange={handleName}
              isValid={nameValid}
              errorText="올바른 이름을 입력해주세요."
            />
            <InputField
              title="이메일"
              placeholder="example@gmail.com"
              value={email}
              onChange={handleEmail}
              isValid={emailValid}
              errorText="올바른 이메일을 입력해주세요."
              extraButton={
                <button onClick={sendVerificationCode} disabled={!emailValid || sendCodeCooldown || isEmailVerified}>
                  {sendCodeCooldown ? `${timer}초 후 재전송 가능` : "인증코드 전송"}
                </button>
              }
            />
            <InputField
              title="인증번호 입력"
              placeholder="인증번호를 입력하세요"
              value={userInputCode}
              onChange={(e) => setUserInputCode(e.target.value)}
            />
            <InputField
              title="닉네임"
              placeholder="닉네임"
              value={id}
              onChange={handleId}
              isValid={idValid}
              errorText="영어와 숫자를 포함하여 6글자 이상으로 작성해 주세요."
            />
            <InputField
              title="비밀번호"
              placeholder="비밀번호"
              type="password"
              value={pw}
              onChange={handlePw}
              isValid={pwValid}
              errorText="영어와 숫자, 특수문자를 포함하여 8글자 이상으로 작성해 주세요."
            />
            <InputField
              title="비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              value={pw2}
              onChange={handlePw2}
              isValid={pwValid2}
            />
            <InputField
              title="전화번호"
              placeholder="01012345678"
              value={phNumber}
              onChange={handlePhNumber}
              isValid={phNumberValid}
              errorText="휴대폰 번호 양식에 맞게 입력해주세요."
            />
            <button onClick={onClickConfirmButton} className={style.bottomButton} disabled={notAllow}>
              확인
            </button>
          </div>
        </div>
      </>
    );
  }
  
  function InputField({ title, placeholder, value, onChange, isValid = true, errorText = "", extraButton = null, type = "text" }) {
    return (
      <div className={style.inputContainer}>
        <label className={style.inputTitle}>{title}</label>
        <div className={style.inputWrap}>
          <input
            type={type}
            className={style.input}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {extraButton}
        </div>
        {!isValid && <div className={style.errorMessageWrap}>{errorText}</div>}
      </div>
    );
  }