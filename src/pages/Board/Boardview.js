import React, { useState, useEffect } from "react";
import Navbarboot from "../../components/Header/Navbarboot";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { ApiURL } from '../../ApiURL/ApiURL';
import Comment from "../../components/comment/Comment";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import './Boardview.css';

function Boardview(props) {
    const { idx } = useParams(); // /Board/view/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const getBoard = async () => {
        const resp = await (await axios.get(`${ApiURL.Boardview_get}`)).data;//고정주소
        //const resp = await (await axios.get(`${ApiURL.Boardview_get}/${idx}`)).data; 주소 달라짐
        setBoard(resp.data);
        setLoading(false);
    };

    useEffect(() => {
        getBoard();
    }, []);

    const handleEdit = () => {
        navigate(`/Board/edit/`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                await axios.delete(`${ApiURL.Boardview_get}`);
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
                    <span>{board.username}</span>
                    <span>{board.createDate}</span>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <div className="view-content">
                    {board.content && <Viewer initialValue={board.content} />}
                </div>
                <Comment />
            </div>
            <div>댓글 보여주는 부분</div>
        </>
    );
}

export default Boardview;