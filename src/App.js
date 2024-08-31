import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Free_create from "./pages/Free_board/Free_create"
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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/Main" element={<Root />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Membership" element={<Membership />} />

          <Route path="/Boardlist" element={<Free_list />} />
          <Route path="/Boardcreate" element={<Free_create />}/>
          <Route path="/Boardview/:idx" element={<Free_view />}/>
          <Route path="/Board/edit/:idx" element={<Free_edit/>}/>

          <Route path="/StudyBoardlist" element={<Study_list/>}/>
          <Route path="/StudyBoardcreate" element={<Study_create />}/>
          <Route path="/StudyBoardview/:idx" element={<Study_view />}/>
          <Route path="/StudyBoard/edit/:idx" element={<Study_edit/>}/>
          <Route path="/MyInfo" element = {<Myinfo/>}/>
          <Route path="/IdFind" element={<IdfInd />} />
          <Route path="/PwFind" element={<PwfInd />} />
          <Route path="agree" element={<Agree />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
