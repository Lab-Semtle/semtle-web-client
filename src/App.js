import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FreeCreate from "./pages/FreeBoard/FreeCreate";
import FreeView from "./pages/FreeBoard/FreeView";
import Root from "./pages/Root/Root";
import Login from "./pages/Login/Login";
import Membership from "./pages/Membership/Membership";
import FreeList from "./pages/FreeBoard/FreeList";
import FreeEdit from "./pages/FreeBoard/FreeEdit";
import Myinfo from "./pages/Myinfo/Myinfo";
import IdfInd from "./pages/Idfind/Idfind";
import PwfInd from "./pages/Pwfind/Pwfind";
import Agree from "./pages/Agree/Agree";

import StudyList from "./pages/StudyBoard/StudyList";
import StudyCreate from "./pages/StudyBoard/StudyCreate";
import StudyView from "./pages/StudyBoard/StudyView";
import StudyEdit from "./pages/StudyBoard/StudyEdit";

import ExamSharingList from "./pages/ExamSharingBoard/ExamSharingList";
import ExamSharingCreate from "./pages/ExamSharingBoard/ExamSharingCreate";
import ExamSharingView from "./pages/ExamSharingBoard/ExamSharingView";
import ExamSharingEdit from "./pages/ExamSharingBoard/ExamSharingEdit";

import ErrorPage from "./pages/ErrorPage";

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

            <Route path="/Boardlist" element={<FreeList />} />
            <Route path="/Boardcreate" element={<FreeCreate />} />
            <Route path="/Boardview/:idx" element={<FreeView />} />
            <Route path="/Board/edit/:idx" element={<FreeEdit />} />

            <Route path="/StudyBoardlist" element={<StudyList />} />
            <Route path="/StudyBoardcreate" element={<StudyCreate />} />
            <Route path="/StudyBoardview/:idx" element={<StudyView />} />
            <Route path="/StudyBoard/edit/:idx" element={<StudyEdit />} />

            <Route path="/Exam_sharingBoardlist" element={<ExamSharingList />} />
            <Route path="/Exam_sharingBoardcreate" element={<ExamSharingCreate />} />
            <Route path="/Exam_sharingBoardview/:idx" element={<ExamSharingView />} />
            <Route path="/Exam_sharingBoard/edit/:idx" element={<ExamSharingEdit />} />

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