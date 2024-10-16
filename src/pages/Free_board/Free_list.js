
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarboot from '../../components/Header/Navbarboot';
import { Link } from 'react-router-dom';
import { Apiurl } from '../../Apiurl/Apiurl';
import './Free_list.css';
import Dropdownbutton from '../../components/Button/Dropdownbutton';
import PaginationBasic from '../../components/Header/PaginationBasic';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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

const Free_list = props => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async (currentPage, postsPerPage) => {
    try {
      const token = await axios.get(Apiurl.token_get);
      const resp = await axios.get(`${Apiurl.Boardlist_get_list}`, {
        params: {
          page: currentPage
        },
        headers: { Authorization: `Bearer ${token.data.access_token}` }
      }); // 2) 게시글 목록 데이터에 할당
      setBoardList(resp); // 3) boardList 변수에 할당
      setPosts(resp.data.Board_info);
    } catch (error) {
      console.log("fr", error);
      //navigate('/error');
    }
  }

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);//현 페이지 인덱스
  const [postsPerPage, setPostsPerPage] = useState(10);//
  const [rankmenu, setRankmenu] = useState(1);
  console.log(currentPage);

  useEffect(() => {
    getBoardList(currentPage, postsPerPage); // 1) 게시글 목록 조회 함수 호출
  }, [currentPage, postsPerPage]);


  const indexOfLast = currentPage * postsPerPage;//게시글 인덱스 끝
  const indexOfFirst = indexOfLast - postsPerPage;//게시글 인덱스 마지막



  //useEffect(() => {setBoardList(postList);}, [ ])
  return (
    <>
      <Navbarboot></Navbarboot>
      <div className='flex-body'>
        <span className="study-title">자유게시판</span>
        <div className='Dropbutton'><Dropdownbutton postlist={posts} menurank={setRankmenu}></Dropdownbutton></div>
        <div className='boardlist-table'>
          <CommonTable headersName={['제목', '내용', '등록일', '조회수']}>
            {
              posts ? posts.map((item, index) => {
                console.log("logging", item, index);
                return (
                  <CommonTableRow key={index} >
                    <CommonTableColumn><Link to={`/Boardview/${item.board_no}`}>{item.title}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Boardview/${item.board_no}`}>{item.content}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Boardview/${item.board_no}`}>{item.create_date}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Boardview/${item.board_no}`}>{item.views}</Link></CommonTableColumn>
                  </CommonTableRow>
                )
              }) : ''
            }
          </CommonTable>
        </div>
        <div className='boardcreate-button'><Link to="/Boardcreate"><button>게시물 쓰기</button></Link></div>
        <div className="pagination-basic"><PaginationBasic postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage} currentPagPage={currentPage + 1}></PaginationBasic></div>
      </div>
    </>
  )
}

export default Free_list;


