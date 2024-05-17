import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Boardcreate.css';
function Boardcreate() {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        title: '',
        createBy: '',
        contents: '',
        createDate: '',
    });
    const { title, createBy, contents } = board;

    const onChange = (event) => {
        const date = new Date();
        console.log(event.target);
        const { name, value } = event.target;
        setBoard({
            ...board,
            [name]: value,
            createDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        });
    };
    const saveBoard = async () => {

        console.log({ board });
        await axios.post(`https://reqres.in/api/users/2`, board).then((res) => {
            alert('등록되었습니다.');
            navigate('/Board');

        });
    };
    const backToList = () => {
        navigate('/Board');
    };

    return (
        <>
            <div className="form-group">
                <input type="text" name="title" value={title} onChange={onChange} placeholder="제목" />
            </div>
            <div className="form-group">
                <input type="text" name="createBy" value={createBy} onChange={onChange} placeholder="작성자" />
            </div>
            <div className="form-group">
                <textarea name="contents" cols="30" row="10" value={contents} onChange={onChange} placeholder=" 내용"></textarea>
            </div>
            <div className="form-button">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>나가기</button>
            </div>
        </>

    );

}
export default Boardcreate;