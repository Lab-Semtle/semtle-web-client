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
import styles from './Navbarboot.module.css';

function Navbarboot() {
  const [accessToken, setAccessToken] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 모바일 화면 체크
  const [showDropdown, setShowDropdown] = useState(false); // 모바일에서 하위 메뉴 표시 여부

  useEffect(() => {
    // 화면 크기에 따라 모바일 여부 업데이트
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowDropdown(false); // 데스크탑 모드로 바뀌면 드롭다운 닫기
    };
    window.addEventListener('resize', handleResize);

    // 초기 토큰 가져오기
    axios.get(Apiurl.token_get)
      .then(response => {
        if (response.status === 200) {
          axios.get(Apiurl.refresh_get)
            .then(response => {
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

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    axios.get(Apiurl.token_get)
      .then(response => {
        const accessToken = response.data.access_token;
        return axios.get(Apiurl.logout_get, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        });
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Error during logout: ", error);
      });
  };

  // 모바일에서 상위 항목 클릭 시 하위 메뉴 표시
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar
      expand="lg"
      className={styles.navbar}
      onMouseLeave={() => setExpandedMenu(null)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/Main">
          <img src={LogoImg} style={{ width: '50px', height: '45px', maxWidth: '100%' }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/Boardlist"
              onMouseEnter={() => setExpandedMenu("게시판")}
              onClick={isMobile ? toggleDropdown : undefined}
            >
              게시판
            </Nav.Link>
            {isMobile && showDropdown && (
              <div className={styles.mobileDropdownContent}>
                <NavDropdown.Item as={Link} to="/StudyBoardlist" className={styles.boldItem}>스터디게시판</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Exam_sharingBoardlist" className={styles.boldItem}>족보게시판</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">00게시판</NavDropdown.Item>
              </div>
            )}
            <Nav.Link
              href="#pricing"
              onMouseEnter={() => setExpandedMenu("교수님")}
            >
              교수님
            </Nav.Link>
          </Nav>
          <Nav>
            {accessToken ? (
              <>
                <Nav.Link as={Link} to="/MyInfo">내정보</Nav.Link>
                <Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/Login" eventKey={2}>로그인</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {!isMobile && expandedMenu && (
        <div className={styles.dropdownContent}>
          {expandedMenu === "게시판" && (
            <div className={styles.subMenu}><strong>게시판</strong>
              <NavDropdown.Item as={Link} to="/StudyBoardlist" className={styles.boldItem}>스터디게시판</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Exam_sharingBoardlist" className={styles.boldItem}>족보게시판</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">00게시판</NavDropdown.Item>
            </div>
          )}
          {expandedMenu === "교수님" && (
            <div className={styles.subMenu}><strong>교수님</strong> 관련 하위 메뉴 표시</div>
          )}
        </div>
      )}
    </Navbar>
  );
}

export default Navbarboot;