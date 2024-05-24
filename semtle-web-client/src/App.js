import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stackboot from "./pages/Board/Stackboot";
import Main from "./pages/Main/Main";
import Root from "./pages/root/Root";
import Login from "./pages/login/Login";
import Membership from "./pages/membership/Membership";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/Board" element={<Stackboot />} />
          <Route path="/Main" element={<Root />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Membership" element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
