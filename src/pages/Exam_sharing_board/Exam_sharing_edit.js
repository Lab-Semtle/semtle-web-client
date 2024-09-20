import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Exam_sharing_create.css';
import { Apiurl } from '../../Apiurl/Apiurl';
import Toasteditor_noimage from "../../components/Toasteditor/Toasteditor_noimage";
import Navbarboot from '../../components/Header/Navbarboot';
import Togglebutton1 from "../../components/Button/Togglebutton1";
import Filedown from "../../components/Filedown/Filedown";

function Exam_sharing_edit() {
    const { idx } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({
        Title: '',
        Content: '',
        Board_no: '',
        Create_date: '',
        Views: '',
        Image_paths:[],
    });
    const [filename, setFilename] = useState([]);
    const [checked, setChecked] = useState(false);
    const handleToggleChange = (e) => {
    setChecked(e.currentTarget.checked);
};

    const getBoard = async () => {
        try {
            const resp = await axios.get(`${Apiurl.exam_sharing_board_get}`, {
                params: {
                    exam_sharing_board_no: idx
                }
            });
            setBoard(resp.data);
            setFilename(resp.data.Image_paths);

        } catch (error) {
            console.error('Error fetching board data:', error);
            navigate('/error');
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
    const [files, setFiles] = useState([]); // 파일 저장을 위한 상태
    const allowedFileTypes = ['application/zip', 'application/x-zip-compressed'];

  const onFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // 파일 형식 검사
    const invalidFiles = selectedFiles.filter(file => !allowedFileTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      alert('허용되지 않은 파일 형식입니다. zip 파일만 업로드할 수 있습니다.');
      return;
    }

    setFiles(selectedFiles); // 유효한 파일만 상태에 저장
  };
    const saveBoard = async () => {
        const Content = editorRef.current.getMarkdown();
        const Title= board.Title;
        const formData = new FormData(); // 새로운 FormData 객체 생성
        console.log('FormData contents:');
    
    files.forEach(file => {
      formData.append('file_name', file); // 'files'라는 키로 파일 추가
    });

        const updatedBoard = {
            ...board,
            Content,
            Title
        };
    

        try {
            if(checked){//기존이미지 삭제함
                await axios.put(`${Apiurl.exam_sharing_board}`,updatedBoard, {params:{exam_sharing_board_no:idx, select:false}});
                if(files.length > 0){//이미지 있을때
                    await axios.put(`${Apiurl.exam_sharing_board_create_upload}`, formData, {
                    headers: {'Content-Type': 'multipart/form-data',},params:{Exam_sharing_board_no:idx, select:false}})}
            }
            else{//기존이미지삭제 안함
                await axios.put(`${Apiurl.Exam_sharing_board}`,updatedBoard, {params:{Exam_sharing_board_no:idx, select:true}});
                if(files.length > 0){//이미지 있을때
                    await axios.put(`${Apiurl.Exam_sharing_board_create_upload}`, formData, {
                    headers: {'Content-Type': 'multipart/form-data',},params:{Exam_sharing_board_no:idx, select:true}})}
            }
            
            //await axios.put(`${Apiurl.Boardview_get}/${idx}`, updatedBoard);
            alert('수정되었습니다.');
            navigate(`/Exam_sharingBoardview/${idx}`);
        } catch (error) {
            console.error('Error updating board:', error);
            alert('수정에 실패했습니다.');
        }
    };

    const backToList = () => {
        navigate('/Exam_sharingBoardlist');
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
                <Toasteditor_noimage currentBoard={board} ref={editorRef} />
            </div>
            {((filename!=null) || (filename!=''))  && <Filedown filePaths={filename} />}
            <div className="form-group">
        <input type="file" multiple onChange={onFileChange} />
      </div>
            <div className="form-button">
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>나가기</button>
            </div>
        </>
    );
}

export default Exam_sharing_edit;