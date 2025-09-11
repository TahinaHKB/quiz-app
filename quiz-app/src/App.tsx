
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Play from "./page/Play";
import Setting from "./page/Setting";
import Score from "./page/Score";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/score" element={<Score />} />
        <Route path="/parametre" element={<Setting/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
