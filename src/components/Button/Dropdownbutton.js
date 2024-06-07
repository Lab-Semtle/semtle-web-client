import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
function Dropdownbutton({menurank}) {
    
    


  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        정렬
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" onClick={()=>menurank(1)}>최신순</Dropdown.Item>
        <Dropdown.Item href="#/action-2" >조회순</Dropdown.Item>
        <Dropdown.Item href="#/action-3" >좋아요순</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={()=>menurank(-1)}>오래된순</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Dropdownbutton;