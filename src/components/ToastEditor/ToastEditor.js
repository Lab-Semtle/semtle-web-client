import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const ToastEditor = forwardRef(({ currentBoard }, ref) => {
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
      instance.setMarkdown(currentBoard.content || '');
    }
  }, [currentBoard.content]);

  return (
    <div>
      <Editor
        ref={editorRef}
        initialValue={currentBoard.content || ''}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        
      />
    </div>
  );
});

export default ToastEditor;