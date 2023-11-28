import {
  Home,
  List,
  Quote,
  Scanner,
  Stats,
  TaskList,
} from "./components/screens/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavDesktop, NavMobile } from "./components/shared";
import { useEffect, useState } from "react";
import Login from "./components/screens/login";
import Logout from "./components/shared/logout";

function App() {
  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    const validUserValue = localStorage.getItem("validUser");
    if (validUserValue === "true") {
      setValidUser(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setValidUser(true);
    localStorage.setItem("validUser", "true");
  };

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-red-900 lg:px-12 pt-4">
      {validUser === true ? (
        <Router>
          <Logout />
          <NavMobile />
          <NavDesktop />
          <Routes>
            <Route path="/ticketmanager" element={<Home />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/guestList" element={<List />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/tasks" element={<TaskList />} />
          </Routes>
        </Router>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
