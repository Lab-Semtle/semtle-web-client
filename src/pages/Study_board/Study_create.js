import React, { useState, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Study_create.css';
import { Apiurl } from '../../Apiurl/Apiurl';
import Toasteditor from "../../components/Toasteditor/Toasteditor";
import Navbarboot from '../../components/Header/Navbarboot';

function Study_create() {
  const navigate = useNavigate();
  const editorRef = useRef();


  const [board, setBoard] = useState({
    title: '',
    content: '',
    views: 0
  });
  //const { Title, createBy } = board;
  const { Title } = board;
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
    const Content = editorRef.current.getMarkdown();

    const formData = editorRef.current.getFormData();

    let hasFiles = false;
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        hasFiles = true;
        console.log('File detected:', value.name);
      }
      console.log('file value=', value instanceof File);
      console.log(`Key: ${key}, Value:`, value);
    }

    // 새로운 FormData를 생성하여 파일들을 추가



    // Update the board state with the content
    const updatedBoard = {
      ...board,
      content: Content,
      views: 0,
    };
    //formData.append('Title', updatedBoard.Title);  // Title을 FormData에 추가
    //formData.append('Content', updatedBoard.Content);    // Content를 FormData에 추가

    try {
      const token = await axios.get(Apiurl.token_get);
      const response = await axios.post(`${Apiurl.study_board}`, updatedBoard,
        {
          headers: { Authorization: `Bearer ${token.data.access_token}` },
          'Content-Type': 'application/json'
        });

      console.log('updateBoard= ', updatedBoard);
      console.log('Study_board_no=', response.data.Study_Board_No);
      if (hasFiles) {
        const sendImage = await axios.put(`${Apiurl.study_board_create_upload}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }, params: {
            study_board_no: response.data.Study_Board_No
          }
        })

      }
      alert('등록되었습니다.');
      navigate('/StudyBoardlist');
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드는 2xx 범위 밖에 있음
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌으나 서버로부터 응답이 없음
        console.log(error.request);
      } else {
        // 요청을 설정하는 중에 오류가 발생함
        console.log('Error', error.message);
      }
      console.log(error.config);
      alert('등록에 실패했습니다.');
    }
  };

  const backToList = () => {
    navigate('/StudyBoardlist');
  };

  return (
    <>
      <Navbarboot></Navbarboot>
      <div className="form-group">
        <input type="text" name="Title" value={Title} onChange={onChange} placeholder="제목" />
      </div>
      {/* <div className="form-group">
        <input type="text" name="createBy" value={createBy} onChange={onChange} placeholder="작성자" />
      </div> */}
      <div className="form-group">
        <Toasteditor currentBoard={board} ref={editorRef} />
      </div>
      <div className="form-button">
        <button onClick={saveBoard}>저장</button>
        <button onClick={backToList}>나가기</button>
      </div>
    </>
  );
}

export default Study_create;