import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';

function Comment() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // 서버에서 댓글 목록을 가져오는 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get('https://gist.githubusercontent.com/minseozzing/efd157d0dc3cf580260484f96364baee/raw/6e7dd418e303fc5c1f971892a7db815a9f9326e8/commentse1.json');
      console.log(response);
      setComments(Array.isArray(response.data) ? response.data : []);
      
    } catch (error) {
      console.error('Error fetching comments:', error); // 오류 처리
    }
  };

  // 컴포넌트가 처음 렌더링될 때 댓글을 가져옴
  useEffect(() => {
    fetchComments();
  }, []);

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const response = await axios.post('http://your-server-url.com/api/comments', {
          content: comment
        });

        if (response.status === 201) { // Assuming 201 Created status
          setComments([...comments, response.data]);
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
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <small>작성자: {comment.author} - {new Date(comment.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;