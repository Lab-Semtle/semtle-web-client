import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Boardcreate.css';
import { ApiURL } from '../../ApiURL/ApiURL';
import ToastEditor from "../../components/ToastEditor/ToastEditor";
import Navbarboot from '../../components/Header/Navbarboot';
import ToastEditor_noimage from "../../components/ToastEditor/ToastEditor_noimage";

function Boardedit() {
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
        const resp = await axios.get(`${ApiURL.Boardview_get}`, {
            params:{
            free_board_no:idx
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

        try {
            await axios.put(`${ApiURL.Free_board}`, updatedBoard,{params:{
                free_board_no: idx

            }});
            //await axios.put(`${ApiURL.Boardview_get}/${idx}`, updatedBoard);
            alert('수정되었습니다.');
            navigate(`/Boardview/${idx}`);
        } catch (error) {
            console.error('Error updating board:', error);
            alert('수정에 실패했습니다.');
        }
    };

    const backToList = () => {
        navigate('/Boardlist');
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
                <ToastEditor_noimage currentBoard={board} ref={editorRef} />
            </div>
            <div className="form-button">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>나가기</button>
            </div>
        </>
    );
}

export default Boardedit;