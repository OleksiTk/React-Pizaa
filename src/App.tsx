import Header from "./components/Header.tsx";
import "./scss/style.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import Card from "./pages/Card.tsx";
import NotFound from "./pages/NotFound.tsx";
import Account from "./pages/Account.tsx";
import Login from "./components/Login.tsx";
import AccountPanel from "./components/AccountPanel.tsx";
import Regestration from "./components/Regestration.tsx";
import AdminPanel from "./components/AdminPanel.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/registration" element={<Regestration />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/accountpanel" element={<AccountPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
