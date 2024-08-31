import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';
import { ApiURL } from '../../ApiURL/ApiURL';
import { useParams } from 'react-router-dom';

import PaginationBasic from '../header/PaginationBasic';

function Comment({index, url, boardname, boardname_comment_no}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID
  const [editingCommentContent, setEditingCommentContent] = useState(''); // 수정 중인 댓글의 내용

  const { idx } = useParams();

  const fetchComments = async (currentPage) => {
    try {
      const response = await axios.get(`${url}get`, {
        params: {
          [boardname]: idx,
          page: currentPage,
        },
      });
      console.log(response);
      setComments(Array.isArray(response.data.Board_info) ? response.data.Board_info : []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments(currentPage);
  }, [currentPage]);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditingCommentContent(e.target.value);
  };

  const handleDelete = async (coidx) => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(`${url}`, {
          params: {
            [boardname]: idx,
            [boardname_comment_no]: coidx,
          },
        });
        alert('삭제되었습니다.');
        setComments(comments.filter(comment => comment.Comment_no !== coidx));
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  const handleEdit = (comment) => {
    if (editingCommentId === comment.Comment_no) {
      // 수정 모드에서 수정 버튼을 다시 누르면 저장
      handleSaveEdit(comment.Comment_no);
    } else {
      // 수정 모드로 전환
      setEditingCommentId(comment.Comment_no);
      setEditingCommentContent(comment.Content);
    }
  };

  const handleSaveEdit = async (coidx) => {
    try {
      const currentTime = new Date().toISOString(); // 현재 시간
      await axios.put(`${url}`, 
        { Content: editingCommentContent, Update_date: currentTime },
        { params: { [boardname]: idx, [boardname_comment_no]: coidx } }
      );
      setComments(comments.map(comment =>
        comment.Comment_no === coidx 
          ? { ...comment, Content: editingCommentContent, Create_date: currentTime } 
          : comment
      ));
      setEditingCommentId(null); // 수정 모드 종료
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('수정에 실패했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post(`${url}`, 
          { Content: comment },
          { params: { [boardname]: idx } }
        );

        if (response.status === 200) {
          fetchComments(currentPage);
          setComment('');
        } else {
          console.error('Failed to post comment:', response);
        }
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="Comment">
      <h1>블로그 댓글</h1>
      <div className="comment-box">
        <textarea
          value={comment}
          onChange={handleInputChange}
          placeholder="댓글을 작성하세요..."
        />
        <button onClick={handleSubmit}>댓글 저장</button>
      </div>
      <div className="comments-list">
        {Array.isArray(comments) && comments.map((comment) => (
          <div key={comment.Comment_no} className="comment">
            {editingCommentId === comment.Comment_no ? (
              <textarea
                value={editingCommentContent}
                onChange={handleEditChange}
              />
            ) : (
              <p>{comment.Content}</p>
            )}
            <p>
              <button onClick={() => handleEdit(comment)}>
                {editingCommentId === comment.Comment_no ? '저장' : '수정'}
              </button>
              <button onClick={() => handleDelete(comment.Comment_no)}>삭제</button>
            </p>
            <small>
              작성자: {comment.Comment_no} - {new Date(comment.Create_date).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <div className="pagination-basic">
        <PaginationBasic
          postsPerPage={postsPerPage}
          totalPosts={comments.length}
          paginate={setCurrentPage}
          currentPagPage={currentPage + 1}
        />
      </div>
    </div>
  );
}

export default Comment;