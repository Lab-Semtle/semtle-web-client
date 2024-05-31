import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Boardcreate.css';
import { ApiURL } from '../../ApiURL/ApiURL';
import ToastEditor from "../../components/ToastEditor/ToastEditor";
import Navbarboot from '../../components/Header/Navbarboot';

function Boardcreate() {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [board, setBoard] = useState({
    title: '',
    createBy: '',
    content: '',
    createDate: '',
  });
  const { title, createBy } = board;

  const onChange = (event) => {
    const date = new Date();
    const { name, value } = event.target;
    setBoard({
      ...board,
      [name]: value,
      createDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
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

    console.log({ updatedBoard });
    await axios.post(`${ApiURL.Boardcreate_post}`, updatedBoard).then((res) => {
      alert('등록되었습니다.');
      navigate('/Boardlist');
    });
  };

  const backToList = () => {
    navigate('/Boardlist');
  };

  return (
    <>
    <Navbarboot></Navbarboot>
      <div className="form-group">
        <input type="text" name="title" value={title} onChange={onChange} placeholder="제목" />
      </div>
      <div className="form-group">
        <input type="text" name="createBy" value={createBy} onChange={onChange} placeholder="작성자" />
      </div>
      <div className="form-group">
        <ToastEditor currentBoard={board} ref={editorRef} />
      </div>
      <div className="form-button">
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>나가기</button>
      </div>
    </>
  );
}

export default Boardcreate;