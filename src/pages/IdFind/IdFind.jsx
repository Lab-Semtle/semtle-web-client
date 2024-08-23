import axios from "axios";
import react, { useEffect, useState} from "react";
import style from "./IdFind.module.css";
import Navbarboot from "../../components/Header/Navbarboot";
import { Link } from "react-router-dom";

export default function IdFInd(){
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [phNumber, setphNumber] = useState("");
    const [phNumberValid, setphNumberValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const handleName = (e) =>{
      setName(e.target.value);
      const regex = /^[가-힣]{2,}$/;
      if(regex.test(name)){
        setNameValid(true);
      }
      else{
        setNameValid(false);
      }
    }

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
        axios.get("url",
          {
            'user_name':name,
            'user_phone':phNumber
          }
        )
        .then((response)=>{
          alert("회원님의 아이디는"+response+"입니다.")
        })
        .catch((error)=>{
          alert("존재하지 않는 회원입니다."+error)
        })
      }


      useEffect(() => {
        if (nameValid && phNumberValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [nameValid, phNumberValid]);

    return (
        <>
        <Navbarboot />
        <div className={style.page}>
            <div className={style.titleWrap}>
                아이디 찾기<hr/>
                이름과 전화번호를 입력해주세요.
            </div>
            <div className={style.contentWrap}>
            <div className={style.inputTitle}>이름</div>
          <div className={style.inputWrap}>
          <input
              type="text"
              className={style.input}
              placeholder="아무개"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              value={name}
              onChange={handleName}
            />
          </div>
          <div className={style.errorMessageWrap}>
            {!nameValid && name.length > 5 && (
              <div>올바른 이름을 입력해주세요.</div>
            )}
          </div>
          <div className={style.inputTitle}>전화번호</div>
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