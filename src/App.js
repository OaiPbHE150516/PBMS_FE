import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./contexts/routes";
import { useState } from "react";
import { Header, Sidebar, Main } from "./components";

function App() {
  const renderRoute = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={<Main> {route.component}</Main>}
          exact={route.exact}
        />
      );
    });
  };
  const [isSidebarIcons, setIsSidebarIcons] = useState(false);

  const toggleSidebarMode = () => {
    setIsSidebarIcons((prevState) => !prevState);
  };

  return (
    <>
      <div className={`App`}>
        <Router>
        <Header onToggleSidebar={toggleSidebarMode} />
          <Sidebar isIconsMode={isSidebarIcons} />
          <Routes>{renderRoute()}</Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
