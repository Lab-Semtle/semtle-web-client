import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LogoImg from "../../Logo.png";
import { Apiurl } from '../../Apiurl/Apiurl';

function Navbarboot() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    axios.get(Apiurl.token_get)
      .then(response => {
        if (response.status === 200) {
          axios.get(Apiurl.refresh_get)
            .then(response => {
              console.log(response);
              if (response.data.status === "success") {
                setAccessToken(true);
              } else {
                setAccessToken(false);
              }
            })
            .catch(error => {
              console.log(error);
              setAccessToken(false);
            });
        } else {
          handleLogout();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // useEffect의 의존성 배열 추가 및 괄호 닫음

  const handleLogout = () => {
    axios.get(Apiurl.token_get)
      .then(response => {
        // 로그아웃 요청을 Authorization 헤더에 accessToken을 담아 보냅니다.
        const accessToken = response.data.access_token;
        return axios.get(Apiurl.logout_get, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        });
      })
      .then(res => {
        // 로그아웃 성공 시 리다이렉트
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Error during logout: ", error);
      });
  };

  // 레거시 코드: 앞으로 가기 뒤로가기 구현 (필요 시 사용)
  // const goBack = (e) => {
  //   window.history.back();
  // };
  // const goFront = (e) => {
  //   window.history.forward();
  // };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/Main">
          <img src={LogoImg} style={{ width: '50px', height: '45px', maxWidth: '100%' }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Boardlist">게시판</Nav.Link>
            <Nav.Link href="#pricing">교수님</Nav.Link>
            <NavDropdown title="더보기" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={Link} to="/StudyBoardlist" >스터디게시판</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Exam_sharingBoardlist">족보게시판</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">00게시판</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  우리의 여정
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {accessToken ? (
              <>
                <Nav.Link as={Link} to="/MyInfo">내정보</Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  로그아웃
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/Login" eventKey={2}>로그인</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarboot;
