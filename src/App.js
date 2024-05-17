import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stackboot from "./pages/Board/Stackboot";
import Main from "./pages/Main/Main";
import Boardcreate from "./pages/Board/Boardcreate"
import Boardview from "./pages/Board/Boardview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Board" element={<Stackboot />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Board/create" element={<Boardcreate />}/>
          <Route path="/Board/view/:idx" element={<Boardview />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
