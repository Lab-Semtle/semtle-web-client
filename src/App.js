import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Free_create from "./pages/Free_board/Free_create";
import Free_view from "./pages/Free_board/Free_view";
import Root from "./pages/Root/Root";
import Login from "./pages/Login/Login";
import Membership from "./pages/Membership/Membership";
import Free_list from "./pages/Free_board/Free_list";
import Free_edit from "./pages/Free_board/Free_edit";
import Myinfo from "./pages/Myinfo/Myinfo";
import IdfInd from "./pages/Idfind/Idfind";
import PwfInd from "./pages/Pwfind/Pwfind";
import Agree from "./pages/Agree/Agree";

import Study_list from "./pages/Study_board/Study_list";
import Study_create from "./pages/Study_board/Study_create";
import Study_view from "./pages/Study_board/Study_view";
import Study_edit from "./pages/Study_board/Study_edit";

import Exam_sharing_list from "./pages/Exam_sharing_board/Exam_sharing_list";
import Exam_sharing_create from "./pages/Exam_sharing_board/Exam_sharing_create";
import Exam_sharing_view from "./pages/Exam_sharing_board/Exam_sharing_view";
import Exam_sharing_edit from "./pages/Exam_sharing_board/Exam_sharing_edit";

import ErrorPage from "./pages/Error_page";

// Context 이름을 대문자로 시작하도록 수정
export const IsFromLoginContext = createContext();

function App() {
  const [isfromLogin, setIsFromLogin] = useState(false);

  return (
    <div className="App">
      {/* Provider의 이름 수정 */}
      <IsFromLoginContext.Provider value={{ isfromLogin, setIsFromLogin }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/Main" element={<Root />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Membership" element={<Membership />} />

            <Route path="/Boardlist" element={<Free_list />} />
            <Route path="/Boardcreate" element={<Free_create />} />
            <Route path="/Boardview/:idx" element={<Free_view />} />
            <Route path="/Board/edit/:idx" element={<Free_edit />} />

            <Route path="/StudyBoardlist" element={<Study_list />} />
            <Route path="/StudyBoardcreate" element={<Study_create />} />
            <Route path="/StudyBoardview/:idx" element={<Study_view />} />
            <Route path="/StudyBoard/edit/:idx" element={<Study_edit />} />
            
            <Route path="/Exam_sharingBoardlist" element={<Exam_sharing_list/>}/>
            <Route path="/Exam_sharingBoardcreate" element={<Exam_sharing_create />}/>
            <Route path="/Exam_sharingBoardview/:idx" element={<Exam_sharing_view />}/>
            <Route path="/Exam_sharingBoard/edit/:idx" element={<Exam_sharing_edit/>}/>
            
            <Route path="/MyInfo" element={<Myinfo />} />
            <Route path="/IdFind" element={<IdfInd />} />
            <Route path="/PwFind" element={<PwfInd />} />
            <Route path="/agree" element={<Agree />} />

            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </IsFromLoginContext.Provider>
    </div>
  );
}

export default App;