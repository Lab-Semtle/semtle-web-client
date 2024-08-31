import React, { useState, useEffect } from "react";
import Navbarboot from "../../components/Header/Navbarboot";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Apiurl } from '../../Apiurl/Apiurl';
import Comment from "../../components/Comment/Comment";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import './Study_view.css';

function Study_view(props) {
    const { idx } = useParams(); // /Board/view/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [images, setImages] = useState([]);

    const getBoard = async () => {
        try {
            const resp = await axios.get(`${Apiurl.study_board_get}`, {
                params: {
                    study_board_no: idx
                }
            });
            setBoard(resp.data);

            // 이미지 URL 가져오기
            const imageUrls = [];
            for (let fileName of resp.data.Image_paths) {
                const response = await axios.get(`${Apiurl.study_board_images}`, {
                    params: { file_name: fileName },
                    responseType: 'blob' // 서버에서 이미지 데이터로 응답받기 위해 설정
                });
                const imageUrl = URL.createObjectURL(response.data); // Blob URL 생성
                imageUrls.push(imageUrl);
            }
            setImages(imageUrls);

        } catch (error) {
            console.error('Error fetching board data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBoard();
    }, [idx]);

    const handleEdit = () => {
        navigate(`/StudyBoard/edit/${idx}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (confirmDelete) {
            try {
                await axios.delete(`${Apiurl.study_board}`, {
                    params: {
                        study_board_no: idx
                    }
                });
                alert('삭제되었습니다.');
                navigate('/StudyBoardlist');
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
            <Navbarboot />
            <div className="board-view">
                <div className="view-title">
                    <h2>{board.Title}</h2>
                </div>
                <div className="view-menu">
                    <span>{board.Board_no}</span>
                    <span>{board.Create_date}</span>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </div>
                <div className="view-content">
                    {board.Content && <Viewer initialValue={board.Content} />}
                </div>
                <div className="view-images">
                    {images.length > 0 && images.map((url, index) => (
                        <img key={index} src={url} alt={`Uploaded ${index}`} className="uploaded-image" />
                    ))}
                </div>
                <Comment index={idx} url={Apiurl.study_board_comment} boardname={'study_board_no'} boardname_comment_no={'study_board_comment_no'}/>
            </div>
            <div>댓글 보여주는 부분</div>
        </>
    );
}

export default Study_view;