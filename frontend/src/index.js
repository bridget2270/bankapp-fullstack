import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Withdraw from "./pages/Withdraw.js";
import Balance from "./pages/Balance.js";
import Deposit from "./pages/Deposit.js";
import NavBar from "./Navbar.js";
import { createRoot } from "react-dom/client";
import AllData from "./pages/AllData.js";
import { UserContextProvider } from "./context/UserContext.js";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

function Spa() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <NavBar />
        <div className="container" style={{ padding: "20px" }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create-account/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/balance/" element={<Balance />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

root.render(<Spa />);
