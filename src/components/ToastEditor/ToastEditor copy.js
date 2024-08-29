import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { ApiURL } from '../../ApiURL/ApiURL';

const ToastEditor = forwardRef(({ currentBoard }, ref) => {
  const editorRef = useRef();
  const formDataRef = useRef(new FormData()); // FormData를 저장할 ref 생성
  // 이미지 업로드 콜백
  const onUploadImage = async (blob, callback) => {
    // 이미지 파일을 FormData에 추가
    const formData = new FormData();
    formData.append('file_name', blob);
  // 현재 에디터에 입력된 title과 content를 가져오기
  const title = 'Your Title'; // 필요에 따라 입력 값으로 대체 가능
  const content = editorRef.current.getInstance().getMarkdown(); // 현재 작성된 내용
  
    // 서버로 이미지와 함께 title, content 전송
    const response = await axios.post(`${ApiURL.study_board_upload}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },params:{
        title:title,
        content:content,
      }
    });
    
    const response_file = await axios.get(`${ApiURL.study_board_get}`,{params: {study_board_no:2}});
    console.log(response_file);
    try {
      const file_name = Array.isArray(response_file.data.Image_paths) ? response_file.data.Image_paths[0] : response_file.data.Image_paths;
    console.log(file_name);
    const response_image = await axios.get(`${ApiURL.study_board_images}`,{params: {file_name:file_name}});
      const imageUrl = response_image.request.responseURL; // 서버에서 반환된 이미지 URL
      console.log(response_image);
      callback(imageUrl, 'alt text'); // 에디터에 이미지 삽입
    } catch (error) {
      console.error('Error uploading image:', error);
      // 오류 처리
    }
  };

  
  useImperativeHandle(ref, () => ({
    getMarkdown() {
      return editorRef.current.getInstance().getMarkdown();
    },
    getHTML() {
      return editorRef.current.getInstance().getHTML();
    },
    getFormData() {
      return formDataRef.current; // FormData를 반환하는 메서드
    },
  }));

  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      instance.setMarkdown(currentBoard.Content || '');
    }
  }, [currentBoard.Content]);

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue={currentBoard.Content || ''}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        hooks={{
          addImageBlobHook: onUploadImage, // 이미지 업로드 콜백 설정
        }}
      />
    </div>
  );
});

export default ToastEditor;