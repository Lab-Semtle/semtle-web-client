import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';


const ToastEditor = forwardRef(({ currentBoard }, ref) => {
  const editorRef = useRef();
  const formDataRef = useRef(new FormData()); // FormData를 저장할 ref 생성
  // 이미지 업로드 콜백
  const onUploadImage = async (blob, callback) => {
    // 이미지 파일의 MIME 타입 검사 (PNG, JPG, GIF 허용)
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    
    if (!allowedTypes.includes(blob.type)) {
      alert('PNG, JPG, 또는 GIF 이미지 파일만 업로드할 수 있습니다.');
      blob = null;
      return; // 이미지 파일이 아니면 함수 종료
    }
    
    // 이미지 파일을 FormData에 추가
    const formData = formDataRef.current;
    const editorInstance = editorRef.current.getInstance();
    const markdown = editorInstance.getMarkdown();
    formData.append('file_name', blob);
     //아무것도 없는 콜백 함수
    callback('','')
     // 에디터 내부에 삽입된 마크다운 제거
    
    const updatedMarkdown = markdown.replace(/!\[\]\([^\)]*\)/g, ''); // 빈 이미지 마크다운 제거
    editorInstance.setMarkdown(updatedMarkdown);
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