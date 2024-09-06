import axios from "axios";
import react, { useEffect, useState } from "react";
import style from "./Login.module.css";
import Navbarboot from "../../components/header/Navbarboot";
import { Link } from "react-router-dom";
import { ApiURL } from '../../ApiURL/ApiURL';

const User = {
  email: "test@example.com",
  pw: "test1234@@",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    //정규표현식
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-Z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  //코드 변화가 일어날때마다 실행됨
  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const onClickConfirmButton = () => {
    const loginData = new URLSearchParams();
        loginData.append('username', email);
        loginData.append('password', pw);

        axios.post(ApiURL.login_post, loginData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
          if(response.data.status === "error")
            {
              alert("존재하지 않는 사용자입니다.");
              window.location.reload();
            }
            else
            { 
            console.log('로그인 성공:', response.data);
            window.location.href = "/"
            }
        })
        .catch(error => {
            alert("존재하지 않는 사용자입니다.");
            window.location.reload();
        });
  };

  return (
    <>
      <Navbarboot />
      <div className={style.page}>
        <div className={style.titleWrap}>
          이메일과 비밀번호를
          <br />
          입력해주세요.
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
          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className={style.inputWrap}>
            <input
              type="password"
              className={style.input}
              placeholder="********"
              value={pw}
              onInput={handlePw}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
            />
          </div>
          <div className={style.errorMessageWrap}>
          </div>
        </div>

        <div className={style.memberWrap}>
          <table>
            <tr>
              <th>
                <Link to="/IdFInd">아이디 찾기</Link>
              </th>
              <th>
                <Link to="/PwFind">비밀번호 찾기</Link>
              </th>
              <th>
              <Link to={{ pathname: "/Agree", state: { isSignup: true }}}>
                회원가입
              </Link>
              </th>
            </tr>
          </table>
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
  );
}
