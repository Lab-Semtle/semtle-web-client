import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarboot from '../components/Header/Navbarboot';
import './Error_page.css';
function ErrorPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // 이전 페이지로 이동
  };

  return (
    <>
      <Navbarboot />
      <div className="error-page">
        <h1>문제가 발생했습니다</h1>
        <p>죄송합니다, 요청을 처리하는 중에 오류가 발생했습니다.</p>
        <button onClick={handleGoBack}>이전 페이지로 돌아가기</button>
      </div>
    </>
  );
}

export default ErrorPage;