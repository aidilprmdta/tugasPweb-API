// import './App.css'
import Navbar from "./components/NavBar";
import Content from "./components/Content";
import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DetailSurat from "./pages/DetailSurat";

function App() {
  return (
    <HashRouter>
      <div className="d-flex vh-100 overflow-hidden">
        
        <div>
          <Navbar />
        </div>
        
        <div className="flex-grow-1 overflow-auto bg--light">
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/surat/:id" element={<DetailSurat />} />
            </Routes>
          </Content>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;