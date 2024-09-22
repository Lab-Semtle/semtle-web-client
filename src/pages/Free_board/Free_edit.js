import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Free_create.css';
import { Apiurl } from '../../Apiurl/Apiurl';
import Toasteditor from "../../components/Toasteditor/Toasteditor";
import Navbarboot from '../../components/Header/Navbarboot';
import Toasteditor_noimage from "../../components/Toasteditor/Toasteditor_noimage";

function Free_edit() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [board, setBoard] = useState({
        title: '',
        content: '',
        board_no: '',
        create_date: '',
        views: '',
    });

    const getBoard = async () => {
        //const resp = await(await axios.get(`${Apiurl.Boardedit_get}`));
        //const resp = await axios.get(`${Apiurl.Boardview_get}/${idx}`);
        const token = await axios.get(Apiurl.token_get);
        const resp = await axios.get(`${Apiurl.Boardview_get}`, {
            params:{
            free_board_no:idx
            },
            headers: {
                Authorization: `Bearer ${token.data.access_token}`
            }
            });//고정주소
        
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
        const content = editorRef.current.getMarkdown();
        const title= board.title;
        const updatedBoard = {
            ...board,
            content,
            title
        };

        try {
            const token = await axios.get(Apiurl.token_get);
            await axios.put(`${Apiurl.Free_board}`, updatedBoard,{params:{
                free_board_no: idx

            },
            headers:{Authorization: `Bearer ${token.data.access_token}`}});
            //await axios.put(`${Apiurl.Boardview_get}/${idx}`, updatedBoard);
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
                <input type="text" name="title" value={board.title} onChange={onChange} placeholder="제목" />
            </div>
            <div className="form-group">
                글번호 {board.Board_no}
            </div>
            <div className="form-group">
                <Toasteditor_noimage currentBoard={board} value={board.content} ref={editorRef} />
            </div>
            <div className="form-button">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>나가기</button>
            </div>
        </>
    );
}

export default Free_edit;