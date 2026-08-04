import "./css/App.css";
import Favorites from "./Pages/Favorites";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import {MovieProvider} from "./Context/MovieContext";
import { useState } from "react";

function App() {
  const [homeKey, setHomeKey] = useState(0);

  const resetHome = () => {
    setHomeKey(prev => prev + 1);
  };

  return (
    <MovieProvider>
      <NavBar resetHome={resetHome} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home key={homeKey} />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;