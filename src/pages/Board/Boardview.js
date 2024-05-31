import React, { useState, useEffect } from "react";
import Navbarboot from "../../components/Header/Navbarboot";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { ApiURL } from '../../ApiURL/ApiURL';

import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';


import './Boardview.css';
function Boardview(props) {
    const { idx } = useParams(); // /Board/view/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});

    const getBoard = async () => {
        const resp = await (await axios.get(`${ApiURL.Boardview_get}`)).data;//고정주소
        //const resp = await (await axios.get(`${ApiURL.Boardview_get}/${idx}`)).data; 주소 달라짐
        setBoard(resp.data);
        console.log(board);
        setLoading(false);

    };

    useEffect(() => {
        getBoard();
        
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (<>
        <div>
            <Navbarboot></Navbarboot>
        </div>
        <div className="board-view">
            <div className="view-title">
                <h2>{board.title}</h2>
            </div>
            <div className="view-menu">
                <span>{board.username}</span>
                <span>{board.createDate}</span>
                <button>수정</button><button>삭제</button>
            </div>

            <div className="view-content">{board.content && <Viewer initialValue={board.content}/>}</div>
        </div>
    </>
    );
}

export default Boardview;