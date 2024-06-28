
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


//쿠키값을 조회해 로그인과 마이페이지, 내 정보의 상태 변경
function isLogin() {
  if(false){
    return (
    <>
    <Nav.Link href ="#MyPage">마이 페이지</Nav.Link>
    <Nav.Link>내 정보</Nav.Link>
    </>
    )
  }
  else{
    return (<Nav.Link as={Link} to="/Login" eventKey={2}>로그인</Nav.Link>)
  }
}


function Navbarboot() {
  return (

      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/Main">Semtle</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/Boardlist">게시판</Nav.Link>
              <Nav.Link href="#pricing">교수님</Nav.Link>
              <NavDropdown title="더보기" id="collapsible-nav-dropdown"> 
                <NavDropdown.Item href="#action/3.1">sememem</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  sdfdsfsdf
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">sdfsdf</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  sdfddfsd
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
            {isLogin()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  );
}

export default Navbarboot;

