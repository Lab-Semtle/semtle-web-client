import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Study_create.css';
import { Apiurl } from '../../Apiurl/Apiurl';
import Toasteditor from "../../components/Toasteditor/Toasteditor";
import Navbarboot from '../../components/Header/Navbarboot';
import Togglebutton1 from "../../components/Button/Togglebutton1";


function Study_edit() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({
        Title: '',
        Content: '',
        Board_no: '',
        Create_date: '',
        Views: '',
        Image_paths:[],
    });
    const [checked, setChecked] = useState(false);
    const handleToggleChange = (e) => {
    setChecked(e.currentTarget.checked);
};

    const getBoard = async () => {
        //const resp = await(await axios.get(`${Apiurl.Boardedit_get}`));
        //const resp = await axios.get(`${Apiurl.Boardview_get}/${idx}`);
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
        const formData = editorRef.current.getFormData();
    
        let hasFiles = false;
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            hasFiles = true;
            console.log('File detected:', value.name);
        }
        console.log('file value=',value instanceof File);
        console.log(`Key: ${key}, Value:`, value);
        }

        try {
            if(checked){//기존이미지 삭제함
                await axios.put(`${Apiurl.study_board}`,updatedBoard, {params:{study_board_no:idx, select:false}});
                if(hasFiles){//이미지 있을때
                    await axios.put(`${Apiurl.study_board_create_upload}`, formData, {
                    headers: {'Content-Type': 'multipart/form-data',},params:{study_board_no:idx, select:false}})}
            }
            else{//기존이미지삭제 안함
                await axios.put(`${Apiurl.study_board}`,updatedBoard, {params:{study_board_no:idx, select:true}});
                if(hasFiles){//이미지 있을때
                    await axios.put(`${Apiurl.study_board_create_upload}`, formData, {
                    headers: {'Content-Type': 'multipart/form-data',},params:{study_board_no:idx, select:true}})}
            }
            
            //await axios.put(`${Apiurl.Boardview_get}/${idx}`, updatedBoard);
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
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbarboot />
            <div className="form-group">
                <input type="text" name="Title" value={board.Title} onChange={onChange} placeholder="제목" />
            </div>
            <div className="form-group">
                글번호 {board.Board_no}<Togglebutton1 checked={checked} onChange={handleToggleChange}></Togglebutton1>
            </div>
            <div className="form-group">
                <Toasteditor currentBoard={board} ref={editorRef} />
            </div>
            <div className="view-images">
                    {images.length > 0 && images.map((url, index) => (
                        <img key={index} src={url} alt={`Uploaded ${index}`} className="uploaded-image" />
                    ))}
                </div>
            <div className="form-button">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>나가기</button>
            </div>
        </>
    );
}

export default Study_edit;