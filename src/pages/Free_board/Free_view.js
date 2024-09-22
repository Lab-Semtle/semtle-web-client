import React, { useState, useEffect } from "react";
import Navbarboot from "../../components/Header/Navbarboot";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Apiurl } from '../../Apiurl/Apiurl';
import Comment from "../../components/Comment/Comment";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import './Free_view.css';

function Free_view(props) {
    const { idx } = useParams(); // /Board/view/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const getBoard = async () => {
        const token = await axios.get(Apiurl.token_get);
        console.log(idx);
        const resp = await axios.get(`${Apiurl.Boardview_get}`, {
            params:{
            free_board_no:idx
            },
            headers:{Authorization: `Bearer ${token.data.access_token}`}
            
    });//고정주소
        //const resp = await (await axios.get(`${Apiurl.Boardview_get}/${idx}`)).data; 주소 달라짐
        setBoard(resp.data);
        setLoading(false);
        console.log(resp.data);
    };


    useEffect(() => {
        getBoard();
    }, []);

    const handleEdit = () => {
        navigate(`/Board/edit/${idx}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                const token = await axios.get(Apiurl.token_get);
                await axios.delete(`${Apiurl.Free_board}`, {
                    params:{
                    free_board_no: idx},
                    headers:{Authorization: `Bearer ${token.data.access_token}`}
                });
                alert('삭제되었습니다.');
                navigate('/Boardlist');
            } catch (error) {
                console.error('Error deleting board:', error);
                alert('삭제에 실패했습니다.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div>
                <Navbarboot />
            </div>
            <div className="board-view">
                <div className="view-title">
                    <h2>{board.title}</h2>
                </div>
                <div className="view-menu">
                    <span>{board.board_no}</span>
                    <span>{board.create_date}</span>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <div className="view-content">
                    {board.content && <Viewer initialValue={board.content} />}
                </div>
                <Comment index={idx} url={Apiurl.board_Comment} boardname={'free_board_no'} boardname_comment_no={'free_board_comment_no'}/>
            </div>
            <div>댓글 보여주는 부분</div>
            
        </>
    );
}

export default Free_view;