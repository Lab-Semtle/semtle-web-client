
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarboot from '../../components/Header/Navbarboot';
import { Link } from 'react-router-dom';
import { ApiURL } from '../../ApiURL/ApiURL';
import './CommonTable.css';

import PaginationBasic from '../../components/Header/PaginationBasic';

const CommonTableRow = ({ children }) => {
  return (

    <tr className="common-table-row" >
      {
        children
      }

    </tr>

  )
}
const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column">
      {
        children
      }
    </td>
  )
}
const CommonTable = (props) => {
  const { headersName, children } = props;

  return (
    <table className="common-table">
      <thead>
        <tr>
          {
            headersName.map((item, index) => {
              return (
                <th className="common-table-header-column" key={index}>{item}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>

        {
          children
        }

      </tbody>
    </table>
  )
}

const Boardlist = props => {

  const [boardList, setBoardList] = useState([]);
  const getBoardList = async () => {
    const resp = await (await axios.get(`${ApiURL.Boardlist_get}`)).data; // 2) 게시글 목록 데이터에 할당
    setBoardList(resp.data); // 3) boardList 변수에 할당
    setPosts(resp.data);
  }

  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
    currentPosts(boardList);
  }, []);



  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);//현 페이지 인덱스
  const [postsPerPage, setPostsPerPage] = useState(10);//


  const indexOfLast = currentPage * postsPerPage;//게시글 인덱스 끝
  const indexOfFirst = indexOfLast - postsPerPage;//게시글 인덱스 마지막

  const currentPosts = (posts) => {
    let currentPost = 0;
    currentPost = posts.slice(indexOfFirst, indexOfLast);

    return currentPost;
  };


  //useEffect(() => {setBoardList(postList);}, [ ])
  return (
    <>
      <Navbarboot></Navbarboot>
      <div className='boardlist-table'>
        <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
          {
            currentPosts(posts) ? currentPosts(posts).map((item, index) => {
              return (
                <CommonTableRow key={index} >
                  <CommonTableColumn>{item.no}</CommonTableColumn>
                  <CommonTableColumn><Link to={`/Boardview/${index}`}>{item.title}</Link></CommonTableColumn>
                  <CommonTableColumn>{item.createDate}</CommonTableColumn>
                  <CommonTableColumn>{item.readCount}</CommonTableColumn>
                </CommonTableRow>
              )
            }) : ''
          }
        </CommonTable>
      </div>
      <div className='boardcreate-button'><button><Link to="/Boardcreate">게시물 쓰기</Link></button></div>
      <div className="pagination-basic"><PaginationBasic postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage} currentPage={currentPage}></PaginationBasic></div>
    </>
  )
}

export default Boardlist;


