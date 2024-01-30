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
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
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
      <Router>
        <div>
          <Header toggleSidebar={toggleSidebar} />
          <Routes>
            {renderRoute()}
            {/* <Routes path="*" element={<ErrorPage />} /> */}
          </Routes>
          <Sidebar isSidebarVisible={isSidebarVisible} />

          {/* <ScrollToTop /> */}
        </div>
      </Router>
    </>
  );
}

export default App;
