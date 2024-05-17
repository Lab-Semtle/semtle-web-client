
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarboot from '../../components/Header/Navbarboot';
import { Link } from 'react-router-dom';

import './CommonTable.css';
const postList = [
    {
      "no": 1,
      "title": "첫번째 게시글입니다.",
      "content": "첫번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 6
    },
    {
      "no": 2,
      "title": "두번째 게시글입니다.",
      "content": "두번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 5
    },
    {
      "no": 3,
      "title": "세번째 게시글입니다.",
      "content": "세번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 1
    },
    {
      "no": 4,
      "title": "네번째 게시글입니다.",
      "content": "네번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 2
    },
    {
      "no": 5,
      "title": "다섯번째 게시글입니다.",
      "content": "다섯번째 게시글 내용입니다.",
      "createDate": "2020-10-25",
      "readCount": 4
    },
  ];

const CommonTableRow = ({ children }) => {
    return (
      <tr className="common-table-row">
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
                    <td className="common-table-header-column" key={index}>{ item }</td>
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
const Stackboot = props => {
    const [ dataList, setDataList ] = useState([]);
/*
    const [boardList, setBoardList] = useState([]);
    const getBoardList = async () => {
        const resp = await (await axios.get('//localhost:8080/board')).data; // 2) 게시글 목록 데이터에 할당
        setBoardList(resp.data); // 3) boardList 변수에 할당
        setDataList(resp.data); //변수에 할당
        const pngn = resp.pagination;S
        console.log(pngn);
    }
    */
    /*useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
      }, []);*/

    useEffect(() => {setDataList(postList);}, [ ])
    return (
      <>
      <Navbarboot></Navbarboot>
        <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
        {
          dataList ? dataList.map((item, index) => {
            return (
              <CommonTableRow key={index}>
                <CommonTableColumn>{ item.no }</CommonTableColumn>
                <CommonTableColumn>{ item.title }</CommonTableColumn>
                <CommonTableColumn>{ item.createDate }</CommonTableColumn>
                <CommonTableColumn>{ item.readCount }</CommonTableColumn>
              </CommonTableRow>
            )
          }) : ''
        }
        </CommonTable>
        <button><Link to="/Board/create">게시물 쓰기</Link></button>
      </>
    )
  }

export default Stackboot;


