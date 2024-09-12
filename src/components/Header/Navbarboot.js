import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LogoImg from "../../Logo.png"
import { Apiurl } from '../../Apiurl/Apiurl';

function Navbarboot() {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(Apiurl.refresh_get)
      .then(response => {
        console.log(response)
        if(response.data.status === "success")
          setAccessToken(true);
        else
          setAccessToken(false);
      })
      .catch(error => {
        console.log(error);
        setAccessToken(false);
      })  
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const goBack = (e) => {
    window.history.back()
  }
  const goFront = (e) =>{
    window.history.forward()
    
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <button
        onClick={goBack}>◀</button>
        <button
        onClick={goFront}>▶</button>
        <Navbar.Brand as={Link} to="/Main">
        <img src={LogoImg} style={{ width: 'auto', height: '40px',maxWidth:'100%', objectFit:'contain',paddingLeft:'10px'
        }}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Boardlist">자유게시판</Nav.Link>
              <Nav.Link href="#pricing">교수님</Nav.Link>
              <NavDropdown title="더보기" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/StudyBoardlist" >스터디게시판</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Exam_sharingBoardlist">족보게시판</NavDropdown.Item>
                <NavDropdown.Item >--준비중--</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  --준비중--
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          <Nav>
            {accessToken ? (
              <>
                <Nav.Link as={Link} to="/MyInfo">내정보</Nav.Link>
                <Nav.Link
                onClick={() => {
                    axios.get(Apiurl.token_get)
                         .then(response => {
                            const accessToken = response.data.access_token;

                               // 로그아웃 요청을 Authorization 헤더에 accessToken을 담아 보냅니다.
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
                  }}
              >
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