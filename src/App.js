import { Home, List, Stats } from "./components/screens/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavDesktop, NavMobile } from "./components/shared";

function App() {
  return (
    <div className="bg-neutral-900  lg:px-12 lg:pb-12 ">
      <BrowserRouter>
        <NavMobile />
        <NavDesktop />
        <Routes>
          <Route path="/ticketmanager" element={<Home />} />
          <Route path="/guestList" element={<List />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
