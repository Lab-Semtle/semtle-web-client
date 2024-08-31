import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boardcreate from "./pages/board/Boardcreate"
import Boardview from "./pages/board/Boardview";
import Root from "./pages/root/Root";
import Login from "./pages/login/Login";
import Membership from "./pages/membership/Membership";
import Boardlist from "./pages/board/Boardlist";
import Boardedit from "./pages/board/Boardedit";
import MyInfo from "./pages/myInfo/MyInfo";
import IdFInd from "./pages/idFind/IdFind";
import PwFInd from "./pages/pwFind/PwFind";
import Agree from "./pages/agree/Agree";

import Studyboardlist from "./pages/studyBoard/Studyboardlist";
import Studyboardcreate from "./pages/studyBoard/Studyboardcreate";
import Studyboardview from "./pages/studyBoard/Studyboardview";
import Studyboardedit from "./pages/studyBoard/Studyboardedit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/Main" element={<Root />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Membership" element={<Membership />} />

          <Route path="/Boardlist" element={<Boardlist />} />
          <Route path="/Boardcreate" element={<Boardcreate />}/>
          <Route path="/Boardview/:idx" element={<Boardview />}/>
          <Route path="/Board/edit/:idx" element={<Boardedit/>}/>

          <Route path="/StudyBoardlist" element={<Studyboardlist/>}/>
          <Route path="/StudyBoardcreate" element={<Studyboardcreate />}/>
          <Route path="/StudyBoardview/:idx" element={<Studyboardview />}/>
          <Route path="/StudyBoard/edit/:idx" element={<Studyboardedit/>}/>
          <Route path="/MyInfo" element = {<MyInfo/>}/>
          <Route path="/IdFind" element={<IdFInd />} />
          <Route path="/PwFind" element={<PwFInd />} />
          <Route path="agree" element={<Agree />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
