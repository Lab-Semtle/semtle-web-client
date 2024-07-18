import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Boardcreate.css';
import { ApiURL } from '../../ApiURL/ApiURL';
import ToastEditor from "../../components/ToastEditor/ToastEditor";
import Navbarboot from '../../components/Header/Navbarboot';

function Boardedit() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [board, setBoard] = useState({
        title: '',
        createBy: '',
        content: '',
        createDate: '',
    });

    const getBoard = async () => {
        const resp = await(await axios.get(`${ApiURL.Boardview_get}`)).data;
        //const resp = await axios.get(`${ApiURL.Boardview_get}/${idx}`);
        console.log(resp);
        setBoard(resp.data);
    };

    useEffect(() => {
        getBoard();
    }, []);

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
        const content = editorRef.current.getMarkdown();
        const updatedBoard = {
            ...board,
            content
        };

        try {
            await axios.put(`${ApiURL.Boardview_get}`, updatedBoard);
            //await axios.put(`${ApiURL.Boardview_get}/${idx}`, updatedBoard);
            alert('수정되었습니다.');
            navigate(`/Board/view/${idx}`);
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
                <input type="text" name="title" value={board.title} onChange={onChange} placeholder="제목" />
            </div>
            <div className="form-group">
                <input type="text" name="createBy" value={board.createBy} onChange={onChange} placeholder="작성자" />
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

export default Boardedit;