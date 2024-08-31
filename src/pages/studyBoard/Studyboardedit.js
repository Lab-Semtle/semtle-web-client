import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Studyboardcreate.css';
import { ApiURL } from '../../ApiURL/ApiURL';
import ToastEditor from "../../components/toastEditor/ToastEditor";
import Navbarboot from '../../components/header/Navbarboot';

function Studyboardedit() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [board, setBoard] = useState({
        Title: '',
        Content: '',
        Board_no: '',
        Create_date: '',
        Views: '',
    });

    const getBoard = async () => {
        //const resp = await(await axios.get(`${ApiURL.Boardedit_get}`));
        //const resp = await axios.get(`${ApiURL.Boardview_get}/${idx}`);
        const resp = await axios.get(`${ApiURL.study_board_get}`, {
            params:{
            study_board_no:idx
        }});//고정주소
        console.log(resp);
        setBoard(resp.data);
        console.log(board);
    };

    useEffect(() => {
        getBoard();
    }, []);

    const onChange = (event) => {
        const { name, value } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        const Content = editorRef.current.getMarkdown();
        const Title= board.Title;
        const updatedBoard = {
            ...board,
            Content,
            Title
        };
        const Filename={cpm:'sdfsdfsdfdsfsdf'};

        try {
            await axios.put(`${ApiURL.study_board}`, Filename,{params:{
                Study_Board_no: idx,
                Title: updatedBoard.Title,
                Content: updatedBoard.Content

            }});
            //await axios.put(`${ApiURL.Boardview_get}/${idx}`, updatedBoard);
            alert('수정되었습니다.');
            navigate(`/StudyBoardview/${idx}`);
        } catch (error) {
            console.error('Error updating board:', error);
            alert('수정에 실패했습니다.');
        }
    };

    const backToList = () => {
        navigate('/StudyBoardlist');
    };

    return (
        <>
            <Navbarboot />
            <div className="form-group">
                <input type="text" name="Title" value={board.Title} onChange={onChange} placeholder="제목" />
            </div>
            <div className="form-group">
                글번호 {board.Board_no}
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

export default Studyboardedit;