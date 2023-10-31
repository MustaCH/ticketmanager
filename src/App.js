import { Home, List, Stats } from "./components/screens/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavDesktop, NavMobile } from "./components/shared";
import { useEffect, useState } from "react";
import Login from "./components/screens/login";

function App() {
  const [validUser, setValidUser] = useState(false);

  useEffect(() => {
    // Cuando el componente se monta, verifica si el usuario tenía una sesión válida anteriormente y restaura el estado si es necesario.
    const validUserValue = localStorage.getItem("validUser");
    if (validUserValue === "true") {
      setValidUser(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setValidUser(true);
    // Guarda el estado de sesión válida en localStorage.
    localStorage.setItem("validUser", "true");
  };

  return (
    <div className="bg-neutral-900  lg:px-12 lg:pb-12 ">
      {validUser === true ? (
        <Router>
          <NavMobile />
          <NavDesktop />
          <Routes>
            <Route path="/ticketmanager" element={<Home />} />
            <Route path="/guestList" element={<List />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Router>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
