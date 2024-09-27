import axios from "axios";
import react, { useEffect, useState} from "react";
import style from "./Pwfind.module.css";
import Navbarboot from "../../components/Header/Navbarboot";
import { Link } from "react-router-dom";
import { Apiurl } from "../../Apiurl/Apiurl";

//수정 해야 할 코드들, 비밀번호를 찾는데 요구하는 데이터가 너무 가벼움
export default function IdFInd(){
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [phNumber, setphNumber] = useState("");
    const [phNumberValid, setphNumberValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        //정규표현식
        const regex =
          /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(email)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
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

      const onClickConfirmButton = () => {
        axios.get(Apiurl.findPassword_get+"?email="+email.replace(/@/g, "%40")+"&phone="+phNumber.slice(0,3)+'-'+phNumber.slice(3,7)+'-'+phNumber.slice(7,11),
        )
        .then((response)=>{
          if(response.data.status=="error") alert("존재하지 않는 회원입니다.")
          else{
            const password = response.data.detail.password;
            alert("회원님의 비밀번호는"+password+"입니다.")
          }
        })
        .catch((error)=>{
          alert("존재하지 않는 회원입니다."+error)
        })
      }


      useEffect(() => {
        if (emailValid && phNumberValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [emailValid, phNumberValid]);


    return (
        <>
        <Navbarboot />
        <div className={style.page}>
            <div className={style.titleWrap}>
                비밀번호 찾기<hr/>
                이메일, 전화번호를 입력해주세요.
            </div>
            <div className={style.contentWrap}>
                <div className={style.inputTitle}>이메일 주소</div>
                <div className={style.inputWrap}>
                    <input
                    type="text"
                    className={style.input}
                    placeholder="test@gmail.com"
                    value={email}
                    onInput={handleEmail}
                    onKeyDown={(e) => {
                        if (e.key === " ") e.preventDefault();
                    }}
                    />
                </div>
                <div className={style.errorMessageWrap}>
                    {!emailValid && email.length > 0 && (
                <div>올바른 이메일을 입력해 주세요.</div>
                )}
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
          <div className={style.errorMessageWrap}>
            {!phNumberValid && phNumber.length > 10 && (
              <div>휴대폰 번호 양식에 맞게 입력해주세요.</div>
            )}
          </div>
            </div>
            <div>
          <button
            onClick={onClickConfirmButton}
            disabled={notAllow}
            className={style.bottomButton}
          >
            확인
          </button>
        </div>
        </div>
        </>
    )
}