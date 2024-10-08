import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Free_create.css';
import { Apiurl } from '../../Apiurl/Apiurl';
import Toasteditor from "../../components/Toasteditor/Toasteditor";
import Navbarboot from '../../components/Header/Navbarboot';
import Toasteditor_noimage from "../../components/Toasteditor/Toasteditor_noimage";

function Free_create() {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [board, setBoard] = useState({
    title: '',
    content: '',
    views:0
  });
  //const { Title, createBy } = board;
  const { Title} = board;
  const onChange = (event) => {
    const date = new Date();
    const { name, value } = event.target;
    setBoard({
      ...board,
      [name]: value,
      //Create_date: `${date.getFullYear()}-${date.getMonth()>9?date.getMonth()+1:'0'+date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
      //Create_date: `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
    });
  };

  const saveBoard = async () => {
    // Get the markdown content from the editor
    const content = editorRef.current.getMarkdown();

    // Update the board state with the content
    const updatedBoard = {
      ...board,
      content
    };

    
    try {
      const token = await axios.get(Apiurl.token_get);
      const response = await axios.post(`${Apiurl.Boardcreate_post}`, updatedBoard,
                      {
                        headers:{Authorization: `Bearer ${token.data.access_token}`},
                        'Content-Type': 'application/json'
});
      alert('등록되었습니다.');
      navigate('/Boardlist');
    } catch (error) {
       // 오류 페이지로 이동
       navigate('/error');
      console.log("error log = ", error.config);
      console.log(updatedBoard);
      alert('등록에 실패했습니다.');
    }
  };

  const backToList = () => {
    navigate('/Boardlist');
  };

  return (
    <>
    <Navbarboot></Navbarboot>
      <div className="form-group">
        <input type="text" name="title" value={Title} onChange={onChange} placeholder="제목" />
      </div>
      {/* <div className="form-group">
        <input type="text" name="createBy" value={createBy} onChange={onChange} placeholder="작성자" />
      </div> */}
      <div className="form-group">
        <Toasteditor_noimage currentBoard={board} ref={editorRef} />
      </div>
      <div className="form-button">
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>나가기</button>
      </div>
    </>
  );
}

export default Free_create;