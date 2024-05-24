import React, { useState, useEffect} from "react";
import Navbarboot from "../../components/Header/Navbarboot";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Boardview(props){
    const { idx } = useParams(); // /Board/view/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const getBoard = async () => {
        const resp = await (await axios.get(`https://gist.githubusercontent.com/minseozzing/2036f94525929d9ac74b508dd036b263/raw/9ed7fe688e397bb76173983f5c9a16c219f73960/gistfiwefwef.json`)).data;
        setBoard(resp.data);
        console.log(resp);
        setLoading(false);
      };
      useEffect(() => {
        getBoard();
      }, []);
      
    return(<>
        <div>
            <Navbarboot></Navbarboot>
        </div>
        <div>
            {console.log(typeof board)}
            {board.id}
        </div>
        <div>
            아이디 입력날짜 수정 삭제버튼
        </div>

        <div>본문</div>
        </>
    );
}

export default Boardview;