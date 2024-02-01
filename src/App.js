import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routes } from "./contexts/routes";
import { useState } from "react";
import { Header, Sidebar, Main } from "./components";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  return (
    <>
      <div className={`App ${isSidebarOpen ? "toggle-sidebar" : ""}`}>
        <Router>
          <Header onToggleSidebar={handleToggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} />
          <Routes>{renderRoute()}</Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
