import Header from "./components/Header";
import Home from "./pages/Home";
import Country from "./pages/Country";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/country/:id" element={<Country />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
