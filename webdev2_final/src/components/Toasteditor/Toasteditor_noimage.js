import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const ToastEditor_noimage = forwardRef(({ currentBoard }, ref) => {
  const editorRef = useRef();

  useImperativeHandle(ref, () => ({
    getMarkdown() {
      return editorRef.current.getInstance().getMarkdown();
    },
    getHTML() {
      return editorRef.current.getInstance().getHTML();
    }
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
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'link'],
          ['code', 'codeblock'],
        ]} // 이미지 관련 버튼을 제거한 툴바
      />
    </div>
  );
});

export default ToastEditor_noimage;